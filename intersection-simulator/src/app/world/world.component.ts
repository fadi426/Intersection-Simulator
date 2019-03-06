import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';


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
var trafficLightMode = 0;

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

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  if((Math.abs(carMesh.position.x - trafficLightMesh.position.x) > 0.2) || trafficLightMode == 0 ){
    carMesh.translateX(-0.01);  
  }  

  if (carMesh.position.x < -1) {
    carMesh.position.x = 0.9;
  }

  if (clock.getElapsedTime() > 10) {
    setMode(1);
    trafficLightMesh.color = 0xff0000;
  }

  if(trafficLightMode == 0){
    trafficLightMesh.material.color.setHex(0x00ff00);
  }
  else{
    trafficLightMesh.material.color.setHex(0xff0000);
  }
  // console.log(clock.getElapsedTime().toString());
  // console.log(trafficLightMode);

}