import * as THREE from 'three';
import { TrafficLight } from '../trafficLight/traffic-light';

export class Car {
    private _mesh : any;
    private _car1Path = [[0.9, 0.0],[-0.9, 0.0]];
    private _car2Path = [[0.0, -0.5],[0.0, 0.5]];
    private _paths = [this._car1Path,this._car2Path];
    private _path : number[][];
    private _speed = 0.004;
    private _currentPoint : number[];
    private _nextPoint : number[];
    private _pathNumber : number;
    private _reachedEnd : boolean;

    constructor(Name : Number){
        this._pathNumber = Math.floor(Math.random() * this._paths.length);
        this._path = this._paths[this._pathNumber]
        this._currentPoint = this._path[0];
        this._nextPoint = this._path[1];
        let geometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
        let material = new THREE.MeshBasicMaterial({ color: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.name = Name;
        this._mesh.position.set(this._path[0][0], this._path[0][1], 0.001);
        if(this._path[0][1] != this._path[1][1]){
            this._mesh.rotateZ(1.58);
        }
    }

    public move(trafficLightArr : TrafficLight[], carArr: Car[]){
        if(this._currentPoint[0] > this._nextPoint[0] && this._currentPoint[1] == this._nextPoint[1]){
            let move = true;
            if(!(((this._mesh.position.x - trafficLightArr[this._pathNumber].getMesh.position.x) < 0.1 || (this._mesh.position.x - trafficLightArr[this._pathNumber].getMesh.position.x) > 0.12) || trafficLightArr[this._pathNumber].getMode == 2)){
                move = false;
            }
            carArr.forEach(car => {
                if(move && (this._mesh.position.x - car.getMesh.position.x) < 0.12 && (this._mesh.position.x - car.getMesh.position.x) > 0.07 && this._mesh.position.y == car.getMesh.position.y){
                    move = false;
                }
            });
            if(move){
                this._mesh.translateX(-this._speed);
            }
        }
        else if(this._currentPoint[1] < this._nextPoint[1] && this._currentPoint[0] == this._nextPoint[0]){
            let move = true;
            if(!(((this._mesh.position.y - trafficLightArr[this._pathNumber].getMesh.position.y) > -0.1 || (this._mesh.position.y - trafficLightArr[this._pathNumber].getMesh.position.y) < -0.12) || trafficLightArr[this._pathNumber].getMode == 2)){
                move = false;
            }
            carArr.forEach(car => {
                if(move && (this._mesh.position.y - car.getMesh.position.y) > -0.12 && (this._mesh.position.y - car.getMesh.position.y) < -0.07 && Math.abs(this._mesh.position.x - car.getMesh.position.x) < 0.01){
                    move = false;
                }
            });
            if(move){
                this._mesh.translateX(this._speed);
            }
        }

        if(Math.abs(this._mesh.position.x - this._path[this._path.length - 1][0]) < 0.02 && Math.abs(this._mesh.position.y - this._path[this._path.length - 1][1]) < 0.02){
            this._reachedEnd = true;
        }
    }

    public get getMesh(){
        return this._mesh;
    }

    public get getPath(){
        return this._path;
    }

    public get getReachedEnd(){
        return this._reachedEnd;
    }
}
