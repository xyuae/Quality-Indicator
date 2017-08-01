// Include required module: We use require to load http module, and assign an HTTP isntance to the variable http
var http = require("http");
var url = require("url");
// 接下来用http.createServer() 方法创建服务器，并使用Listen方法绑定8888端口。函数通过request, response参数来接受和响应数据。
function start(route, handle) {
    function onRequest(request, response) {
        // 发送HTTP头部
        // HTTP 状态值： 200： OK
        // 内容类型： text/plain
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + " received.");
        // 我们的应用现在可以通过请求的URL路径来区别不同请求。这是我们得以使用路由来讲请求以URL路径为基准映射到处理程序上
        // 来自/start和/upload的请求可以使用不同的代码来处理
        route(handle, pathname);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Hello World");
        // 发送响应数据 'Hello World"
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    // 终端打印如下信息：
    console.log('Server running at http://127.0.0.1:8888/');
}

exports.start = start;


