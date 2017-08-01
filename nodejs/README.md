## JavaScript and Node.js
You may start web development using HTML years ago. Thus JavaScript is familiar to you.
But you only understand basic operation of JavaScript -- add interface for the web page.

But you want to build complicated web site, thus you learnt a language like PHP, Ruby and Java. And you start writing "backend" code.

Node.js can be run using JavaScript at backend (without browser environment);
To run JavaScript at backend, the code must be interpreted and executed. Node.js used Google V8 virtual machine to interpret and execute JavaScript.
Node.js has many useful module, they can simplify many repetitive work such as sending string to the terminal.
Therefore Node.js is a operation environment, and also a library.

[Understanding node Js](./UnderstandingNode.md)

## Create the first application in Node.js
If we write our backend code using PHP, we need Http server such as Apache or Nginx, along with mod_php5 module and php-cgi.
When we are using Node.js, we are not only implementing an application, but also implementing the entire HTTP server.
In fact, our Web application and the corresponding Web server are basically the same.
## Structure of Node.js
1. Include require moduel: we can use require command to load the Node.js module
2. Create server: Server can be used to listen to the client request, which is similar to HTTP server such as Apache and Nginx
3. Receive and respond to request: The server is easy to create, the client can use web browser or terminal to send HTTP request

## Create Node.js application
- the first line require the http module from Node.js, and assign the vairable to http
- Then we call the http module function: createServer. This function return an object, which has a method called listen.
This method has a numerical parameter, which assign the port listened by the Http server.

## Node.js REPL
Node.js REPL(Read Eval Print Loop) represent a computer environment such as cmd in windows and Unix/Linux shell.

## An Node.js webapplicaton
 - The user can use our application through web browser
 - When the user send http://domain/start request, we can find a welcome page, with a form to upload file
 - The user can use a graph and submit the form. The file will be upload to http://domain/upload, the page finish uploading and presenting the graph on page.

## Application module analysis
The list of module that is required to implement the user case
- We need a web page, thus we need a HTTP server
- For differnt request, depending on request URL, our server will respond differently. Thus we need a router to route the request to request handler.
- When the request is received by the server and passed by the router, we need to handle the request, thus we need a terminal request handler.
- The router should handle POST data, and encapsulate the data into a more user-friendly format. We need the function to request data handling
- We need to handle the URL request and present the content. This means we need some view logic to request software application. So that content can be sent to the web browser.
- The user need to upload picture, thus we need uploading function to handle the details

To modularize our code, we need a clean main file and other module to be called.

## Pass function as parameter
```
function say(word) {
    console.log(word);
}

function execute(someFunction, value) {
    someFunction(value);
}
execute(say, "Hello");
```
In this case, we pass say function as the first parameter of the execute function.
execute can call say function by calling someFunction();
We don't have to go the long way of "define, then pass", we can define and pass the function in another function.
```
function execute(someFunction, value) {
    someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello");
```
When we use http.createServer, we not only need a listener for a portal.
We also want it to perform some operation when the server receive a HTTP request.
The problem is the process is asynchronous. The request may arrive at any moment, but our server is run in one process.
We don't worry about it when using PHP. Anytime when the request comes in, the web server(usually Apache) create a new process for the request, and execute the corresponding PHP script.
Node.js/JavaScript's event driven design can help dealing with the http reqeust.

## How does the server deal with request
When recall occurs, two parameter is inputted: reqeust and response.
They are objects, you can use their method to deal with HTTP request details. And respond to request.
Our code does this: when receiving an request, use response.writeHead() function to send a HTTP state 200 and HTTP head content-type.
Use response.write() to send plain text in the HTTP object.
At last, we call response.end() to finish the response.

## Where is the server module
Let's see what does the structure of the app looks like.
The server.js has a very basic HTTP server code. We will have a index.js to call the app's other module.

Modularizing a code snippet indicates we need to seperating the functional code into the module script.
```
// Include required module: We use require to load http module, and assign an HTTP isntance to the variable http
var http = require("http");

// 接下来用http.createServer() 方法创建服务器，并使用Listen方法绑定8888端口。函数通过request, response参数来接受和响应数据。
function start() {
    function onRequest(request, response) {
        // 发送HTTP头部
        // HTTP 状态值： 200： OK
        // 内容类型： text/plain
        console.log("Request received.")
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
```
We can use server module just like any other embedded module.
```
var server = require("./server");
server.start();
```
We can put different parts of our project into separate files, and connecting them through modules.
For different URL reqeust, the server should have different response.
For a very simple application, you can implement the response in onRequest. But to we can make our example a little bit more interesting by adding some abstract element.
Let's create a module called router to deal with different HTTP request.

