import { Paho } from 'ng2-mqtt/mqttws31';

export class Mqtt {
    private _client: Paho.MQTT.Client;
    private _connected: boolean;
    private _subscribeOptions: any;
    private _message = null;

    constructor(private _clientId: string, private _groupId: string) {
        this._client = new Paho.MQTT.Client("wss://broker.0f.nl:8084/", this._clientId);
        //this._message = null;
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

    public setMessage(value) {
        this._message = value;
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
        this.sendMessage('1');
        this._connected = true;
    }

    public sendMessage(value: string) {
        if(this._connected == true){
        let message = new Paho.MQTT.Message(value);
        message.destinationName = this._groupId;
        this._client.send(message);
        }
    }

    public onMessageArrived() {
        this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
            console.log('Message arrived : ' + message.payloadString);
            this._message = message.payloadString;
        };
    }

    public onConnectionLost() {
        this._client.onConnectionLost = (responseObject: Object) => {
            console.log('Connection lost : ' + JSON.stringify(responseObject));
        };
    }
}