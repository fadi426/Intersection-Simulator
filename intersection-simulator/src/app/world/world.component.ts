import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Car } from '../car/car';
import { Cycle } from '../cycle/cycle';
import { Foot } from '../foot/foot';
import { Vessel } from '../vessel/vessel';
import { Ground } from '../ground/ground';
import { Road } from '../road/road'
import { TrafficLight } from '../trafficLight/traffic-light'
import { Sensor } from '../sensor/sensor'
import { Mqtt } from '../mqtt/mqtt';
import { Paths } from '../paths/paths';

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
var grass;
var carArr = [];
var cycleArr = [];
var footArr = [];
var vesselArr = [];
var names = 1;
var carCreatorCounter = 0;
var cycleCreatorCounter = 0;
var footCreatorCounter = 0;
var vesselCreatorCounter = 0;

var road;

var trafficLightArr = [];
var sensorArr = [];
var paths = new Paths;
var clock = new THREE.Clock(true);

init();
animate();

function setMode(message) {
	trafficLightArr.forEach(trafficLight => {
		let destination = message.destinationName.split("/");
		if (trafficLight.getGroup == destination[1] && trafficLight.getGroupId == destination[2] && trafficLight.getId == destination[4]) {
			trafficLight.setMode = message.payloadString;
		}
	});
}

