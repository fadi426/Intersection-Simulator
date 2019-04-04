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
var groupID;
var mqttMessage = null;
var sensorCurrent = 0;
var grass;
var carArr = [];
var names = 1;
var carCreatorCounter = 0;

var road;
var car1;
// var trafficLight1;
// var sensor1;
var stopLine1;

var road2;
var car2;
// var trafficLight2;
// var sensor2;
var stopLine2;

var trafficLightArr = [];
var sensorArr = [];

var clock = new THREE.Clock(true);

init();
animate();

function setMode(mode) {
  trafficLightArr.forEach(trafficLight => {
    let message = mqtt.getDestination.split("/");
    if(trafficLight.getGroupId == message[2] && trafficLight.getId == message[4])
    {
      trafficLight.setMode = mode;
      mqtt.setMessage(null);
      mqtt.setDestination(null);
    }
  });
}

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 4;
  //camera.position.y = 0;
  camera.rotation.x = 0;

  scene = new THREE.Scene();

  groupID = "8";
  //groupID = prompt("Please enter the groupID", "8");

  //MQTT
  mqtt = new Mqtt("3478945836457", groupID + "/#");

  // //Ground
  // grass = new Ground(2, 1, 0x006400);
  // scene.add(grass.getMesh);

  //Road
  road = new Road(10, 10, 0.01,0x808080)
  scene.add(road.getMesh);

  // road2 = new Road(0.2, 1, 0.01,0x808080)
  // scene.add(road2.getMesh);

  //TrafficLight
  let trafficLight1 = new TrafficLight(-0.35, 0.40, 0, 1, 1, 1.58);
  trafficLightArr.push(trafficLight1);

  let trafficLight2 = new TrafficLight(-0.21, 0.40, 0, 1, 2, 1.58);
  trafficLightArr.push(trafficLight2);

  let trafficLight3 = new TrafficLight(-0.07, 0.40, 0, 1, 3, 1.58);
  trafficLightArr.push(trafficLight3);

  let trafficLight4 = new TrafficLight(0.40, 0.35, 0, 1, 4, 0);
  trafficLightArr.push(trafficLight4);

  let trafficLight5 = new TrafficLight(0.40, 0.21, 0, 1, 5, 0);
  trafficLightArr.push(trafficLight5);

  let trafficLight6 = new TrafficLight(0.40, 0.07, 0, 2, 5, 0);
  trafficLightArr.push(trafficLight6);

  let trafficLight7 = new TrafficLight(0.40, -0.07, 0, 1, 6, 0);
  trafficLightArr.push(trafficLight7);

  let trafficLight8 = new TrafficLight(0.35, -0.54, 0, 1, 7, 1.58);
  trafficLightArr.push(trafficLight8);

  let trafficLight9 = new TrafficLight(0.21, -0.54, 0, 2, 7, 1.58);
  trafficLightArr.push(trafficLight9);

  let trafficLight10 = new TrafficLight(0.07, -0.54, 0, 1, 8, 1.58);
  trafficLightArr.push(trafficLight10);

  let trafficLight11 = new TrafficLight(-0.40, -0.49, 0, 1, 9, 0);
  trafficLightArr.push(trafficLight11);

  let trafficLight12 = new TrafficLight(-0.40, -0.35, 0, 1, 10, 0);
  trafficLightArr.push(trafficLight12);

  let trafficLight13 = new TrafficLight(-0.40, -0.21, 0, 2, 10, 0);
  trafficLightArr.push(trafficLight13);

  let trafficLight14 = new TrafficLight(-0.40, -0.07, 0, 1, 11, 0);
  trafficLightArr.push(trafficLight14);

  trafficLightArr.forEach(trafficLight => {
    scene.add(trafficLight.getMesh);
  });

  // trafficLight2 = new TrafficLight(0, -0.14, 0, 2, 1.58);
  // trafficLightArr.push(trafficLight2);
  // scene.add(trafficLightArr[1].getMesh);

  //Sensor
  let sensor1 = new Sensor(-0.35, 0.48, 0, 1, 1);
  sensorArr.push(sensor1);

  let sensor2 = new Sensor(-0.21, 0.48, 0, 1, 2);
  sensorArr.push(sensor2);

  let sensor3 = new Sensor(-0.07, 0.48, 0, 1, 3);
  sensorArr.push(sensor3);

  let sensor4 = new Sensor(0.48, 0.35, 0, 1, 4);
  sensorArr.push(sensor4);

  let sensor5 = new Sensor(0.48, 0.21, 0, 1, 5);
  sensorArr.push(sensor5);

  let sensor6 = new Sensor(0.48, 0.07, 0, 2, 5);
  sensorArr.push(sensor6);

  let sensor7 = new Sensor(0.48, -0.07, 0, 1, 6);
  sensorArr.push(sensor7);

  let sensor8 = new Sensor(0.35, -0.62, 0, 1, 7);
  sensorArr.push(sensor8);

  let sensor9 = new Sensor(0.21, -0.62, 0, 2, 7);
  sensorArr.push(sensor9);

  let sensor10 = new Sensor(0.07, -0.62, 0, 1, 8);
  sensorArr.push(sensor10);

  let sensor11 = new Sensor(-0.48, -0.49, 0, 1, 9);
  sensorArr.push(sensor11);

  let sensor12 = new Sensor(-0.48, -0.35, 0, 1, 10);
  sensorArr.push(sensor12);

  let sensor13 = new Sensor(-0.48, -0.21, 0, 2, 10);
  sensorArr.push(sensor13);

  let sensor14 = new Sensor(-0.48, -0.07, 0, 1, 11);
  sensorArr.push(sensor14);

  sensorArr.forEach(sensor => {
    scene.add(sensor.getMesh);
  });

  //Renderer
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

  if(mqtt.getConnected){
    sensorArr.forEach(sensor => {
      let triggered = false;
      carArr.forEach(car => {
        if((Math.abs(car.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(car.getMesh.position.y - sensor.getMesh.position.y) < 0.05)){
          triggered = true;
        }
      });
      if(triggered && sensor.getSensorValue == 0){
        mqtt.sendMessage("1", groupID + "/motor_vehicle/" + sensor.getSensorGroup + "/sensor/" + sensor.getId);
        sensor.setSensorValue = 1;
      }
      if(!triggered && sensor.getSensorValue == 1){
        mqtt.sendMessage("0", groupID + "/motor_vehicle/" + sensor.getSensorGroup + "/sensor/" + sensor.getId);
        sensor.setSensorValue = 0;
      }
    });
  }

  for(let i = carArr.length - 1; i > -1; i--){
    carArr[i].move(trafficLightArr, carArr);
    if(carArr[i].getReachedEnd){
      scene.remove(scene.getObjectByName(carArr[i].getMesh.name));
      carArr.splice(i,1);
    }
  }

  carCreatorCounter += 0.01
  if(carCreatorCounter > 0.60 && carArr.length < 500){
    let car = new Car(names++)
    carArr.push(car);
    scene.add(car.getMesh);
    carCreatorCounter = 0;
  }

  trafficLightArr.forEach(trafficLight => {
    trafficLight.changeColor()
  });
}