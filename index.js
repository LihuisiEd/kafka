const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'test-topic', partition: 0 }], { autoCommit: true });

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
});

consumer.on('message', (message) => {
  io.emit('message', message.value);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