function init() {
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
	camera.position.z = 5.5;
	camera.position.y = -4;
	camera.position.x = 4;
	camera.rotation.x = 0.6;

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight(0x404040);
	scene.add(ambient);

	let pointlight = new THREE.PointLight(0xffffff, 1);
	pointlight.shadow.camera.near = 0.1;
	pointlight.shadow.camera.far = 1000;
	pointlight.position.set(4.5,3,2);
	pointlight.shadow.mapSize.height = 4096;
	pointlight.shadow.mapSize.width = 4096;
	pointlight.power = 7 * 4 * Math.PI;
	pointlight.castShadow = true;
	pointlight.lookAt(new THREE.Vector3(0,0,0));
	scene.add(pointlight);

	//groupID = "8";
	groupID = prompt("Please enter the groupID", "8");

	//MQTT
	mqtt = new Mqtt("3478945836457", groupID + "/#");

	// //Ground
	// grass = new Ground(2, 1, 0x006400);
	// scene.add(grass.getMesh);

	//Road
	road = new Road(40, 10, 0.01, 0x808080)
	scene.add(road.getMesh);

	// road2 = new Road(0.2, 1, 0.01,0x808080)
	// scene.add(road2.getMesh);

	//TrafficLights Car
	trafficLightArr.push(new TrafficLight(-0.35, 0.70, 0, 1, 1, "motor_vehicle", 1.58, 0));
	trafficLightArr.push(new TrafficLight(-0.21, 0.70, 0, 1, 2, "motor_vehicle", 1.58, 0));
	trafficLightArr.push(new TrafficLight(-0.07, 0.70, 0, 1, 3, "motor_vehicle", 1.58, 0));

	trafficLightArr.push(new TrafficLight(0.70, 0.35, 0, 1, 4, "motor_vehicle", 0, 0));
	trafficLightArr.push(new TrafficLight(0.70, 0.21, 0, 1, 5, "motor_vehicle", 0, 0));
	trafficLightArr.push(new TrafficLight(0.70, 0.07, 0, 2, 5, "motor_vehicle", 0, 0));
	trafficLightArr.push(new TrafficLight(0.70, -0.07, 0, 1, 6, "motor_vehicle", 0, 0));

	trafficLightArr.push(new TrafficLight(0.35, -0.98, 0, 1, 7, "motor_vehicle", 1.58, 0));
	trafficLightArr.push(new TrafficLight(0.21, -0.98, 0, 2, 7, "motor_vehicle", 1.58, 0));
	trafficLightArr.push(new TrafficLight(0.07, -0.98, 0, 1, 8, "motor_vehicle", 1.58, 0));

	trafficLightArr.push(new TrafficLight(-0.70, -0.49, 0, 1, 9, "motor_vehicle", 0, 0));
	trafficLightArr.push(new TrafficLight(-0.70, -0.35, 0, 1, 10, "motor_vehicle", 0, 0));
	trafficLightArr.push(new TrafficLight(-0.70, -0.21, 0, 2, 10, "motor_vehicle", 0, 0));
	trafficLightArr.push(new TrafficLight(-0.70, -0.07, 0, 1, 11, "motor_vehicle", 0, 0));

	trafficLightArr.push(new TrafficLight(0.40, -0.91, 0, 1, 12, "motor_vehicle", 0, 0));

	trafficLightArr.push(new TrafficLight(9.6, -0.07, 0, 1, 13, "motor_vehicle", 0, 2));
	trafficLightArr.push(new TrafficLight(9.0, -0.49, 0, 2, 13, "motor_vehicle", 0, 0));

	//TrafficLights Cycle
	trafficLightArr.push(new TrafficLight(0.40, 0.49, 0, 1, 1, "cycle", 0, 0));
	trafficLightArr.push(new TrafficLight(0.49, -0.56, 0, 1, 2, "cycle", 1.58, 0));
	trafficLightArr.push(new TrafficLight(-0.42, -0.63, 0, 1, 3, "cycle", 0, 0));
	trafficLightArr.push(new TrafficLight(-0.49, 0.42, 0, 1, 4, "cycle", 1.58, 0));

	trafficLightArr.push(new TrafficLight(9.6, 0.07, 0, 1, 5, "cycle", 0, 2));
	trafficLightArr.push(new TrafficLight(9.0, -0.63, 0, 2, 5, "cycle", 0, 2));

	//TrafficLights Foot
	trafficLightArr.push(new TrafficLight(-0.42, 0.63, 0, 1, 1, "foot", 0, 0));
	trafficLightArr.push(new TrafficLight(0.14, 0.63, 0, 1, 2, "foot", 0, 0));
	trafficLightArr.push(new TrafficLight(0.0, 0.63, 0, 2, 1, "foot", 0, 0));
	trafficLightArr.push(new TrafficLight(0.40, 0.63, 0, 2, 2, "foot", 0, 0));

	trafficLightArr.push(new TrafficLight(0.63, 0.42, 0, 1, 3, "foot", 1.58, 0));
	trafficLightArr.push(new TrafficLight(0.63, -0.28, 0, 1, 4, "foot", 1.58, 0));
	trafficLightArr.push(new TrafficLight(0.63, -0.14, 0, 2, 3, "foot", 1.58, 0));
	trafficLightArr.push(new TrafficLight(0.63, -0.56, 0, 2, 4, "foot", 1.58, 0));

	trafficLightArr.push(new TrafficLight(0.40, -0.77, 0, 1, 5, "foot", 0, 0));
	trafficLightArr.push(new TrafficLight(-0.14, -0.77, 0, 1, 6, "foot", 0, 0));
	trafficLightArr.push(new TrafficLight(0.0, -0.77, 0, 2, 5, "foot", 0, 0));
	trafficLightArr.push(new TrafficLight(-0.42, -0.77, 0, 2, 6, "foot", 0, 0));

	trafficLightArr.push(new TrafficLight(-0.63, -0.56, 0, 1, 7, "foot", 1.58, 0));
	trafficLightArr.push(new TrafficLight(-0.63, 0.14, 0, 1, 8, "foot", 1.58, 0));
	trafficLightArr.push(new TrafficLight(-0.63, 0.0, 0, 2, 7, "foot", 1.58, 0));
	trafficLightArr.push(new TrafficLight(-0.63, 0.42, 0, 2, 8, "foot", 1.58, 0));

	trafficLightArr.push(new TrafficLight(9.6, 0.21, 0, 1, 9, "foot", 0, 2));
	trafficLightArr.push(new TrafficLight(9.0, -0.77, 0, 2, 9, "foot", 0, 2));

	trafficLightArr.push(new TrafficLight(9.4, -0.91, 0, 1, 1, "vessel", 1.58, 0));
	trafficLightArr.push(new TrafficLight(9.2, 0.35, 0, 1, 2, "vessel", 1.58, 0));

	trafficLightArr.forEach(trafficLight => {
		scene.add(trafficLight.getMesh);
	});

	//Sensors Car
	sensorArr.push(new Sensor(-0.35, 0.78, 0, 1, 1, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.35, 1.68, 0, 2, 1, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.21, 0.78, 0, 1, 2, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.21, 1.68, 0, 2, 2, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.07, 0.78, 0, 1, 3, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.07, 1.68, 0, 2, 3, "motor_vehicle"));

	sensorArr.push(new Sensor(0.78, 0.35, 0, 1, 4, "motor_vehicle"));
	sensorArr.push(new Sensor(1.58, 0.35, 0, 2, 4, "motor_vehicle"));
	sensorArr.push(new Sensor(2.38, 0.35, 0, 3, 4, "motor_vehicle"));
	sensorArr.push(new Sensor(0.78, 0.21, 0, 1, 5, "motor_vehicle"));
	sensorArr.push(new Sensor(1.58, 0.21, 0, 2, 5, "motor_vehicle"));
	sensorArr.push(new Sensor(2.38, 0.21, 0, 3, 5, "motor_vehicle"));
	sensorArr.push(new Sensor(0.78, 0.07, 0, 4, 5, "motor_vehicle"));
	sensorArr.push(new Sensor(1.58, 0.07, 0, 5, 5, "motor_vehicle"));
	sensorArr.push(new Sensor(2.38, 0.07, 0, 6, 5, "motor_vehicle"));
	sensorArr.push(new Sensor(0.78, -0.07, 0, 1, 6, "motor_vehicle"));
	sensorArr.push(new Sensor(1.58, -0.07, 0, 2, 6, "motor_vehicle"));
	sensorArr.push(new Sensor(2.38, -0.07, 0, 3, 6, "motor_vehicle"));

	sensorArr.push(new Sensor(0.35, -1.06, 0, 1, 7, "motor_vehicle"));
	sensorArr.push(new Sensor(0.35, -1.96, 0, 2, 7, "motor_vehicle"));
	sensorArr.push(new Sensor(0.21, -1.06, 0, 3, 7, "motor_vehicle"));
	sensorArr.push(new Sensor(0.21, -1.96, 0, 4, 7, "motor_vehicle"));
	sensorArr.push(new Sensor(0.07, -1.06, 0, 1, 8, "motor_vehicle"));
	sensorArr.push(new Sensor(0.07, -1.96, 0, 2, 8, "motor_vehicle"));

	sensorArr.push(new Sensor(-0.78, -0.49, 0, 1, 9, "motor_vehicle"));
	sensorArr.push(new Sensor(-1.58, -0.49, 0, 2, 9, "motor_vehicle"));
	sensorArr.push(new Sensor(-2.38, -0.49, 0, 3, 9, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.78, -0.35, 0, 1, 10, "motor_vehicle"));
	sensorArr.push(new Sensor(-1.58, -0.35, 0, 2, 10, "motor_vehicle"));
	sensorArr.push(new Sensor(-2.38, -0.35, 0, 3, 10, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.78, -0.21, 0, 4, 10, "motor_vehicle"));
	sensorArr.push(new Sensor(-1.58, -0.21, 0, 5, 10, "motor_vehicle"));
	sensorArr.push(new Sensor(-2.38, -0.21, 0, 6, 10, "motor_vehicle"));
	sensorArr.push(new Sensor(-0.78, -0.07, 0, 1, 11, "motor_vehicle"));
	sensorArr.push(new Sensor(-1.58, -0.07, 0, 2, 11, "motor_vehicle"));
	sensorArr.push(new Sensor(-2.38, -0.07, 0, 3, 11, "motor_vehicle"));

	sensorArr.push(new Sensor(0.48, -0.91, 0, 1, 12, "motor_vehicle"));

	sensorArr.push(new Sensor(1.8, -0.49, 0, 1, 13, "motor_vehicle"));

	//Sensors Cycle
	sensorArr.push(new Sensor(0.48, 0.49, 0, 1, 1, "cycle"));
	sensorArr.push(new Sensor(0.49, -0.64, 0, 1, 2, "cycle"));
	sensorArr.push(new Sensor(-0.50, -0.63, 0, 1, 3, "cycle"));
	sensorArr.push(new Sensor(-0.49, 0.50, 0, 1, 4, "cycle"));

	//Sensors Foot
	sensorArr.push(new Sensor(-0.48, 0.60, 0, 1, 1, "foot"));
	sensorArr.push(new Sensor(0.08, 0.60, 0, 1, 2, "foot"));
	sensorArr.push(new Sensor(0.06, 0.66, 0, 2, 1, "foot"));
	sensorArr.push(new Sensor(0.46, 0.66, 0, 2, 2, "foot"));

	sensorArr.push(new Sensor(0.60, 0.48, 0, 1, 3, "foot"));
	sensorArr.push(new Sensor(0.60, -0.22, 0, 1, 1, "foot"));
	sensorArr.push(new Sensor(0.66, -0.20, 0, 2, 3, "foot"));
	sensorArr.push(new Sensor(0.66, -0.62, 0, 2, 4, "foot"));

	sensorArr.push(new Sensor(0.46, -0.74, 0, 1, 5, "foot"));
	sensorArr.push(new Sensor(-0.08, -0.74, 0, 1, 6, "foot"));
	sensorArr.push(new Sensor(-0.06, -0.80, 0, 2, 5, "foot"));
	sensorArr.push(new Sensor(-0.48, -0.80, 0, 2, 6, "foot"));

	sensorArr.push(new Sensor(-0.60, -0.62, 0, 1, 7, "foot"));
	sensorArr.push(new Sensor(-0.60, 0.08, 0, 1, 8, "foot"));
	sensorArr.push(new Sensor(-0.66, 0.06, 0, 2, 7, "foot"));
	sensorArr.push(new Sensor(-0.66, 0.48, 0, 2, 8, "foot"));

	sensorArr.push(new Sensor(9.4, -0.99, 0, 1, 1, "vessel"));
	sensorArr.push(new Sensor(9.2, 0.43, 0, 1, 2, "vessel"));

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
	if (mqtt.getMessage != []) {
		while (mqtt.getMessage.length != 0) {
			setMode(mqtt.getMessage.shift());
		}
	}

	requestAnimationFrame(animate);

	renderer.render(scene, camera);

	if (mqtt.getConnected) {
		sensorArr.forEach(sensor => {
			let triggered = false;
			carArr.forEach(car => {
				if ((Math.abs(car.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(car.getMesh.position.y - sensor.getMesh.position.y) < 0.05) && sensor.getType == "motor_vehicle") {
					triggered = true;
				}
			});
			cycleArr.forEach(cycle => {
				if ((Math.abs(cycle.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(cycle.getMesh.position.y - sensor.getMesh.position.y) < 0.05) && sensor.getType == "cycle") {
					triggered = true;
				}
			});
			footArr.forEach(foot => {
				if ((Math.abs(foot.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(foot.getMesh.position.y - sensor.getMesh.position.y) < 0.05) && sensor.getType == "foot") {
					triggered = true;
				}
			});
			vesselArr.forEach(vessel => {
				if ((Math.abs(vessel.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(vessel.getMesh.position.y - sensor.getMesh.position.y) < 0.05) && sensor.getType == "vessel") {
					triggered = true;
				}
			});
			if (triggered && sensor.getSensorValue == 0) {
				if(sensor.getSensorGroup == 13){
					console.log(1);
				}
				mqtt.sendMessage("1", groupID + "/" + sensor.getType + "/" + sensor.getSensorGroup + "/sensor/" + sensor.getId);
				sensor.setSensorValue = 1;
			}
			if (!triggered && sensor.getSensorValue == 1) {
				if(sensor.getSensorGroup == 13){
					console.log(0);
				}
				mqtt.sendMessage("0", groupID + "/" + sensor.getType + "/" + sensor.getSensorGroup + "/sensor/" + sensor.getId);
				sensor.setSensorValue = 0;
			}
		});
	}

	for (let i = carArr.length - 1; i > -1; i--) {
		carArr[i].move(trafficLightArr, carArr);
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

	carCreatorCounter += 0.01
	if (carCreatorCounter > 0.3 && carArr.length < 150) {
		let car = new Car(names++, paths.getRandomCarPath());
		carArr.push(car);
		scene.add(car.getMesh);
		carCreatorCounter = 0;
	}

	cycleCreatorCounter += 0.01
	if (cycleCreatorCounter > 10 && cycleArr.length < 500) {
		let cycle = new Cycle(names++, paths.getRandomCyclePath());
		cycleArr.push(cycle);
		scene.add(cycle.getMesh);
		cycleCreatorCounter = 0;
	}

	footCreatorCounter += 0.01
	if (footCreatorCounter > 5 && footArr.length < 500) {
		let foot = new Foot(names++, paths.getRandomFootPath());
		footArr.push(foot);
		scene.add(foot.getMesh);
		footCreatorCounter = 0;
	}

	vesselCreatorCounter += 0.01
	if (vesselCreatorCounter > 15 && vesselArr.length < 500) {
		let vessel = new Vessel(names++, paths.getRandomVesselPath());
		vesselArr.push(vessel);
		scene.add(vessel.getMesh);
		vesselCreatorCounter = 0;
	}

	trafficLightArr.forEach(trafficLight => {
		trafficLight.changeColor()
	});
}