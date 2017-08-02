// Include required module: We use require to load http module, and assign an HTTP isntance to the variable http
var http = require("http");
var url = require("url");
// 接下来用http.createServer() 方法创建服务器，并使用Listen方法绑定8888端口。函数通过request, response参数来接受和响应数据。
function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }
    http.createServer(onRequest).listen(3333);
    // 终端打印如下信息：
    console.log('Server running at http://127.0.0.1:3333/');
}

exports.start = start;
// 相比此前从route()函数获取返回值的做法，这次我们将response对象作为第三个参数传递给route()函数，
//并且，我们将onRequest()处理程序中所有有关response的函数调用都移除，因为我们希望这部分工作让route()函数完成。



