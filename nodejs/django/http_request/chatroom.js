var cookie_reader = require('cookie');
var django_request = require('./django_request');

function initSocketEvent(socket) {
    socket.on('get', function() {
        console.log('event: get');
        django_request.get('/do/get_data/', function(res){
            console.log('get_data response: %j', res);
        }, function(err) {
            console.log('error get_data: ' +err);
        });
    });
    socket.on('post', function(data){
        console.log('event: post');
        django_request.post(socket.handshake.headers.cookie, '/do/post_data', {'data1':123, 'data2':'abc', function(res){
            console.log('post_data response: %j', res);
        }, function(err){
            console.log('err post_data: ' + e);
        });
    });
};

exports.init = function(io) {
    io.on('connection', function onSocketConnection(socket) {
        console.log('new connection');
        initSocketEvent(socket);
    });
};
