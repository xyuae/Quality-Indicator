var http = require('http');
var sio = require('socket.io');
var chatroom = require('./chatroom');

var server = http.createServer();
var io = sio.listen(serer, {
    log: true;
});

chatroom.init(io);
var port = 9000;
server.listen(9000, function startapp(){
    console.log('Nodejs app listening on ' + port);
})

var django_request = require('./django_request');

django_request.get('/do/get_data/', function(data){
    console.log('get_data response: %j', data);
    }, function(err) {
    console.log('error get_data: ' + err);
});

function onGetData(request, response) {
    if (request.method=='Get') {
        response.writeHead(200, {"Content-Type": "application/json"});
        jsonobj = {
            'data1': 123,
            'data2': 'abc'
        }
        response.end(JSON.stringify(jsonobj));
    } else {
        response.writeHead(403);
        response.end();
    }
}

function onPostData(request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function(data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function() {
            var post = qs.parse(body);
            response.writeHead(200, {'Content-Type': 'application/json'});
            jsonobj = {
                'data1': 123,
                'data2': 'abc',
                'post_data': post,
            }
            response.end(JSON.stringify(jsonobj));
        });
    } else {
        response.writeHead(403);
        response.end();
    }
}
