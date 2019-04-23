import * as THREE from 'three';
import { TrafficLight } from '../trafficLight/traffic-light';
import { Vector3 } from 'three';

export class Foot {
    private _mesh : any;
    private _foot1Path = [new THREE.Vector3(-5.0, 0.60, 0.001), new THREE.Vector3(2.0, 0.60, 0.001)];
    private _foot2Path = [new THREE.Vector3(5.0, 0.66, 0.001), new THREE.Vector3(-2.0, 0.66, 0.001)];
    private _foot3Path = [new THREE.Vector3(0.60, 5.0, 0.001), new THREE.Vector3(0.60, -2.0, 0.001)];
    private _foot4Path = [new THREE.Vector3(0.66, -5.0, 0.001), new THREE.Vector3(0.66, 2.0, 0.001)];
    private _foot5Path = [new THREE.Vector3(5.0, -0.74, 0.001), new THREE.Vector3(-2.0, -0.74, 0.001)];
    private _foot6Path = [new THREE.Vector3(-5.0, -0.80, 0.001), new THREE.Vector3(2.0, -0.80, 0.001)];
    private _foot7Path = [new THREE.Vector3(-0.60, -5.0, 0.001), new THREE.Vector3(-0.60, 2.0, 0.001)];
    private _foot8Path = [new THREE.Vector3(-0.66, 5.0, 0.001), new THREE.Vector3(-0.66, -2.0, 0.001)];
    private _paths = [this._foot1Path, this._foot2Path, this._foot3Path, this._foot4Path, this._foot5Path, this._foot6Path, this._foot7Path, this._foot8Path];
    private _pathLights = [[[1,1],[2,1]],[[1,2],[2,2]],[[3,1],[4,1]],[[3,2],[4,2]],[[5,1],[6,1]],[[5,2],[6,2]],[[7,1],[8,1]],[[7,2],[8,2]]];
    private _pathLight : any;
    private _path : Vector3[];
    private _speed = 0;
    private _maxSpeed = 0.002;
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
        let geometry = new THREE.BoxGeometry(0.015, 0.015, 0.05);
        let material = new THREE.MeshBasicMaterial({ color: 0xc7ea46 }); //'#'+(Math.random()*0xFFFFFF<<0).toString(16) });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.name = Name;
        this._mesh.position.set(this._path[0].x, this._path[0].y, this._path[0].z);
        this._currentPosition = this._path[0];
        if(this._path[0].y != this._path[1].y){
            this._mesh.rotateZ(1.58);
        }
    }

    public move(trafficLightArr : TrafficLight[], footArr: Foot[]){
        if(this._mesh.position.distanceTo(this._path[this._path.length - 1]) < this._respawnDistance){
            this._reachedEnd = true;
        }

        if(this._mesh.position.distanceTo(this._path[this._currentNode]) < this._respawnDistance && this._currentNode < this._path.length - 1){
            this._currentNode++;
            this._currentPoint.copy(this._paths[this._pathNumber][this._currentNode - 1]);
            this._nextPoint.copy(this._paths[this._pathNumber][this._currentNode]);
        }

        let footFront = new THREE.Vector3().copy(this._mesh.position);
        let distanceFoot = this._nextPoint.distanceTo(this._mesh.position);
        let frontDistance = 0.04 / distanceFoot;
        let nextPointFoot = new THREE.Vector3().copy(this._nextPoint)
        let directionFoot = nextPointFoot.sub(this._currentPoint);
        footFront.x += directionFoot.x * frontDistance;
        footFront.y += directionFoot.y * frontDistance;

        let move = true;
        
        for(let i = 0; i < this._pathLight.length; i++){
            let trafficLight;
            trafficLightArr.forEach(light => {
                if(light.getGroupId == this._pathLight[i][0] && light.getId == this._pathLight[i][1] && light.getGroup == "foot"){
                    trafficLight = light;
                }
            });
            let distanceToLight = footFront.distanceTo(trafficLight.getMesh.position);
            if(!(distanceToLight > 0.0303 || trafficLight.getMode == 2)){
                move = false;
            }
        }
        
        footArr.forEach(foot => {
            let footDistance = footFront.distanceTo(foot._mesh.position);
            if(footDistance < 0.01){
                move = false;
            }
        });

        if(move){
            if(this._speed > this._maxSpeed){
                this._speed = this._maxSpeed;
            }
            else{
                this._speed += 0.002;
            }
        }
        else{
            if(this._speed < 0.0001){
                this._speed = 0;
            }
            else{
                this._speed -= 0.002;
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
