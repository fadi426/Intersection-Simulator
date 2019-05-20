import { Paho } from 'ng2-mqtt/mqttws31';

export class Mqtt {
    private _client: Paho.MQTT.Client;
    private _connected: boolean;
    private _message = [];

    constructor(private _clientId: string, private _groupId: string) {
        this._client = new Paho.MQTT.Client("wss://broker.0f.nl:8084/", this._clientId);
        this.onConnectionLost();
        this.onMessageArrived();
        this.connect();
    }

    public get getConnected() {
        return this._connected;
    }

    public get getMessage() {
        return this._message;
    }

    public connect() {
        this._client.connect({ onSuccess: this.onConnect.bind(this) });
    }

    public onConnect() {
        console.log("Connected");
        var subscribeOptions = {
            qos: 0,  // QoS
            invocationContext: { foo: true },  // Passed to success / failure callback
        };
        this._client.subscribe(this._groupId, subscribeOptions);
        this._connected = true;
    }

    public sendMessage(msg : string, des: string) {
        let message = new Paho.MQTT.Message(msg);
        message.destinationName = des;
        this._client.send(message);
    }

    public onMessageArrived() {
        this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
            if(message.destinationName.includes("light") || message.destinationName.includes("deck")){
				this._message.push(message);
				if(message.payloadString == "0"){
					console.log("%c" + message.destinationName + " " + message.payloadString, 'color: #ff0000');
				}
				if(message.payloadString == "1"){
					console.log("%c" + message.destinationName + " " + message.payloadString, 'color: #ffa500');
				}
				if(message.payloadString == "2"){
					console.log("%c" + message.destinationName + " " + message.payloadString, 'color: #00ff00');
				}
            }
        };
    }

    public onConnectionLost() {
        this._client.onConnectionLost = (responseObject: Object) => {
            console.log('Connection lost : ' + JSON.stringify(responseObject));
        };
    }
}