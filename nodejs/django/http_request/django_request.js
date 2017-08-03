var http = require('http');
var cookie = require('cookie');

var default_protocol = 'http://';
var default_host = '127.0.0.1';
var default_port = 8000;

exports.get = function get(path, on_data_callback, on_err_callback) {
    var url = default_protocol + default_host + ':' + default_port + path;
    console.log("visited: " + url);
    var req = http.get(url, function onDjangoRequestGet(res){
        res.setEncoding('utf-8');
        res.on('data', function onDjangoRequestGetData(data){
            on_data_callback(JSON.parse(data));
        });
        res.resume();
    }).on('error', function onDjangoRequestGetError(e){
        if(on_err_callback)
            on_err_callback(e);
        else
            throw "error get " + url + ", " + e;
    });
}

exports.post = function post(user_cookie, path, values, on_data_callback, on_err_callback) {
    var cookies = cookie.parse(user_cookie);
    var values = querystring.stringify(values);
    var options = {
        hostname: default_host,
        port: default_port,
        path: path,
        method: 'POST',
        headers: {
            'Cookie': user_cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': values.length,
            'X-CSRFToken': cookies['csrftoken'],
        }
    };
    var post_req = http.request(options, function onDjangoRequestPost(res) {
        res.setEncoding('utf-8');
        res.on('data', function onDjangoRequestPostData(data) {
            on_data_callback(data);
        });
    }).on('error', function onDjangoRequestPostError(e){
        console.log(e);
        if (on_err_callback)
            on_err_callback(e);
        else
            throw "error get " + url + "," + e;
    });
    post_req.write(values);
    post_req.end();
}
