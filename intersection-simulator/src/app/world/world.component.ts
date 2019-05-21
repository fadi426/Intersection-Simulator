import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Road } from '../road/road'
import { Mqtt } from '../mqtt/mqtt';
import { TweenLite } from 'gsap';
import { InitTrafficLights } from '../init/initTrafficLights';
import { InitSensors } from '../init/initSensors';
import { TrafficUserCreater } from '../trafficUserCreater/trafficUserCreater';
import { BridgeRoadSensor } from '../bridgeSensors/bridgeRoadSensor';
import { BridgeWaterSensor } from '../bridgeSensors/bridgeWaterSensor';

@Component({
	selector: 'app-world',
	templateUrl: './world.component.html',
	styleUrls: ['./world.component.scss'],
})
export class WorldComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

var camera, scene, renderer;
var mqtt;
var groupID;
var carArr = [];
var cycleArr = [];
var footArr = [];
var vesselArr = [];
var bridgeTween;

var trafficLightArr = [];
var sensorArr = [];
var initTrafficLights = new InitTrafficLights;
var initSensors = new InitSensors;
var trafficUserCreater = new TrafficUserCreater;
var bridgeRoadSensor = new BridgeRoadSensor;
var bridgeWaterSensor = new BridgeWaterSensor;

var roadBridge;
var bridgeOpen = false;
var roadGate1;
var roadGate2;
var roadGate3;
var roadGate4;
var gate1Open = false;
var gate2Open = false;
var gate1Tween;
var gate2Tween;
var gate3Tween;
var gate4Tween;

init();
animate();

function setMode(message) {
	let destination = message.destinationName.split("/");
	trafficLightArr.forEach(trafficLight => {
		if (trafficLight.getGroup == destination[1] && trafficLight.getGroupId == destination[2] && trafficLight.getId == destination[4]) {
			trafficLight.setMode = message.payloadString;
		}
	});
	if (destination[1] == "bridge" && destination[3] == "light") {
		trafficLightArr[trafficLightArr.length - 1].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 2].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 3].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 4].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 5].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 6].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 7].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 8].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 9].setMode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 10].setMode = message.payloadString;
	}
	if (destination[1] == "features", destination[2] == "lifecycle", destination[4] == "onconnect", destination[3] == "controller") {
		resetWorld();
		console.log("reset");
	}
}

function open() {
	if (!bridgeOpen) {
		bridgeOpen = true;
		var pos = roadBridge._mesh.position;
		bridgeTween = TweenLite.to(pos, 5, { x: pos.x - 1.2, y: pos.y, z: pos.z - 0.01 });
	}
}

function close() {
	if (bridgeOpen) {
		bridgeOpen = false;
		bridgeTween.reverse();
	}
}

function openGate1() {
	if (!gate1Open) {
		gate1Open = true;
		var pos = roadGate1._mesh.position;
		gate1Tween = TweenLite.to(pos, 2, { x: pos.x, y: pos.y, z: pos.z + 0.2 });
		pos = roadGate3._mesh.position;
		gate3Tween = TweenLite.to(pos, 2, { x: pos.x, y: pos.y, z: pos.z + 0.2 });
	}
}

function openGate2() {
	if (!gate2Open) {
		gate2Open = true;
		var pos = roadGate2._mesh.position;
		gate2Tween = TweenLite.to(pos, 2, { x: pos.x, y: pos.y, z: pos.z + 0.2 });
		pos = roadGate4._mesh.position;
		gate4Tween = TweenLite.to(pos, 2, { x: pos.x, y: pos.y, z: pos.z + 0.2 });
	}
}

function closeGate1() {
	if (gate1Open) {
		gate1Open = false;
		gate1Tween.reverse();
		gate3Tween.reverse();
	}
}

function closeGate2() {
	if (gate2Open) {
		gate2Open = false;
		gate2Tween.reverse();
		gate4Tween.reverse();
	}
}

function resetWorld() {
	carArr.forEach(car => {
		scene.remove(scene.getObjectByName(car.getMesh.name));
	});
	carArr = [];
	footArr.forEach(foot => {
		scene.remove(scene.getObjectByName(foot.getMesh.name));
	});
	footArr = [];
	cycleArr.forEach(cycle => {
		scene.remove(scene.getObjectByName(cycle.getMesh.name));
	});
	cycleArr = [];
	vesselArr.forEach(vessel => {
		scene.remove(scene.getObjectByName(vessel.getMesh.name));
	});
	vesselArr = [];
	sensorArr.forEach(sensor => {
		sensor.setMode = 0;
	});
	trafficLightArr.forEach(trafficLight => {
		trafficLight.setMode = trafficLight.getInitialMode;
	});
	close();
	closeGate1();
	closeGate2();
}

