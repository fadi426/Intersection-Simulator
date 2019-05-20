import { TrafficLight } from '../trafficLight/traffic-light';

export class InitTrafficLights {
	private trafficLightArr = [];

	constructor() {
		this.trafficLightArr.push(new TrafficLight(-0.35, 0.70, 0, 1, 1, "motor_vehicle", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(-0.21, 0.70, 0, 1, 2, "motor_vehicle", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(-0.07, 0.70, 0, 1, 3, "motor_vehicle", 1.58, 0));

		this.trafficLightArr.push(new TrafficLight(0.70, 0.35, 0, 1, 4, "motor_vehicle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.70, 0.21, 0, 1, 5, "motor_vehicle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.70, 0.07, 0, 2, 5, "motor_vehicle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.70, -0.07, 0, 1, 6, "motor_vehicle", 0, 0));

		this.trafficLightArr.push(new TrafficLight(0.35, -0.98, 0, 1, 7, "motor_vehicle", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(0.21, -0.98, 0, 2, 7, "motor_vehicle", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(0.07, -0.98, 0, 1, 8, "motor_vehicle", 1.58, 0));

		this.trafficLightArr.push(new TrafficLight(-0.70, -0.49, 0, 1, 9, "motor_vehicle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(-0.70, -0.35, 0, 1, 10, "motor_vehicle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(-0.70, -0.21, 0, 2, 10, "motor_vehicle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(-0.70, -0.07, 0, 1, 11, "motor_vehicle", 0, 0));

		this.trafficLightArr.push(new TrafficLight(0.40, -0.91, 0, 1, 12, "motor_vehicle", 0, 0));

		this.trafficLightArr.push(new TrafficLight(10.0, -0.07, 0, 1, 13, "motor_vehicle", 0, 2));
		this.trafficLightArr.push(new TrafficLight(8.6, -0.49, 0, 2, 13, "motor_vehicle", 0, 2));

		this.trafficLightArr.push(new TrafficLight(0.40, 0.49, 0, 1, 1, "cycle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.49, -0.56, 0, 1, 2, "cycle", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(-0.42, -0.63, 0, 1, 3, "cycle", 0, 0));
		this.trafficLightArr.push(new TrafficLight(-0.49, 0.42, 0, 1, 4, "cycle", 1.58, 0));

		this.trafficLightArr.push(new TrafficLight(10.0, 0.07, 0, 1, 5, "cycle", 0, 2));
		this.trafficLightArr.push(new TrafficLight(8.6, -0.63, 0, 2, 5, "cycle", 0, 2));

		this.trafficLightArr.push(new TrafficLight(-0.42, 0.63, 0, 1, 1, "foot", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.14, 0.63, 0, 1, 2, "foot", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.0, 0.63, 0, 2, 1, "foot", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.40, 0.63, 0, 2, 2, "foot", 0, 0));

		this.trafficLightArr.push(new TrafficLight(0.63, 0.42, 0, 1, 3, "foot", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(0.63, -0.28, 0, 1, 4, "foot", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(0.63, -0.14, 0, 2, 3, "foot", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(0.63, -0.56, 0, 2, 4, "foot", 1.58, 0));

		this.trafficLightArr.push(new TrafficLight(0.40, -0.77, 0, 1, 5, "foot", 0, 0));
		this.trafficLightArr.push(new TrafficLight(-0.14, -0.77, 0, 1, 6, "foot", 0, 0));
		this.trafficLightArr.push(new TrafficLight(0.0, -0.77, 0, 2, 5, "foot", 0, 0));
		this.trafficLightArr.push(new TrafficLight(-0.42, -0.77, 0, 2, 6, "foot", 0, 0));

		this.trafficLightArr.push(new TrafficLight(-0.63, -0.56, 0, 1, 7, "foot", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(-0.63, 0.14, 0, 1, 8, "foot", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(-0.63, 0.0, 0, 2, 7, "foot", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(-0.63, 0.42, 0, 2, 8, "foot", 1.58, 0));

		this.trafficLightArr.push(new TrafficLight(10.0, 0.21, 0, 1, 9, "foot", 0, 2));
		this.trafficLightArr.push(new TrafficLight(8.6, -0.77, 0, 2, 9, "foot", 0, 2));

		this.trafficLightArr.push(new TrafficLight(9.4, -0.91, -0.2, 1, 1, "vessel", 1.58, 0));
		this.trafficLightArr.push(new TrafficLight(9.2, 0.35, -0.2, 1, 2, "vessel", 1.58, 0));
	}

	public getTrafficLights() {
		return this.trafficLightArr;
	}
}