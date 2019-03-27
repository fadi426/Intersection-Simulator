import * as THREE from 'three';
export class Sensor {
    private _mesh : any;
    private _sensorValue = 0;
    private _sensorGroup : number;

    constructor(private _x : number, private _y : number, private _z : number, private _id : number, private _group : number){
        let geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
        let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.set(this._x, this._y, this._z);
        this._sensorGroup = this._group;
    }

    public get getMesh(){
        return this._mesh;
    }

    public get getSensorValue(){
        return this._sensorValue;
    }

    public get getId(){
        return this._id;
    }

    public get getSensorGroup(){
        return this._sensorGroup;
    }

    public set setSensorValue(value){
        this._sensorValue = value;
    }
}
