import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Road } from '../road/road'
import { Mqtt } from '../mqtt/mqtt';
import { InitTrafficLights } from '../init/initTrafficLights';
import { InitSensors } from '../init/initSensors';
import { TrafficUserCreater } from '../trafficUserCreater/trafficUserCreater';

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

var road;

var trafficLightArr = [];
var sensorArr = [];
var initTrafficLights = new InitTrafficLights;
var initSensors = new InitSensors;
var trafficUserCreater = new TrafficUserCreater;

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
	pointlight.power = 7 * 4 * Math.PI;
	pointlight.castShadow = true;
	pointlight.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(pointlight);

	//groupID = "8";
	groupID = prompt("Please enter the groupID", "8");

	//MQTT
	mqtt = new Mqtt("3478945836457", groupID + "/#");

	//Road
	road = new Road(40, 10, 0.01, 0x808080)
	scene.add(road.getMesh);

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
			setMode(mqtt.getMessage.shift());
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

	//Create TrafficUsers
	trafficUserCreater.createTrafficUsers(carArr, cycleArr, footArr, vesselArr, scene);

	//Change TrafficLight colors
	trafficLightArr.forEach(trafficLight => {
		trafficLight.changeColor()
	});
}