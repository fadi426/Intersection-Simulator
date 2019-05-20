import * as THREE from 'three';
export class Sensor {
    private _mesh : any;
    private _sensorValue = 0;
    private _sensorGroup : number;

    constructor(private _x : number, private _y : number, private _z : number, private _id : number, private _group : number, private _type : String){
        let geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);
        let material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
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

    public get getType(){
        return this._type;
    }

    public set setSensorValue(value){
        this._sensorValue = value;
	}
	
	public checkTriggered(carArr, cycleArr, footArr, vesselArr, mqtt, groupId){
		let triggered = false;
			carArr.forEach(car => {
				if ((Math.abs(car.getMesh.position.x - this.getMesh.position.x) < 0.07) && (Math.abs(car.getMesh.position.y - this.getMesh.position.y) < 0.07) && this.getType == "motor_vehicle") {
					triggered = true;
				}
			});
			cycleArr.forEach(cycle => {
				if ((Math.abs(cycle.getMesh.position.x - this.getMesh.position.x) < 0.05) && (Math.abs(cycle.getMesh.position.y - this.getMesh.position.y) < 0.05) && this.getType == "cycle") {
					triggered = true;
				}
			});
			footArr.forEach(foot => {
				if ((Math.abs(foot.getMesh.position.x - this.getMesh.position.x) < 0.05) && (Math.abs(foot.getMesh.position.y - this.getMesh.position.y) < 0.05) && this.getType == "foot") {
					triggered = true;
				}
			});
			vesselArr.forEach(vessel => {
				if ((Math.abs(vessel.getMesh.position.x - this.getMesh.position.x) < 0.05) && (Math.abs(vessel.getMesh.position.y - this.getMesh.position.y) < 0.05) && this.getType == "vessel") {
					triggered = true;
				}
			});
			if (triggered && this.getSensorValue == 0) {
				mqtt.sendMessage("1", groupId + "/" + this.getType + "/" + this.getSensorGroup + "/sensor/" + this.getId);
				this.setSensorValue = 1;
			}
			if (!triggered && this.getSensorValue == 1) {
				mqtt.sendMessage("0", groupId + "/" + this.getType + "/" + this.getSensorGroup + "/sensor/" + this.getId);
				this.setSensorValue = 0;
			}
	}
}
