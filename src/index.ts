import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";
import MeasureService from "./Measure/Service";

const app = express();
const serverPort = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// Start the server
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

const { createMeasure } = MeasureService();
const host = "broker.emqx.io";
const mqttPort = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${mqttPort}`;
const mqtt = require("mqtt");
const client = mqtt?.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});

const topic = "userGlucose";

client?.on("connect", () => {
  console.log("Connected");

  client?.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});

client?.on("message", async (topic, payload) => {
  try {
    console.log("creating measure");
    const result = await createMeasure(JSON.parse(payload.toString()));
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});
