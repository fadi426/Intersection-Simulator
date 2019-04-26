import { path } from '../path/path';
import * as THREE from 'three';
export class Paths {

    private carPathArr = [];
    private cyclePathArr = [];
    private footPathArr = [];

    constructor(){
        this.carPathArr.push(new path([new THREE.Vector3(-0.35, 5.0, 0.001), new THREE.Vector3(-0.35, 0.35, 0.001), new THREE.Vector3(-2, 0.35, 0.001)], [[1,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-0.21, 5.0, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)], [[2,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-0.07, 5.0, 0.001), new THREE.Vector3(-0.07, -0.35, 0.001), new THREE.Vector3(2.0, -0.35, 0.001)], [[3,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, 0.35, 0.001), new THREE.Vector3(0.35, 0.35, 0.001), new THREE.Vector3(0.35, 2.0, 0.001)], [[4,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, 0.21, 0.001), new THREE.Vector3(0.35, 0.21, 0.001), new THREE.Vector3(-0.49, 0.35, 0.001), new THREE.Vector3(-2.0, 0.35, 0.001)], [[5,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, 0.07, 0.001), new THREE.Vector3(0.35, 0.07, 0.001), new THREE.Vector3(-0.49, 0.21, 0.001), new THREE.Vector3(-2.0, 0.21, 0.001)], [[5,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, -0.07, 0.001), new THREE.Vector3(0.35, -0.07, 0.001), new THREE.Vector3(-0.21, -0.28, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)], [[6,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.35, -5.0, 0.001), new THREE.Vector3(0.35, -0.49, 0.001), new THREE.Vector3(2.0, -0.49, 0.001)], [[7,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.21, -5.0, 0.001), new THREE.Vector3(0.21, -0.35, 0.001), new THREE.Vector3(2.0, -0.35, 0.001)], [[7,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.07, -5.0, 0.001), new THREE.Vector3(0.07, -0.49, 0.001), new THREE.Vector3(0.35, 0.35, 0.001), new THREE.Vector3(0.35, 2.0, 0.001)], [[8,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.49, 0.001), new THREE.Vector3(-0.21, -0.49, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)], [[9,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.35, 0.001), new THREE.Vector3(-0.35, -0.35, 0.001), new THREE.Vector3(0.35, -0.49, 0.001), new THREE.Vector3(2.0, -0.49, 0.001)], [[10,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.21, 0.001), new THREE.Vector3(-0.35, -0.21, 0.001), new THREE.Vector3(0.35, -0.35, 0.001), new THREE.Vector3(2.0, -0.35, 0.001)], [[10,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.07, 0.001), new THREE.Vector3(-0.35, -0.07, 0.001), new THREE.Vector3(0.35, 0.21), new THREE.Vector3(0.35, 2.0, 0.001)], [[11,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.07, -5.0, 0.001), new THREE.Vector3(0.07, 0.35, 0.001), new THREE.Vector3(-2.0, 0.35, 0.001)], [[8,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.76, -5.0, 0.001), new THREE.Vector3(0.76, -0.91, 0.001), new THREE.Vector3(-0.21, -0.91, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)], [[12,1]]));


        this.cyclePathArr.push(new path([new THREE.Vector3(5.0, 0.49, 0.001), new THREE.Vector3(-2.0, 0.49, 0.001)], [[1,1]]));
        this.cyclePathArr.push(new path([new THREE.Vector3(0.49, -5.0, 0.001), new THREE.Vector3(0.49, 2.0, 0.001)], [[2,1]]));
        this.cyclePathArr.push(new path([new THREE.Vector3(-5.0, -0.63, 0.001), new THREE.Vector3(2.0, -0.63, 0.001)], [[3,1]]));
        this.cyclePathArr.push(new path([new THREE.Vector3(-0.49, 5.0, 0.001), new THREE.Vector3(-0.49, -2.0, 0.001)], [[4,1]]));

        this.footPathArr.push(new path([new THREE.Vector3(-5.0, 0.60, 0.001), new THREE.Vector3(2.0, 0.60, 0.001)], [[1,1],[2,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(5.0, 0.66, 0.001), new THREE.Vector3(-2.0, 0.66, 0.001)], [[1,2],[2,2]]));
        this.footPathArr.push(new path([new THREE.Vector3(0.60, 5.0, 0.001), new THREE.Vector3(0.60, -2.0, 0.001)], [[3,1],[4,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(0.66, -5.0, 0.001), new THREE.Vector3(0.66, 2.0, 0.001)], [[3,2],[4,2]]));
        this.footPathArr.push(new path([new THREE.Vector3(5.0, -0.74, 0.001), new THREE.Vector3(-2.0, -0.74, 0.001)], [[5,1],[6,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(-5.0, -0.80, 0.001), new THREE.Vector3(2.0, -0.80, 0.001)], [[5,2],[6,2]]));
        this.footPathArr.push(new path([new THREE.Vector3(-0.60, -5.0, 0.001), new THREE.Vector3(-0.60, 2.0, 0.001)], [[7,1],[8,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(-0.66, 5.0, 0.001), new THREE.Vector3(-0.66, -2.0, 0.001)], [[7,2],[8,2]]));
    }

    public getRandomCarPath(){
        let pathNumber = Math.floor(Math.random() * this.carPathArr.length);
        return this.carPathArr[pathNumber];
    }

    public getRandomCyclePath(){
        let pathNumber = Math.floor(Math.random() * this.cyclePathArr.length);
        return this.cyclePathArr[pathNumber];
    }

    public getRandomFootPath(){
        let pathNumber = Math.floor(Math.random() * this.footPathArr.length);
        return this.footPathArr[pathNumber];
    }
}
