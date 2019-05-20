import { Sensor } from '../sensor/sensor';

export class InitSensors {
	private sensorArr = [];

	constructor() {
	this.sensorArr.push(new Sensor(-0.35, 0.78, 0, 1, 1, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.35, 1.68, 0, 2, 1, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.21, 0.78, 0, 1, 2, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.21, 1.68, 0, 2, 2, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.07, 0.78, 0, 1, 3, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.07, 1.68, 0, 2, 3, "motor_vehicle"));

	this.sensorArr.push(new Sensor(0.78, 0.35, 0, 1, 4, "motor_vehicle"));
	this.sensorArr.push(new Sensor(1.58, 0.35, 0, 2, 4, "motor_vehicle"));
	this.sensorArr.push(new Sensor(2.38, 0.35, 0, 3, 4, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.78, 0.21, 0, 1, 5, "motor_vehicle"));
	this.sensorArr.push(new Sensor(1.58, 0.21, 0, 2, 5, "motor_vehicle"));
	this.sensorArr.push(new Sensor(2.38, 0.21, 0, 3, 5, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.78, 0.07, 0, 4, 5, "motor_vehicle"));
	this.sensorArr.push(new Sensor(1.58, 0.07, 0, 5, 5, "motor_vehicle"));
	this.sensorArr.push(new Sensor(2.38, 0.07, 0, 6, 5, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.78, -0.07, 0, 1, 6, "motor_vehicle"));
	this.sensorArr.push(new Sensor(1.58, -0.07, 0, 2, 6, "motor_vehicle"));
	this.sensorArr.push(new Sensor(2.38, -0.07, 0, 3, 6, "motor_vehicle"));

	this.sensorArr.push(new Sensor(0.35, -1.06, 0, 1, 7, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.35, -1.96, 0, 2, 7, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.21, -1.06, 0, 3, 7, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.21, -1.96, 0, 4, 7, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.07, -1.06, 0, 1, 8, "motor_vehicle"));
	this.sensorArr.push(new Sensor(0.07, -1.96, 0, 2, 8, "motor_vehicle"));

	this.sensorArr.push(new Sensor(-0.78, -0.49, 0, 1, 9, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-1.58, -0.49, 0, 2, 9, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-2.38, -0.49, 0, 3, 9, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.78, -0.35, 0, 1, 10, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-1.58, -0.35, 0, 2, 10, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-2.38, -0.35, 0, 3, 10, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.78, -0.21, 0, 4, 10, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-1.58, -0.21, 0, 5, 10, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-2.38, -0.21, 0, 6, 10, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-0.78, -0.07, 0, 1, 11, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-1.58, -0.07, 0, 2, 11, "motor_vehicle"));
	this.sensorArr.push(new Sensor(-2.38, -0.07, 0, 3, 11, "motor_vehicle"));

	this.sensorArr.push(new Sensor(0.48, -0.91, 0, 1, 12, "motor_vehicle"));

	this.sensorArr.push(new Sensor(1.8, -0.49, 0, 1, 14, "motor_vehicle"));

	this.sensorArr.push(new Sensor(0.48, 0.49, 0, 1, 1, "cycle"));
	this.sensorArr.push(new Sensor(0.49, -0.64, 0, 1, 2, "cycle"));
	this.sensorArr.push(new Sensor(-0.50, -0.63, 0, 1, 3, "cycle"));
	this.sensorArr.push(new Sensor(-0.49, 0.50, 0, 1, 4, "cycle"));

	this.sensorArr.push(new Sensor(-0.48, 0.60, 0, 1, 1, "foot"));
	this.sensorArr.push(new Sensor(0.08, 0.60, 0, 1, 2, "foot"));
	this.sensorArr.push(new Sensor(0.06, 0.66, 0, 2, 1, "foot"));
	this.sensorArr.push(new Sensor(0.46, 0.66, 0, 2, 2, "foot"));

	this.sensorArr.push(new Sensor(0.60, 0.48, 0, 1, 3, "foot"));
	this.sensorArr.push(new Sensor(0.60, -0.22, 0, 1, 1, "foot"));
	this.sensorArr.push(new Sensor(0.66, -0.20, 0, 2, 3, "foot"));
	this.sensorArr.push(new Sensor(0.66, -0.62, 0, 2, 4, "foot"));

	this.sensorArr.push(new Sensor(0.46, -0.74, 0, 1, 5, "foot"));
	this.sensorArr.push(new Sensor(-0.08, -0.74, 0, 1, 6, "foot"));
	this.sensorArr.push(new Sensor(-0.06, -0.80, 0, 2, 5, "foot"));
	this.sensorArr.push(new Sensor(-0.48, -0.80, 0, 2, 6, "foot"));

	this.sensorArr.push(new Sensor(-0.60, -0.62, 0, 1, 7, "foot"));
	this.sensorArr.push(new Sensor(-0.60, 0.08, 0, 1, 8, "foot"));
	this.sensorArr.push(new Sensor(-0.66, 0.06, 0, 2, 7, "foot"));
	this.sensorArr.push(new Sensor(-0.66, 0.48, 0, 2, 8, "foot"));

	this.sensorArr.push(new Sensor(9.4, -0.99, -0.2, 1, 1, "vessel"));
	this.sensorArr.push(new Sensor(9.2, 0.43, -0.2, 1, 2, "vessel"));
	}

	public getSensors() {
		return this.sensorArr;
	}
}