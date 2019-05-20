import { Vector3 } from 'three';
export class path {

    private _path : Vector3[];
    private _pathLight : number[][];

    constructor(path: Vector3[], pathLight: number[][]){
        this._path = path;
        this._pathLight = pathLight;
	}
	
    get getPath(){
        return this._path;
    }

    get getPathLight(){
        return this._pathLight;
    }
}
