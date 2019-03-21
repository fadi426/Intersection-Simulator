import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Car } from '../car/car';
import { Ground } from '../ground/ground';
import { Road } from '../road/road'
import { TrafficLight } from '../trafficLight/traffic-light'
import { Sensor } from '../sensor/sensor'
import { StopLine } from '../StopLine/stop-line'
import { Mqtt } from '../mqtt/mqtt';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

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
var mqttMessage = null;
var sensorCurrent = 0;
var grass;

var road;
var car1;
var trafficLight1;
var sensor1;
var stopLine1;

var road2;
var car2;
var trafficLight2;
var sensor2;
var stopLine2;

var clock = new THREE.Clock(true);

init();
animate();

function setMode(mode) {
  trafficLight1.setMode = mode;
  mqtt.setMessage(null);
}

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 0.5;
  camera.position.y = -0.5;
  camera.rotation.x = 0.6;

  scene = new THREE.Scene();

  //MQTT
  mqtt = new Mqtt("3478945836457", "8/motor_vehicle/1/light/1");

  //Ground
  grass = new Ground(2, 1, 0x006400);
  scene.add(grass.getMesh);

  //Road
  road = new Road(2, 0.2, 0.01,0x808080)
  scene.add(road.getMesh);

  road2 = new Road(0.2, 1, 0.01,0x808080)
  scene.add(road2.getMesh);

  //Car
  car1 = new Car(0.9, 0.0, 0.01);
  scene.add(car1.getMesh);

  car2 = new Car(0.0, -0.5, 0.01);
  car2.getMesh.rotateZ(1.58);
  scene.add(car2.getMesh);

  //TrafficLight
  trafficLight1 = new TrafficLight(0.1, 0, 0.1, 1)
  scene.add(trafficLight1.getMesh);

  trafficLight2 = new TrafficLight(-0.1, -0.1, 0.1, 2)
  scene.add(trafficLight2.getMesh);

  //Sensor
  sensor1 = new Sensor(0.20, 0, 0, 1);
  scene.add(sensor1.getMesh);

  sensor2 = new Sensor(0, -0.2, 0, 2);
  scene.add(sensor2.getMesh);

  //StopLine
  stopLine1 = new StopLine(0.14, 0, 0);
  scene.add(stopLine1.getMesh);

  stopLine2 = new StopLine(0, -0.14, 0);
  stopLine2.getMesh.rotateZ(1.58);
  scene.add(stopLine2.getMesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {

  if(mqtt.getMessage != null){
    setMode(mqtt.getMessage);
  }

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  if (mqtt.getConnected) {
    if ((Math.abs(car1.getMesh.position.x - sensor1.getMesh.position.x)) < 0.1 && sensorCurrent != 1) {
      mqtt.sendMessage("1");
      sensorCurrent = 1;
    }
    if((Math.abs(car1.getMesh.position.x - sensor1.getMesh.position.x)) >= 0.1 && sensorCurrent != 0){
      if (sensorCurrent != 0) {
        mqtt.sendMessage("0");
        sensorCurrent = 0;
      }
    }
  }

  if ((Math.abs(car1.getMesh.position.x - trafficLight1.getMesh.position.x) > 0.2) || trafficLight1.getMode == 0) {
    car1.getMesh.translateX(-0.01);
  }

  if (car1.getMesh.position.x < -1) {
    car1.getMesh.position.x = 0.9;
  }

  if ((Math.abs(car2.getMesh.position.y - trafficLight2.getMesh.position.y) > 0.2) || trafficLight2.getMode == 0) {
    car2.getMesh.translateX(0.01);
  }

  if (car2.getMesh.position.y > 0.5) {
    car2.getMesh.position.set(0.0, -0.5, 0.01);
  }

  if (trafficLight1.getMode == 0) {
    trafficLight1.getMesh.material.color.setHex(0x00ff00);
  }
  if(trafficLight1.getMode == 1) {
    trafficLight1.getMesh.material.color.setHex(0xffa500);
  }
  if(trafficLight1.getMode == 2) {
    trafficLight1.getMesh.material.color.setHex(0xff0000);
  }
}

// // Create a client instance
// var client = new Paho.MQTT.Client("wss://broker.0f.nl:8084/", "clientId");

// // set callback handlers
// client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;

// // connect the client
// client.connect({ onSuccess: onConnect });


// // called when the client connects
// function onConnect() {
//   // Once a connection has been made, make a subscription and send a message.
//   var subscribeOptions = {
//     qos: 0,  // QoS
//     invocationContext: { foo: true },  // Passed to success / failure callback
//   };

//   console.log("onConnect");
//   client.subscribe("8/#", subscribeOptions);
//   sendMessage("1");
//   connected = true;
// }

// // called when the client loses its connection
// function onConnectionLost(responseObject) {
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost:" + responseObject.errorMessage);
//   }
// }

// function sendMessage(messageText) {
//   var message = new Paho.MQTT.Message(messageText);
//   message.destinationName = "8/motor_vehicle/1/sensor/1";
//   client.send(message);
// }

// // called when a message arrives
// function onMessageArrived(message) {
//   console.log("onMessageArrived:" + message.payloadString);
//   console.log("topic:" + message.topic);
//   setMode(Number(message.payloadString));
// }