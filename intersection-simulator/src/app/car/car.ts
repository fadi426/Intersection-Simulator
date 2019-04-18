import * as THREE from 'three';
import { TrafficLight } from '../trafficLight/traffic-light';
import { Vector3 } from 'three';

export class Car {
    private _mesh : any;
    private _car1Path = [new THREE.Vector3(-0.35, 5.0, 0.001), new THREE.Vector3(-0.35, 0.35, 0.001), new THREE.Vector3(-2, 0.35, 0.001)];
    private _car2Path = [new THREE.Vector3(-0.21, 5.0, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)];
    private _car3Path = [new THREE.Vector3(-0.07, 5.0, 0.001), new THREE.Vector3(-0.07, -0.35, 0.001), new THREE.Vector3(2.0, -0.35, 0.001)];
    private _car4Path = [new THREE.Vector3(5.0, 0.35, 0.001), new THREE.Vector3(0.35, 0.35, 0.001), new THREE.Vector3(0.35, 2.0, 0.001)];
    private _car5Path = [new THREE.Vector3(5.0, 0.21, 0.001), new THREE.Vector3(0.35, 0.21, 0.001), new THREE.Vector3(-0.49, 0.35, 0.001), new THREE.Vector3(-2.0, 0.35, 0.001)];
    private _car6Path = [new THREE.Vector3(5.0, 0.07, 0.001), new THREE.Vector3(0.35, 0.07, 0.001), new THREE.Vector3(-0.49, 0.21, 0.001), new THREE.Vector3(-2.0, 0.21, 0.001)];
    private _car7Path = [new THREE.Vector3(5.0, -0.07, 0.001), new THREE.Vector3(-0.21, -0.07, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)];
    private _car8Path = [new THREE.Vector3(0.35, -5.0, 0.001), new THREE.Vector3(0.35, -0.49, 0.001), new THREE.Vector3(2.0, -0.49, 0.001)];
    private _car9Path = [new THREE.Vector3(0.21, -5.0, 0.001), new THREE.Vector3(0.21, -0.35, 0.001), new THREE.Vector3(2.0, -0.35, 0.001)];
    private _car10Path = [new THREE.Vector3(0.07, -5.0, 0.001), new THREE.Vector3(0.07, -0.49, 0.001), new THREE.Vector3(0.35, 0.35, 0.001), new THREE.Vector3(0.35, 2.0, 0.001)];
    private _car11Path = [new THREE.Vector3(-5.0, -0.49, 0.001), new THREE.Vector3(-0.21, -0.49, 0.001), new THREE.Vector3(-0.21, -2.0, 0.001)];
    private _car12Path = [new THREE.Vector3(-5.0, -0.35, 0.001), new THREE.Vector3(-0.35, -0.35, 0.001), new THREE.Vector3(0.35, -0.49, 0.001), new THREE.Vector3(2.0, -0.49, 0.001)];
    private _car13Path = [new THREE.Vector3(-5.0, -0.21, 0.001), new THREE.Vector3(-0.35, -0.21, 0.001), new THREE.Vector3(0.35, -0.35, 0.001), new THREE.Vector3(2.0, -0.35, 0.001)];
    private _car14Path = [new THREE.Vector3(-5.0, -0.07, 0.001), new THREE.Vector3(0.35, -0.07, 0.001), new THREE.Vector3(0.35, 2.0, 0.001)];
    private _paths = [this._car1Path,this._car2Path,this._car3Path,this._car4Path,this._car5Path,this._car6Path,this._car7Path,this._car8Path,this._car9Path,this._car10Path,this._car11Path,this._car12Path,this._car13Path,this._car14Path];
    private _pathLights = [[[1,1]],[[2,1]],[[3,1]],[[4,1]],[[5,1]],[[5,2]],[[6,1]],[[7,1]],[[7,2]],[[8,1]],[[9,1]],[[10,1]],[[10,2]],[[11,1]]];
    private _path : Vector3[];
    private _pathLight : any;
    private _speed = 0;
    private _maxSpeed = 0.008;
    private _respawnDistance = 0.02;
    private _currentPoint : Vector3;
    private _nextPoint : Vector3;
    private _pathNumber : number;
    private _reachedEnd : boolean;
    private _currentPosition : Vector3;
    private _currentNode = 1;

    constructor(Name : Number){
        this._pathNumber = Math.floor(Math.random() * this._paths.length);
        this._path = this._paths[this._pathNumber]
        this._pathLight = this._pathLights[this._pathNumber];
        this._currentPoint = this._path[0];
        this._nextPoint = this._path[1];
        let geometry = new THREE.BoxGeometry(0.1, 0.05, 0.05);
        let material = new THREE.MeshBasicMaterial({ color: '#'+(Math.random()*0xFFFFFF<<0).toString(16) });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.name = Name;
        this._mesh.position.set(this._path[0].x, this._path[0].y, this._path[0].z);
        this._currentPosition = this._path[0];
        if(this._path[0].y != this._path[1].y){
            this._mesh.rotateZ(1.58);
        }
    }

    public move(trafficLightArr : TrafficLight[], carArr: Car[]){
        if(this._mesh.position.distanceTo(this._path[this._path.length - 1]) < this._respawnDistance){
            this._reachedEnd = true;
        }

        if(this._mesh.position.distanceTo(this._path[this._currentNode]) < this._respawnDistance && this._currentNode < this._path.length - 1){
            this._currentNode++;
            this._currentPoint.copy(this._paths[this._pathNumber][this._currentNode - 1]);
            this._nextPoint.copy(this._paths[this._pathNumber][this._currentNode]);
        }

        let carFront = new THREE.Vector3().copy(this._mesh.position);
        let distanceCar = this._nextPoint.distanceTo(this._mesh.position);
        let frontDistance = 0.09 / distanceCar;
        let nextPointCar = new THREE.Vector3().copy(this._nextPoint)
        let directionCar = nextPointCar.sub(this._currentPoint);
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
            if(!(distanceToLight > 0.02 || trafficLight.getMode == 2)){
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
                this._speed -= 0.0010;
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
        this._currentPosition.x += direction.x * speed;
        this._currentPosition.y += direction.y * speed;
        this._mesh.position.set(this._currentPosition.x, this._currentPosition.y, this._currentPosition.z);
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
