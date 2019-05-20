import * as THREE from 'three';
export class Road {
    private _mesh : any;

    constructor(private _x : number, private _y : number, private _z : number, private _color :  any, private _positionX: number, private _positionY: number, private _positionZ: number){
		let geometry = new THREE.BoxGeometry(this._x, this._y, this._z);
		geometry.translate(0, 0, -_z / 2);
        let material = new THREE.MeshLambertMaterial({ color: this._color });
		this._mesh = new THREE.Mesh(geometry, material);
		this._mesh.receiveShadow = true;
		this._mesh.position.set(this._positionX, this._positionY, this._positionZ);
    }

    public get getMesh(){
        return this._mesh;
    }
}
