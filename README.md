# Diploma Server

## Installation
`npm i`

## Start Server
`npm run start`

## Send Message format to Server
```
    socket.emit('message', {
        username: string,
        message: string,
        date: Date,
    });
```

## Recieve Message format
```
    YYYY-MM-DD HH:mm:ss username: message
```