function init() {
	//Create camera
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
	camera.position.set(4, -4, 5.5);
	camera.rotation.x = 0.6;

	//Create scene
	scene = new THREE.Scene();

	//Create lights
	var ambient = new THREE.AmbientLight(0x404040);
	scene.add(ambient);

	let pointlight = new THREE.PointLight(0xffffff, 1);
	pointlight.shadow.camera.near = 0.1;
	pointlight.shadow.camera.far = 1000;
	pointlight.position.set(4.5, 3, 2);
	pointlight.shadow.mapSize.height = 4096;
	pointlight.shadow.mapSize.width = 4096;
	pointlight.power = 3 * 4 * Math.PI;
	pointlight.castShadow = true;
	pointlight.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(pointlight);

	// groupID = "108";
	groupID = prompt("Please enter the groupID", "8");

	//MQTT
	mqtt = new Mqtt("3478945838475837745874834875734858436457", groupID + "/#");

	//Road
	let roadLeft = new Road(40, 10, 0.2, 0x808080, -11.15, 0, 0)
	scene.add(roadLeft.getMesh);

	let roadRight = new Road(10, 10, 0.2, 0x808080, 14.75, 0, 0)
	scene.add(roadRight.getMesh);

	roadBridge = new Road(0.9, 1.2, 0.08, 0x808080, 9.3, -0.27, 0)
	scene.add(roadBridge.getMesh);

	let roadWater = new Road(0.9, 10, 0.01, 0x0f5e9c, 9.3, 0, -0.2)
	scene.add(roadWater.getMesh);

	roadGate1 = new Road(0.02, 0.5, 0.2, 0x404040, 8.7, 0.1, -0.01)
	scene.add(roadGate1.getMesh);

	roadGate2 = new Road(0.02, 0.5, 0.2, 0x404040, 9.9, 0.1, -0.01)
	scene.add(roadGate2.getMesh);

	roadGate3 = new Road(0.02, 0.5, 0.2, 0x404040, 9.9, -0.6, -0.01)
	scene.add(roadGate3.getMesh);
	
	roadGate4 = new Road(0.02, 0.5, 0.2, 0x404040, 8.7, -0.6, -0.010)
	scene.add(roadGate4.getMesh);

	//Create TrafficLights
	trafficLightArr = initTrafficLights.getTrafficLights();

	trafficLightArr.forEach(trafficLight => {
		scene.add(trafficLight.getMesh);
	});

	//Create Sensors
	sensorArr = initSensors.getSensors();

	sensorArr.forEach(sensor => {
		scene.add(sensor.getMesh);
	});

	//Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild(renderer.domElement);
}

function animate() {
	//Process incoming messages
	if (mqtt.getMessage != []) {
		while (mqtt.getMessage.length != 0) {
			let mqttMessage = mqtt.getMessage.shift();
			let destination = mqttMessage.destinationName.split("/");
			if (destination[1] == "bridge" && destination[3] == "deck") {
				if (mqttMessage.payloadString == "0") {
					open();
				}
				else {
					close();
				}
			}
			else if(destination[1] == "bridge" && destination[3] == "gate"){
				if(destination[4] == "1"){
					if(mqttMessage.payloadString == "1"){
						openGate1();
					}
					else{
						closeGate1();
					}
				}
				else if(destination[4] == "2"){
					if(mqttMessage.payloadString == "1"){
						openGate2();
					}
					else{
						closeGate2();
					}
				}
			}
			else {
				setMode(mqttMessage);
			}
		}
	}

	requestAnimationFrame(animate);

	renderer.render(scene, camera);

	//Check if sensors are triggered
	if (mqtt.getConnected) {
		sensorArr.forEach(sensor => {
			sensor.checkTriggered(carArr, cycleArr, footArr, vesselArr, mqtt, groupID);
		});
	}

	//Move and remove TrafficUsers
	for (let i = carArr.length - 1; i > -1; i--) {
		carArr[i].move(trafficLightArr, carArr, scene, footArr, i);
		if (carArr[i].getReachedEnd) {
			scene.remove(scene.getObjectByName(carArr[i].getMesh.name));
			carArr.splice(i, 1);
		}
	}

	for (let i = cycleArr.length - 1; i > -1; i--) {
		cycleArr[i].move(trafficLightArr, cycleArr);
		if (cycleArr[i].getReachedEnd) {
			scene.remove(scene.getObjectByName(cycleArr[i].getMesh.name));
			cycleArr.splice(i, 1);
		}
	}

	for (let i = footArr.length - 1; i > -1; i--) {
		footArr[i].move(trafficLightArr, footArr);
		if (footArr[i].getReachedEnd) {
			scene.remove(scene.getObjectByName(footArr[i].getMesh.name));
			footArr.splice(i, 1);
		}
	}

	for (let i = vesselArr.length - 1; i > -1; i--) {
		vesselArr[i].move(trafficLightArr, vesselArr);
		if (vesselArr[i].getReachedEnd) {
			scene.remove(scene.getObjectByName(vesselArr[i].getMesh.name));
			vesselArr.splice(i, 1);
		}
	}

	bridgeRoadSensor.checkSensor(groupID, mqtt, carArr, cycleArr, footArr);
	bridgeWaterSensor.checkSensor(groupID, mqtt, vesselArr);

	//Create TrafficUsers
	trafficUserCreater.createTrafficUsers(carArr, cycleArr, footArr, vesselArr, scene);

	//Change TrafficLight colors
	trafficLightArr.forEach(trafficLight => {
		trafficLight.changeColor()
	});
}