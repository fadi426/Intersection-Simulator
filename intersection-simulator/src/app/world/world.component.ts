import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Paho } from 'ng2-mqtt/mqttws31';

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
var groundGeometry, groundMaterial, groundMesh;
var roadGeometry, roadMaterial, roadMesh;
var carGeometry, carMaterial, carMesh;
var trafficLightGeometry, trafficLightMaterial, trafficLightMesh;
var sensorGeometry, sensorMaterial, sensorMesh;
var stopLineGeometry, stopLineMaterial, stopLineMesh;
var trafficLightMode = 0;
var sensorCurrent = 0;
var connected = false;

var clock = new THREE.Clock(true);

init();
animate();

function setMode(mode) {
  trafficLightMode = mode;
}

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 0.5;
  camera.position.y = -0.5;
  camera.rotation.x = 0.6;

  scene = new THREE.Scene();

  //Ground
  groundGeometry = new THREE.PlaneGeometry(2, 1);
  groundMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
  groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  scene.add(groundMesh);

  //Road
  roadGeometry = new THREE.BoxGeometry(2, 0.2, 0.01);
  roadMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
  roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
  scene.add(roadMesh);

  //Car
  carGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
  carMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
  carMesh = new THREE.Mesh(carGeometry, carMaterial);
  scene.add(carMesh);
  carMesh.position.set(0.9, 0.0, 0.01);

  //TrafficLight
  trafficLightGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
  trafficLightMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  trafficLightMesh = new THREE.Mesh(trafficLightGeometry, trafficLightMaterial);
  scene.add(trafficLightMesh);
  trafficLightMesh.position.set(0, 0, 0.1);

  //TrafficLight
  sensorGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
  sensorMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  sensorMesh = new THREE.Mesh(sensorGeometry, sensorMaterial);
  scene.add(sensorMesh);
  sensorMesh.position.set(0.20, 0, 0);

  //TrafficLight
  stopLineGeometry = new THREE.BoxGeometry(0.015, 0.1, 0.02);
  stopLineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  stopLineMesh = new THREE.Mesh(stopLineGeometry, stopLineMaterial);
  scene.add(stopLineMesh);
  stopLineMesh.position.set(0.14, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  if (connected) {
    if ((Math.abs(carMesh.position.x - sensorMesh.position.x)) < 0.1 && sensorCurrent != 1) {
      sendMessage("1");
      sensorCurrent = 1;
    }
    if((Math.abs(carMesh.position.x - sensorMesh.position.x)) >= 0.1 && sensorCurrent != 0){
      if (sensorCurrent != 0) {
        sendMessage("0");
        sensorCurrent = 0;
      }
    }
  }

  if ((Math.abs(carMesh.position.x - trafficLightMesh.position.x) > 0.2) || trafficLightMode == 0) {
    carMesh.translateX(-0.01);
  }

  if (carMesh.position.x < -1) {
    carMesh.position.x = 0.9;
  }

  if (trafficLightMode == 0) {
    trafficLightMesh.material.color.setHex(0x00ff00);
  }
  if(trafficLightMode == 1) {
    trafficLightMesh.material.color.setHex(0xffa500);
  }
  if(trafficLightMode == 2) {
    trafficLightMesh.material.color.setHex(0xff0000);
  }
}

// Create a client instance
var client = new Paho.MQTT.Client("wss://broker.0f.nl:8084/", "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  var subscribeOptions = {
    qos: 0,  // QoS
    invocationContext: { foo: true },  // Passed to success / failure callback
  };

  console.log("onConnect");
  client.subscribe("8/motor_vehicle/1/light/1", subscribeOptions);
  sendMessage("1");
  connected = true;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

function sendMessage(messageText) {
  var message = new Paho.MQTT.Message(messageText);
  message.destinationName = "8/motor_vehicle/1/sensor/1";
  client.send(message);
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
  setMode(Number(message.payloadString));
}