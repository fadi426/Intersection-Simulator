import * as THREE from 'three';

export class Ground {
    private _mesh : any;

    constructor(private _x : number, private _y : number, private _color :  any){
        let geometry = new THREE.PlaneGeometry(this._x, this._y);
        let material = new THREE.MeshBasicMaterial({ color: 0x006400 });
        this._mesh = new THREE.Mesh(geometry, material);
    }

    public get getMesh(){
        return this._mesh;
    }
}
