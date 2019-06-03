import { Car } from '../car/car';
import { Cycle } from '../cycle/cycle';
import { Foot } from '../foot/foot';
import { Vessel } from '../vessel/vessel';
import { Paths } from '../paths/paths';

export class TrafficUserCreater {
	private carCreatorCounter = 0.30;
	private cycleCreatorCounter = 10;
	private footCreatorCounter = 5;
	private vesselCreatorCounter = 30;
	private paths = new Paths;
	private names = 1;

	createTrafficUsers(carArr, cycleArr, footArr, vesselArr, scene) {
		this.carCreatorCounter += 0.01
		if (this.carCreatorCounter > 0.30 && carArr.length < 1000) {
			let car = new Car(this.names++, this.paths.getRandomCarPath());
			carArr.push(car);
			scene.add(car.getMesh);
			this.carCreatorCounter = 0;
		}

		this.cycleCreatorCounter += 0.01
		if (this.cycleCreatorCounter > 10 && cycleArr.length < 20) {
			let cycle = new Cycle(this.names++, this.paths.getRandomCyclePath());
			cycleArr.push(cycle);
			scene.add(cycle.getMesh);
			this.cycleCreatorCounter = 0;
		}

		this.footCreatorCounter += 0.01
		if (this.footCreatorCounter > 5 && footArr.length < 20) {
			let foot = new Foot(this.names++, this.paths.getRandomFootPath());
			footArr.push(foot);
			scene.add(foot.getMesh);
			this.footCreatorCounter = 0;
		}

		this.vesselCreatorCounter += 0.01
		if (this.vesselCreatorCounter > 30 && vesselArr.length < 5) {
			let vessel = new Vessel(this.names++, this.paths.getRandomVesselPath());
			vesselArr.push(vessel);
			scene.add(vessel.getMesh);
			this.vesselCreatorCounter = 0;
		}
	}
}