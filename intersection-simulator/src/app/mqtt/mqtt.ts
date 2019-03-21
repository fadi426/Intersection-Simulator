import { Paho } from 'ng2-mqtt/mqttws31';

export class Mqtt {
    private _client: Paho.MQTT.Client;
    private connected: any;

    constructor() {
        this._client = new Paho.MQTT.Client("wss://broker.0f.nl:8084/", "3478945836457");

        this._client.onConnectionLost = this.onConnectionLost;
        this._client.onMessageArrived = this.onMessageArrived;

        this._client.connect({ onSuccess: this.onConnect });
    }

    public onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        var subscribeOptions = {
          qos: 1,  // QoS
          invocationContext: { foo: true },  // Passed to success / failure callback
        };
      
        console.log("onConnect");
        this._client.subscribe("8/#", subscribeOptions);
        this.sendMessage("1");
        this.connected = true;
      }

    public onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    public sendMessage(messageText) {
        var message = new Paho.MQTT.Message(messageText);
        message.destinationName = "8/motor_vehicle/1/sensor/1";
        this._client.send(message);
      }

    public onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
        console.log("topic:" + message.topic);
        //setMode(Number(message.payloadString));
    }
}