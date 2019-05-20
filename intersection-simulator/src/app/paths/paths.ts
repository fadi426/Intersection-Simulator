import { path } from '../path/path';
import * as THREE from 'three';
export class Paths {

	private height = 0.013;
	private vesselHeight = -0.2;
	private footHeight = 0.001;

    private carPathArr = [];
    private cyclePathArr = [];
	private footPathArr = [];
	private vesselPathArr = [];

    constructor(){
        this.carPathArr.push(new path([new THREE.Vector3(-0.35, 5.0, this.height), new THREE.Vector3(-0.35, 0.35, this.height), new THREE.Vector3(-2, 0.35, this.height)], [[1,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-0.21, 5.0, this.height), new THREE.Vector3(-0.21, -2.0, this.height)], [[2,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-0.07, 5.0, this.height), new THREE.Vector3(-0.07, -0.49, this.height), new THREE.Vector3(11.0, -0.49, this.height)], [[3,1],[13,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, 0.35, this.height), new THREE.Vector3(0.35, 0.35, this.height), new THREE.Vector3(0.35, 2.0, this.height)], [[4,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, 0.21, this.height), new THREE.Vector3(0.35, 0.21, this.height), new THREE.Vector3(-0.49, 0.35, this.height), new THREE.Vector3(-2.0, 0.35, this.height)], [[5,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(5.0, 0.07, this.height), new THREE.Vector3(0.35, 0.07, this.height), new THREE.Vector3(-0.49, 0.21, this.height), new THREE.Vector3(-2.0, 0.21, this.height)], [[5,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(11.0, -0.07, this.height), new THREE.Vector3(5.0, -0.07, this.height), new THREE.Vector3(0.35, -0.07, this.height), new THREE.Vector3(-0.21, -0.28, this.height), new THREE.Vector3(-0.21, -2.0, this.height)], [[6,1],[13,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.35, -5.0, this.height), new THREE.Vector3(0.35, -0.49, this.height), new THREE.Vector3(11.0, -0.49, this.height)], [[7,1],[13,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.21, -5.0, this.height), new THREE.Vector3(0.21, -0.35, this.height), new THREE.Vector3(2.0, -0.35, this.height), new THREE.Vector3(2.2, -0.49, this.height), new THREE.Vector3(11.0, -0.49, this.height)], [[7,2],[13,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.07, -5.0, this.height), new THREE.Vector3(0.07, -0.49, this.height), new THREE.Vector3(0.35, 0.35, this.height), new THREE.Vector3(0.35, 2.0, this.height)], [[8,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.49, this.height), new THREE.Vector3(-0.21, -0.49, this.height), new THREE.Vector3(-0.21, -2.0, this.height)], [[9,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.35, this.height), new THREE.Vector3(-0.35, -0.35, this.height), new THREE.Vector3(0.35, -0.49, this.height), new THREE.Vector3(11.0, -0.49, this.height)], [[10,1],[13,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.21, this.height), new THREE.Vector3(-0.35, -0.21, this.height), new THREE.Vector3(0.35, -0.35, this.height), new THREE.Vector3(2.0, -0.35, this.height), new THREE.Vector3(2.2, -0.49, this.height), new THREE.Vector3(11.0, -0.49, this.height)], [[10,2],[13,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(-5.0, -0.07, this.height), new THREE.Vector3(-0.35, -0.07, this.height), new THREE.Vector3(0.35, 0.21), new THREE.Vector3(0.35, 2.0, this.height)], [[11,1],[13,2]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.07, -5.0, this.height), new THREE.Vector3(0.07, 0.35, this.height), new THREE.Vector3(-2.0, 0.35, this.height)], [[8,1]]));
        this.carPathArr.push(new path([new THREE.Vector3(0.76, -5.0, this.height), new THREE.Vector3(0.76, -0.91, this.height), new THREE.Vector3(-0.21, -0.91, this.height), new THREE.Vector3(-0.21, -2.0, this.height)], [[12,1]]));


        this.cyclePathArr.push(new path([new THREE.Vector3(5.0, 0.49, this.height), new THREE.Vector3(-2.0, 0.49, this.height)], [[1,1]]));
        this.cyclePathArr.push(new path([new THREE.Vector3(0.49, -5.0, this.height), new THREE.Vector3(0.49, 2.0, this.height)], [[2,1]]));
        this.cyclePathArr.push(new path([new THREE.Vector3(-5.0, -0.63, this.height), new THREE.Vector3(2.0, -0.63, this.height)], [[3,1]]));
        this.cyclePathArr.push(new path([new THREE.Vector3(-0.49, 5.0, this.height), new THREE.Vector3(-0.49, -2.0, this.height)], [[4,1]]));

        this.footPathArr.push(new path([new THREE.Vector3(-5.0, 0.60, this.footHeight), new THREE.Vector3(2.0, 0.60, this.footHeight)], [[1,1],[2,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(5.0, 0.66, this.footHeight), new THREE.Vector3(-2.0, 0.66, this.footHeight)], [[1,2],[2,2]]));
        this.footPathArr.push(new path([new THREE.Vector3(0.60, 5.0, this.footHeight), new THREE.Vector3(0.60, -2.0, this.footHeight)], [[3,1],[4,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(0.66, -5.0, this.footHeight), new THREE.Vector3(0.66, 2.0, this.footHeight)], [[3,2],[4,2]]));
        this.footPathArr.push(new path([new THREE.Vector3(5.0, -0.74, this.footHeight), new THREE.Vector3(-2.0, -0.74, this.footHeight)], [[5,1],[6,1]]));
        this.footPathArr.push(new path([new THREE.Vector3(-5.0, -0.80, this.footHeight), new THREE.Vector3(2.0, -0.80, this.footHeight)], [[5,2],[6,2]]));
        this.footPathArr.push(new path([new THREE.Vector3(-0.60, -5.0, this.footHeight), new THREE.Vector3(-0.60, 2.0, this.footHeight)], [[7,1],[8,1]]));
		this.footPathArr.push(new path([new THREE.Vector3(-0.66, 5.0, this.footHeight), new THREE.Vector3(-0.66, -2.0, this.footHeight)], [[7,2],[8,2]]));
		
		this.vesselPathArr.push(new path([new THREE.Vector3(9.2, 3.0, this.vesselHeight), new THREE.Vector3(9.2, -3.0, this.vesselHeight)], [[2,1]]));
		this.vesselPathArr.push(new path([new THREE.Vector3(9.4, -3.0, this.vesselHeight), new THREE.Vector3(9.4, 3.0, this.vesselHeight)], [[1,1]]));
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
	
	public getRandomVesselPath(){
        let pathNumber = Math.floor(Math.random() * this.vesselPathArr.length);
        return this.vesselPathArr[pathNumber];
    }
}
