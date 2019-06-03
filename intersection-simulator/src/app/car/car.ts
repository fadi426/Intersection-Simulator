import * as THREE from 'three';
import { TrafficLight } from '../trafficLight/traffic-light';
import { path } from '../path/path';
import { Vector3 } from 'three';

export class Car {
    private _mesh : any;
    private _path : Vector3[];
    private _pathLight : any;
    private _speed = 0;
    private _maxSpeed = 0.008;
    private _respawnDistance = 0.02;
    private _currentPoint : Vector3;
    private _nextPoint : Vector3;
    private _reachedEnd : boolean;
    private _calculatedNextPosition : Vector3;
    private _currentNode = 1;

    constructor(Name : Number, path : path){
        this._path = path.getPath;
        this._pathLight = path.getPathLight;
        this._currentPoint = new THREE.Vector3().copy(this._path[0]);
        this._nextPoint = new THREE.Vector3().copy(this._path[1]);
        let geometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
        let material = new THREE.MeshLambertMaterial({ color: 0x800080 }); //'#'+(Math.random()*0xFFFFFF<<0).toString(16) });
        this._mesh = new THREE.Mesh(geometry, material);
		this._mesh.name = Name;
		//this._mesh.castShadow = true;
        this._mesh.position.set(this._path[0].x, this._path[0].y, this._path[0].z);
        this._calculatedNextPosition = new THREE.Vector3().copy(this._path[0]);
        if(this._path[0].y != this._path[1].y){
            this._mesh.rotateZ(1.58);
        }
    }

    public move(trafficLightArr : TrafficLight[], carArr: Car[], scene, footArr, i){
        if(this._mesh.position.distanceTo(this._path[this._path.length - 1]) < this._respawnDistance){
            this._reachedEnd = true;
        }

        if(this._mesh.position.distanceTo(this._path[this._currentNode]) < this._respawnDistance && this._currentNode < this._path.length - 1){
            this._currentNode++;
            this._currentPoint.copy(this._path[this._currentNode - 1]);
            this._nextPoint.copy(this._path[this._currentNode]);
        }

        let carFront = new THREE.Vector3().copy(this._mesh.position);
        let distanceCar = this._nextPoint.distanceTo(this._mesh.position);
        let frontDistance = 0.09 / distanceCar;
        let nextPointCar = new THREE.Vector3().copy(this._nextPoint)
        let directionCar = nextPointCar.sub(this._mesh.position);
        carFront.x += directionCar.x * frontDistance;
        carFront.y += directionCar.y * frontDistance;

        let move = true;

        for(let i = 0; i < this._pathLight.length; i++){
            let trafficLight;
            trafficLightArr.forEach(light => {
                if(light.getGroupId == this._pathLight[i][0] && light.getId == this._pathLight[i][1] && light.getGroup == "motor_vehicle"){
                    trafficLight = light;
                }
            });
            let distanceToLight = carFront.distanceTo(trafficLight.getMesh.position);
            if(!(distanceToLight > 0.023 || trafficLight.getMode == 2)){
                move = false;
            }
        }
        
        carArr.forEach(car => {
            let carDistance = carFront.distanceTo(car._mesh.position);
            if(carDistance < 0.06){
                move = false;
            }
        });

        if(move){
            if(this._speed > this._maxSpeed){
                this._speed = this._maxSpeed;
            }
            else{
                this._speed += 0.00012;
            }
        }
        else{
            if(this._speed < 0.0001){
                this._speed = 0;
            }
            else{
                this._speed -= 0.003;
            }
        }

        let differncePoints = new THREE.Vector3().copy(this._nextPoint);
        differncePoints.sub(this._currentPoint);
        let rotation = Math.atan(differncePoints.y / differncePoints.x);
        this._mesh.rotation.z = rotation;

        let distance = this._nextPoint.distanceTo(this._currentPoint);
        let speed = this._speed / distance;
        let nextPoint = new THREE.Vector3().copy(this._nextPoint)
        let direction = nextPoint.sub(this._currentPoint);
        this._calculatedNextPosition.x += direction.x * speed;
        this._calculatedNextPosition.y += direction.y * speed;
		this._mesh.position.set(this._calculatedNextPosition.x, this._calculatedNextPosition.y, this._calculatedNextPosition.z);

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
