import * as THREE from 'three';
export class TrafficLight {
    private _mesh : any;
    // private _mode : number;

    constructor(private _x : number, private _y : number, private _z : number, private _id : number, private groupId, private group : string, private _rotation : number, private _mode: number){
        let geometry = new THREE.BoxGeometry(0.015, 0.1, 0.02);
        let material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.set(this._x, this._y, this._z);
        // this._mode = 0;
        this._mesh.rotation.z = this._rotation;
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

    public get getGroupId(){
        return this.groupId;
    }

    public get getGroup() {
        return this.group;
    }

    public set setMode(value){
        this._mode = value;
    }

    public changeColor(){
        if (this._mode == 0) {
            this._mesh.material.color.setHex(0xff0000);
        }
        if(this._mode == 1) {
            this._mesh.material.color.setHex(0xffa500);
        }
        if(this._mode == 2) {
            this._mesh.material.color.setHex(0x00ff00);
        }
    }
}
