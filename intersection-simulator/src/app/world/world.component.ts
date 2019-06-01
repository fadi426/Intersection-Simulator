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
var pivot;

var trafficLightArr = [];
var sensorArr = [];
var initTrafficLights = new InitTrafficLights;
var initSensors = new InitSensors;
var trafficUserCreater = new TrafficUserCreater;
var bridgeRoadSensor = new BridgeRoadSensor;
var bridgeWaterSensor = new BridgeWaterSensor;

var roadBridge;
var bridgeOpen = false;

init();
animate();

function setMode(message) {
	let destination = message.destinationName.split("/");
	trafficLightArr.forEach(trafficLight => {
		if (trafficLight.getGroup == destination[1] && trafficLight.getGroupId == destination[2] && trafficLight.getId == destination[4]) {
			trafficLight.setMode = message.payloadString;
		}108
	});
	if(destination[1] == "bridge" && destination[3] == "light"){
		trafficLightArr[trafficLightArr.length - 1].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 2].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 3].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 4].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 5].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 6].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 7].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 8].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 9].setmode = message.payloadString;
		trafficLightArr[trafficLightArr.length - 10].setmode = message.payloadString;
	}
}

function open(){
	if(!bridgeOpen){
		bridgeOpen = true;
		var pos = roadBridge._mesh.position;
		bridgeTween = TweenLite.to(pos, 5 , {x: pos.x - 1.2, y: pos.y, z: pos.z - 0.01});
		console.log("open");
	}
}

function close(){
	if(bridgeOpen){
		bridgeOpen = false;
		bridgeTween.reverse();
		console.log("close");
	}
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
	// var pos = roadBridge.getMesh.position;
	// console.log(pos);
	// pivot = new THREE.Object3D();
	// pivot.position.set({x: pos.x, y: pos.y, z: pos.z});
	// pivot.position.x -= 0.6;
	// pivot.add(roadBridge.getMesh);
	// scene.add(pivot);
	scene.add(roadBridge.getMesh);

	let roadWater = new Road(0.9, 10, 0.01, 0x0f5e9c, 9.3, 0, -0.2)
	scene.add(roadWater.getMesh);

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

	// open();
}

function animate() {
	//Process incoming messages
	if (mqtt.getMessage != []) {
		while (mqtt.getMessage.length != 0) {
			let mqttMessage = mqtt.getMessage.shift();
			let destination = mqttMessage.destinationName.split("/");
			if(destination[1] == "bridge" && destination[3] == "deck"){
				if(mqttMessage.payloadString == "0"){
					open();
				}
				else{
					close();
				}
			}
			else{
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
		footArr[i].move(trafficLightArr, footArr,);
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