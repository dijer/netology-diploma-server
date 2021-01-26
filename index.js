const { Message } = require('./models');
const { PORT } = require('./settings');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');

const logFile = 'file.log';
const filepath = path.join(__dirname, logFile);

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

io.on('connection', socket => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    socket.on('message', msg => {
        const { username, message, date } = msg;
        const userMessage = new Message({ username, message, date });
        if (!userMessage.errors.length) {
            const messageString = userMessage.output;
            io.emit('message', messageString);
            fs.appendFile(filepath, `${messageString}\n`, (err) => {
                if (err) throw new Error(err);
            })
        } else {
            socket.emit('message', userMessage.errors.join('\n'));
        }
    })

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});