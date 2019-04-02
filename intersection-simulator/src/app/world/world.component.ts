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
var trafficLight1;
var sensor1;
var stopLine1;

var road2;
var car2;
var trafficLight2;
var sensor2;
var stopLine2;

var trafficLightArr = [];
var sensorArr = [];

var clock = new THREE.Clock(true);

init();
animate();

function setMode(mode) {
  trafficLightArr.forEach(trafficLight => {
    if(trafficLight.getId == mqtt.getDestination.charAt(16))
    {
      trafficLight.setMode = mode;
      mqtt.setMessage(null);
      mqtt.setDestination(null);
    }
  });
}

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;
  //camera.position.y = 0;
  camera.rotation.x = 0;

  scene = new THREE.Scene();

  groupID = prompt("Please enter the groupID", "8");

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
  trafficLight1 = new TrafficLight(0.14, 0, 0, 1, 0);
  trafficLightArr.push(trafficLight1);
  scene.add(trafficLightArr[0].getMesh);

  trafficLight2 = new TrafficLight(0, -0.14, 0, 2, 1.58);
  trafficLightArr.push(trafficLight2);
  scene.add(trafficLightArr[1].getMesh);

  //Sensor
  sensor1 = new Sensor(0.20, 0, 0, 1, 1);
  sensorArr.push(sensor1);
  scene.add(sensor1.getMesh);

  sensor2 = new Sensor(0, -0.2, 0, 2, 2);
  sensorArr.push(sensor2);
  scene.add(sensor2.getMesh);

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
        mqtt.sendMessage("1", groupID + "/motor_vehicle/" + sensor.getSensorGroup + "/sensor/1");
        sensor.setSensorValue = 1;
      }
      if(!triggered && sensor.getSensorValue == 1){
        mqtt.sendMessage("0", groupID + "/motor_vehicle/" + sensor.getSensorGroup + "/sensor/1");
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
  if(carCreatorCounter > 1 && carArr.length < 6){
    let car = new Car(names++)
    carArr.push(car);
    scene.add(car.getMesh);
    carCreatorCounter = 0;
  }

  trafficLightArr[0].changeColor();
  trafficLightArr[1].changeColor();
}