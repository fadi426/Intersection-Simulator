export class BridgeWaterSensor {
	private sensorValue = 0;
	private left = 8.8;
	private right = 9.8;
	private top = 0.33;
	private bottom = -0.87;

	checkSensor(groupId, mqtt, vesselArr){
		let triggered = false;
		vesselArr.forEach(vessel => {
			if(vessel._mesh.position.x > this.left && vessel._mesh.position.x < this.right && vessel._mesh.position.y > this.bottom && vessel._mesh.position.y < this.top){
				triggered = true;
			}
		});
		if (triggered && this.sensorValue == 0) {
			mqtt.sendMessage("1", groupId + "/vessel/3/sensor/1");
			this.sensorValue = 1;
		}
		if (!triggered && this.sensorValue == 1) {
			mqtt.sendMessage("0", groupId + "/vessel/3/sensor/1");
			this.sensorValue = 0;
		}
	}
}