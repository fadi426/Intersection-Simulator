import { Car } from '../car/car';
import { Cycle } from '../cycle/cycle';
import { Foot } from '../foot/foot';
import { Vessel } from '../vessel/vessel';
import { Paths } from '../paths/paths';

export class TrafficUserCreater {
	private carCreatorCounter = 0;
	private cycleCreatorCounter = 0;
	private footCreatorCounter = 0;
	private vesselCreatorCounter = 0;
	private paths = new Paths;
	private names = 1;

	createTrafficUsers(carArr, cycleArr, footArr, vesselArr, scene) {
		this.carCreatorCounter += 0.01
		if (this.carCreatorCounter > 0.3 && carArr.length < 150) {
			let car = new Car(this.names++, this.paths.getRandomCarPath());
			carArr.push(car);
			scene.add(car.getMesh);
			this.carCreatorCounter = 0;
		}

		this.cycleCreatorCounter += 0.01
		if (this.cycleCreatorCounter > 10 && cycleArr.length < 500) {
			let cycle = new Cycle(this.names++, this.paths.getRandomCyclePath());
			cycleArr.push(cycle);
			scene.add(cycle.getMesh);
			this.cycleCreatorCounter = 0;
		}

		this.footCreatorCounter += 0.01
		if (this.footCreatorCounter > 5 && footArr.length < 500) {
			let foot = new Foot(this.names++, this.paths.getRandomFootPath());
			footArr.push(foot);
			scene.add(foot.getMesh);
			this.footCreatorCounter = 0;
		}

		this.vesselCreatorCounter += 0.01
		if (this.vesselCreatorCounter > 15 && vesselArr.length < 500) {
			let vessel = new Vessel(this.names++, this.paths.getRandomVesselPath());
			vesselArr.push(vessel);
			scene.add(vessel.getMesh);
			this.vesselCreatorCounter = 0;
		}
	}
}