## How to start "router" operation
We need to provide the router the requested URL and other necessary GET and POST parameter.
The router will execute program depending on these data.
Therefore, we need to check the HTTP request, and seperate the requested URL and GET/POST parameter.
All the data we need is included in the reqeust object. This object is passed on to the onRequest() recall function as the first parameter.
In order to parse these data, we need an extra Node.JS module. They are provided by url and querystring.
We can make use of the querystring module to parse POST parameter.
Let's give onRequest() function some logic to find the browser requested URL path:
```
// Include required module: We use require to load http module, and assign an HTTP isntance to the variable http
var http = require("http");
var url = require("url");
// 接下来用http.createServer() 方法创建服务器，并使用Listen方法绑定8888端口。函数通过request, response参数来接受和响应数据。
function start() {
    function onRequest(request, response) {
        // 发送HTTP头部
        // HTTP 状态值： 200： OK
        // 内容类型： text/plain
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + " received.");
        // 我们的应用现在可以通过请求的URL路径来区别不同请求。这是我们得以使用路由来讲请求以URL路径为基准映射到处理程序上
        // 来自/start和/upload的请求可以使用不同的代码来处理
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
```
Program the router by creating the router.js
```
function route(pathname) {
    console.log("About to route a request for " + pathname);
}

exports.route = route;
```
Before adding more logic, let's see how to integrate this router and the server.
We will ust dependence injection to add the router module in a loose dependent way.
[Inversion of Control](./martinflowler.md)

## Behavior-driven execution
Let's talk about functional programming
Pass function as parameter is not considered in terms of technology.
In terms of technical design, this is a philosophical problem. Imagine this circumstance: In the index file, we can pass router object into it.
The server can call this route function afterwards.

Recommended functional programing book: Steve Yegge: 名词王国中的死刑

## Router handles real request
At this moment, out router and HTTP server module can communicate with each other as expected.
We need to have different handling method for different URL.
Our router process will end in router module, and the router module doesn't really "take action" on the request.
Otherwise we can't expand properly when our application becomes complicated.

We will temporarily regard router target function as execution program. We don't push the development of router module because if the request program is not ready, the router module has no meaning.

The application need new component. Let's create a new module called requestHandler, for every handler, add a placeholder, and export these function as module.

In this situation, using dependency injection can make router and requestHandler more loosely coupled. Thus making our router more flexible in reuse.
这意味着我们得奖请求处理程序从服务器传递到路由中， 但感觉上这么做跟离谱了，我们的一路把这堆请求成立程序从我们的主文件传递到服务器中，在将值从服务器传递到路由。
那么我们要怎么传递这些请求处理程序呢？别看现在我们只有两个处理程序，在一个真实的引用中，请求处理程序的数量会不断增加，我们不想每次有一个新的URL或请求处理程序时，
都要为了在路由里完成请求到处理程序的映射非常反复耗时。除此之外，在路由里有一大堆if request == x then call handler y 也非常不优雅。

有一大堆东西，每个都要映射到一个字符串（URL)上？似乎关联数据(associate array)能够完美胜任。
在JavaScript里能够提供关联数组的功能的是他的对象。
在C++或C#中，当我们谈到对象，指的是类或者结构体的实例。对象根据他们实例化的模板，会拥有不同的属性和方法。在JavaScript里对象不是这个概念。
在JavaScript中，对象就是一个键/值对的集合。你可以把JavaScript的对象想象成一个键微字符串类型的字典。

我们已经确定将一系列请求处理程序通过一个对象来传递，并且需要使用松耦合的方式将这个对象注入到route()函数中。
我们先将这个对象引入到主文件Index.js中：
```
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers")

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandler.upload;

server.start(router.route, handle);
```
虽然handle并不仅仅是一个“东西”，我还是建议以一个动词作为其命名，这样做可以让我们在路由中使用中使用更加流畅的表达式。
正如所见，将不同的URL映射到相同的请求处理程序上是非常容易的：只要在对象中添加一个键值。

在完成了对象的定义后，我们把它作为额外的参数传递给服务器，为此将server.js修改。
```
function route(handle, pathname) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname]();
    } else {
        console.log("No request handler found for " + pathname);
    }
}

exports.route = route;
```
通过以上代码，我们首先检查给定的路径对应的请求处理程序是否存在。
我们可以从关联数组中获取元素一样的方式从传递的对象中获取请求处理函数。
