export class BridgeRoadSensor {
	private sensorValue = 0;
	private left = 8.63;
	private right = 9.97;
	private top = 0.33;
	private bottom = -0.87;

	checkSensor(groupId, mqtt, carArr, cycleArr, footArr){
		let triggered = false;
		carArr.forEach(car => {
			if(car._mesh.position.x > this.left && car._mesh.position.x < this.right && car._mesh.position.y > this.bottom && car._mesh.position.y < this.top){
				triggered = true;
			}
		});
		cycleArr.forEach(cycle => {
			if(cycle._mesh.position.x > this.left && cycle._mesh.position.x < this.right && cycle._mesh.position.y > this.bottom && cycle._mesh.position.y < this.top){
				triggered = true;
			}
		});
		footArr.forEach(foot => {
			if(foot._mesh.position.x > this.left && foot._mesh.position.x < this.right && foot._mesh.position.y > this.bottom && foot._mesh.position.y < this.top){
				triggered = true;
			}
		});
		if (triggered && this.sensorValue == 0) {
			mqtt.sendMessage("1", groupId + "/bridge/1/sensor/1");
			this.sensorValue = 1;
		}
		if (!triggered && this.sensorValue == 1) {
			mqtt.sendMessage("0", groupId + "/bridge/1/sensor/1");
			this.sensorValue = 0;
		}
	}
}