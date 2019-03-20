import * as THREE from 'three';
export class Road {
    private _mesh : any;

    constructor(private _x : number, private _y : number, private _z : number, private _color :  any){
        let geometry = new THREE.BoxGeometry(this._x, this._y, this._z);
        let material = new THREE.MeshBasicMaterial({ color: 0x808080 });
        this._mesh = new THREE.Mesh(geometry, material);
    }

    public get getMesh(){
        return this._mesh;
    }
}
