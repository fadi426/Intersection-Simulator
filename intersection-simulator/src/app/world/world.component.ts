import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Car } from '../car/car';
import { Cycle } from '../cycle/cycle';
import { Foot } from '../foot/foot';
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
var cycleArr = [];
var footArr = [];
var names = 1;
var carCreatorCounter = 0;
var cycleCreatorCounter = 0;
var footCreatorCounter = 0;

var road;

var trafficLightArr = [];
var sensorArr = [];

var clock = new THREE.Clock(true);

init();
animate();

function setMode(mode) {
  trafficLightArr.forEach(trafficLight => {
    let message = mqtt.getDestination.split("/");
    if(trafficLight.getGroup == message[1] && trafficLight.getGroupId == message[2] && trafficLight.getId == message[4])
    {
      trafficLight.setMode = mode;
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

  //groupID = "8";
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

  //TrafficLights Car
  trafficLightArr.push(new TrafficLight(-0.35, 0.70, 0, 1, 1, "motor_vehicle", 1.58));
  trafficLightArr.push(new TrafficLight(-0.21, 0.70, 0, 1, 2, "motor_vehicle", 1.58));
  trafficLightArr.push(new TrafficLight(-0.07, 0.70, 0, 1, 3, "motor_vehicle", 1.58));

  trafficLightArr.push(new TrafficLight(0.70, 0.35, 0, 1, 4, "motor_vehicle", 0));
  trafficLightArr.push(new TrafficLight(0.70, 0.21, 0, 1, 5, "motor_vehicle", 0));
  trafficLightArr.push(new TrafficLight(0.70, 0.07, 0, 2, 5, "motor_vehicle", 0));
  trafficLightArr.push(new TrafficLight(0.70, -0.07, 0, 1, 6, "motor_vehicle", 0));

  trafficLightArr.push(new TrafficLight(0.35, -0.84, 0, 1, 7, "motor_vehicle", 1.58));
  trafficLightArr.push(new TrafficLight(0.21, -0.84, 0, 2, 7, "motor_vehicle", 1.58));
  trafficLightArr.push(new TrafficLight(0.07, -0.84, 0, 1, 8, "motor_vehicle", 1.58));

  trafficLightArr.push(new TrafficLight(-0.70, -0.49, 0, 1, 9, "motor_vehicle", 0));
  trafficLightArr.push(new TrafficLight(-0.70, -0.35, 0, 1, 10, "motor_vehicle", 0));
  trafficLightArr.push(new TrafficLight(-0.70, -0.21, 0, 2, 10, "motor_vehicle", 0));
  trafficLightArr.push(new TrafficLight(-0.70, -0.07, 0, 1, 11, "motor_vehicle", 0));

  //TrafficLights Cycle
  trafficLightArr.push(new TrafficLight(0.40, 0.49, 0, 1, 1, "cycle", 0));
  trafficLightArr.push(new TrafficLight(0.49, -0.56, 0, 1, 2, "cycle", 1.58));
  trafficLightArr.push(new TrafficLight(-0.42, -0.63, 0, 1, 3, "cycle", 0));
  trafficLightArr.push(new TrafficLight(-0.49, 0.42, 0, 1, 4, "cycle", 1.58));

  //TrafficLights Foot
  trafficLightArr.push(new TrafficLight(-0.42, 0.63, 0, 1, 1, "foot", 0));
  trafficLightArr.push(new TrafficLight(0.14, 0.63, 0, 2, 1, "foot", 0));
  trafficLightArr.push(new TrafficLight(0.0, 0.63, 0, 1, 2, "foot", 0));
  trafficLightArr.push(new TrafficLight(0.40, 0.63, 0, 2, 2, "foot", 0));

  trafficLightArr.push(new TrafficLight(0.63, 0.42, 0, 1, 3, "foot", 1.58));
  trafficLightArr.push(new TrafficLight(0.63, -0.28, 0, 2, 3, "foot", 1.58));
  trafficLightArr.push(new TrafficLight(0.63, -0.14, 0, 1, 4, "foot", 1.58));
  trafficLightArr.push(new TrafficLight(0.63, -0.56, 0, 2, 4, "foot", 1.58));

  trafficLightArr.push(new TrafficLight(0.40, -0.77, 0, 1, 5, "foot", 0));
  trafficLightArr.push(new TrafficLight(-0.14, -0.77, 0, 2, 5, "foot", 0));
  trafficLightArr.push(new TrafficLight(0.0, -0.77, 0, 1, 6, "foot", 0));
  trafficLightArr.push(new TrafficLight(-0.42, -0.77, 0, 2, 6, "foot", 0));

  trafficLightArr.push(new TrafficLight(-0.63, -0.56, 0, 1, 7, "foot", 1.58));
  trafficLightArr.push(new TrafficLight(-0.63, 0.14, 0, 2, 7, "foot", 1.58));
  trafficLightArr.push(new TrafficLight(-0.63, 0.0, 0, 1, 8, "foot", 1.58));
  trafficLightArr.push(new TrafficLight(-0.63, 0.42, 0, 2, 8, "foot", 1.58));

  trafficLightArr.forEach(trafficLight => {
    scene.add(trafficLight.getMesh);
  });

  //Sensors Car
  sensorArr.push(new Sensor(-0.35, 0.78, 0, 1, 1, "motor_vehicle"));
  sensorArr.push(new Sensor(-0.21, 0.78, 0, 1, 2, "motor_vehicle"));
  sensorArr.push(new Sensor(-0.07, 0.78, 0, 1, 3, "motor_vehicle"));

  sensorArr.push(new Sensor(0.78, 0.35, 0, 1, 4, "motor_vehicle"));
  sensorArr.push(new Sensor(0.78, 0.21, 0, 1, 5, "motor_vehicle"));
  sensorArr.push(new Sensor(0.78, 0.07, 0, 2, 5, "motor_vehicle"));
  sensorArr.push(new Sensor(0.78, -0.07, 0, 1, 6, "motor_vehicle"));

  sensorArr.push(new Sensor(0.35, -0.92, 0, 1, 7, "motor_vehicle"));
  sensorArr.push(new Sensor(0.21, -0.92, 0, 2, 7, "motor_vehicle"));
  sensorArr.push(new Sensor(0.07, -0.92, 0, 1, 8, "motor_vehicle"));

  sensorArr.push(new Sensor(-0.78, -0.49, 0, 1, 9, "motor_vehicle"));
  sensorArr.push(new Sensor(-0.78, -0.35, 0, 1, 10, "motor_vehicle"));
  sensorArr.push(new Sensor(-0.78, -0.21, 0, 2, 10, "motor_vehicle"));
  sensorArr.push(new Sensor(-0.78, -0.07, 0, 1, 11, "motor_vehicle"));

  //Sensors Cycle
  sensorArr.push(new Sensor(0.48, 0.49, 0, 1, 1, "cycle"));
  sensorArr.push(new Sensor(0.49, -0.64, 0, 1, 2, "cycle"));
  sensorArr.push(new Sensor(-0.50, -0.63, 0, 1, 3, "cycle"));
  sensorArr.push(new Sensor(-0.49, 0.50, 0, 1, 4, "cycle"));

  //Sensors Foot
  sensorArr.push(new Sensor(-0.48, 0.60, 0, 1, 1, "foot"));
  sensorArr.push(new Sensor(0.08, 0.60, 0, 2, 1, "foot"));
  sensorArr.push(new Sensor(0.06, 0.66, 0, 1, 2, "foot"));
  sensorArr.push(new Sensor(0.46, 0.66, 0, 2, 2, "foot"));

  sensorArr.push(new Sensor(0.60, 0.48, 0, 1, 3, "foot"));
  sensorArr.push(new Sensor(0.60, -0.22, 0, 2, 3, "foot"));
  sensorArr.push(new Sensor(0.66, -0.20, 0, 1, 4, "foot"));
  sensorArr.push(new Sensor(0.66, -0.62, 0, 2, 4, "foot"));

  sensorArr.push(new Sensor(0.46, -0.74, 0, 1, 5, "foot"));
  sensorArr.push(new Sensor(-0.08, -0.74, 0, 2, 5, "foot"));
  sensorArr.push(new Sensor(-0.06, -0.80, 0, 1, 6, "foot"));
  sensorArr.push(new Sensor(-0.52, -0.80, 0, 2, 6, "foot"));

  sensorArr.push(new Sensor(-0.60, -0.62, 0, 1, 7, "foot"));
  sensorArr.push(new Sensor(-0.60, 0.08, 0, 2, 7, "foot"));
  sensorArr.push(new Sensor(-0.66, 0.06, 0, 1, 8, "foot"));
  sensorArr.push(new Sensor(-0.66, 0.48, 0, 2, 8, "foot"));

  sensorArr.forEach(sensor => {
    scene.add(sensor.getMesh);
  });

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {

  if(mqtt.getMessage != []){
    mqtt.getMessage.forEach(message => {
      setMode(message);
    });
    mqtt.emptyMessage();
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
      cycleArr.forEach(cycle => {
        if((Math.abs(cycle.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(cycle.getMesh.position.y - sensor.getMesh.position.y) < 0.05)){
          triggered = true;
        }
      });
      footArr.forEach(foot => {
        if((Math.abs(foot.getMesh.position.x - sensor.getMesh.position.x) < 0.05) && (Math.abs(foot.getMesh.position.y - sensor.getMesh.position.y) < 0.05)){
          triggered = true;
        }
      });
      if(triggered && sensor.getSensorValue == 0){
        mqtt.sendMessage("1", groupID + "/" + sensor.getType + "/" + sensor.getSensorGroup + "/sensor/" + sensor.getId);
        sensor.setSensorValue = 1;
      }
      if(!triggered && sensor.getSensorValue == 1){
        mqtt.sendMessage("0", groupID + "/" + sensor.getType + "/" + sensor.getSensorGroup + "/sensor/" + sensor.getId);
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

  for(let i = cycleArr.length - 1; i > -1; i--){
    cycleArr[i].move(trafficLightArr, cycleArr);
    if(cycleArr[i].getReachedEnd){
      scene.remove(scene.getObjectByName(cycleArr[i].getMesh.name));
      cycleArr.splice(i,1);
    }
  }

  for(let i = footArr.length - 1; i > -1; i--){
    footArr[i].move(trafficLightArr, footArr);
    if(footArr[i].getReachedEnd){
      scene.remove(scene.getObjectByName(footArr[i].getMesh.name));
      footArr.splice(i,1);
    }
  }

  carCreatorCounter += 0.01
  if(carCreatorCounter > 0.60 && carArr.length < 500){
    let car = new Car(names++);
    carArr.push(car);
    scene.add(car.getMesh);
    carCreatorCounter = 0;
  }

  cycleCreatorCounter += 0.01
  if(cycleCreatorCounter > 10 && cycleArr.length < 500){
    let cycle = new Cycle(names++);
    cycleArr.push(cycle);
    scene.add(cycle.getMesh);
    cycleCreatorCounter = 0;
  }

  footCreatorCounter += 0.09
  if(footCreatorCounter > 10 && footArr.length < 500){
    let foot = new Foot(names++);
    footArr.push(foot);
    scene.add(foot.getMesh);
    footCreatorCounter = 0;
  }

  trafficLightArr.forEach(trafficLight => {
    trafficLight.changeColor()
  });
}