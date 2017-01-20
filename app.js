import express from 'express';
import http from 'http';
import path from 'path';
import socket from 'socket.io';
import users from './routes/users'
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set( "port", 4080 );

app.get('/', function(req, res){
    res.render(__dirname+'/views/index.pug');
});
app.use('/users', users);

app.use(express.static('public'));
app.use(express.static('views'));

io.on('connection', function (client) {
    console.log("connected");

    client.on('message', (msg)=> {
        io.emit('chat', { msg: msg })
    })

    client.on('disconnect', ()=> {
        console.log('disconnected')
    })
});


server.listen(4080, ()=> {
    console.log("listening on 4080")
});