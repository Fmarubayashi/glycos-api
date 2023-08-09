const mqtt = require("mqtt");

const host = "broker.emqx.io";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});

const topic = "userGlucose";

client.on("connect", () => {
  console.log("Connected");

  const sensorData = {
    value: getRandomValue(80, 250),
    exercise: Math.random() < 0.5,
    fasting: Math.random() < 0.5,
    medication: Math.random() < 0.5,
    stress: Math.random() < 0.5,
    date: getRandomDateWithinLastWeek(),
    user: 2,
  };

  client.publish(topic, JSON.stringify(sensorData));
});

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDateWithinLastWeek() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const randomTime =
    sevenDaysAgo.getTime() +
    Math.random() * (today.getTime() - sevenDaysAgo.getTime());
  const randomDate = new Date(randomTime);

  return randomDate.toISOString();
}
