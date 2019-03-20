import * as THREE from 'three';
export class TrafficLight {
    private _mesh : any;
    private _mode : number;

    constructor(private _x : number, private _y : number, private _z : number, private _id : number){
        let geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
        let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.set(this._x, this._y, this._z);
        this._mode = 0;
    }

    public get getMesh(){
        return this._mesh;
    }

    public get getMode(){
        return this._mode;
    }

    public get getId(){
        return this._id;
    }

    public set setMode(value){
        this._mode = value;
    }
}
