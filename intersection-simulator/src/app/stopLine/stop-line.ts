import * as THREE from 'three';
export class StopLine {
    private _mesh : any;

    constructor(private _x : number, private _y : number, private _z : number){
        let geometry = new THREE.BoxGeometry(0.015, 0.1, 0.02);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.position.set(this._x, this._y, this._z);
    }

    public get getMesh(){
        return this._mesh;
    }
}
