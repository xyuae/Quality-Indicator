## Understanding the node.js event loop
Source; Mixu's blog

The first basdic thesis of node.js is that I/O is expensive.

So the largest waste with current programming technologies comes from waiting fro I/O to complete.
There are several ways in which one can deal with the performance impact:
1. synchronous: you handle one request at a time, each in turn.
    - pros: simple
    - cons: any one request can hold up all the other request
2. for a new process: you start a new process to handle each request.
    - pros: easy
    - cons: does not scale well, hundreds of connections means hundreds of process. fork() is the Unix programmer's hammer.
    Every problem looks like a nail. It's usually overkill.
3. threads: start a new thread to handle each request.
- pros: easy, and kinder to the kernel than using fork, since threads usually have much less overhead
- cons: your machine may not have threads, and threaded programming can get very complicated very fast,
with worries about controlling access to shared resources

The second basis htesis is that thread-per-connection is memory-expensive: e.g. that graph everyone showns about Apache sucking
up memory compared to Nginx.

Apache is multithreaed: it spawns a thread per request(or process, it depends on the conf). You can see how that overhead eats
up memory as the number of concurrent connections increases and more threads are needed to serve multiple simultaneous clients.
Nginx and Node.js are not multithreaded, because threads and processes carry a heavy memory cost. They are single-threaded, but event-based.
This eliminates the overhead created by thousands of threads/processes by handling many connections in a single thread.

## Node.js keeps a single thread for your code
It really is a single thread running: you can't do any parallel code execution; doing a "sleep" for example will block the server for one second:
js
```
while (new Date().getTime() &lt; now + 1000) { // do noting }
```
So while that code is running, node.js will not respond to any other request from
clients, since it only has one thread for executing your code.
Or if you would have some CPU-intensive code, say, for resizing images, that would
still block all other requests.

## Everything runs in parallel except your code
There is no way of making code run in parallel within a single request. However, all I/O
is evented and asynchronous, so the following won't block the server.

Having synchronous execution is good, because it simplifies writing code (compared to threads,
where concurrency issues have a tendency to result in WTFs);

 In node.js you aren't supposed to worry about what happens in the backend: just use
 callbacks when you are doing I/O; and you are guaranteed that your code is never
 interrupted and that doing I/O will not block other requests without having to incur the
 costs of thread/process per request (e.g. memroy overhead in Apache);

 Having asynchronous I/O is good, because I/O is more expensive than most code and we should
 be doing something better than just waiting for I/O.

 An event loop is "an entity that handles and processes external events and converts
 them into callback invocations". So I/O calls are the points at which Node.js can switch from one
 request to another. An an I/O call, your code saves the callback and returns control to the node.js runtime
 environemnt. The callback will be called later when the data actually is available.

 On the backend, there are threads and processes for DB access and process execution.
 However, these are not explicitly exposed to your code, so you can't worry about them other than
 by knowing that I/O interactions e.g. with the database, or with other processes will be asynchronous
 from the perspecive of each request since the results from those threads are returned via the event loop to your code.
 Compared to the Apache model, there are a lot less threads and thread overhead, since threads aren't needed for each
 connection; just when you absolutely positively must have something else running in parallel and even then the management is handled by Node.js;

 Other than I/O calls, Node.js expects that all request return quickly; e.g. CPU-intensive work should be split off
 to another process with which you can interact as with events, or by using an abstraction like WebWorkers.
 This means that you can't parallelize your code without another thread in the background with which you interct via events.
 Basically, all objects which emit events support asynchronous evented interaction and you cn interact with blocking code in this manner e.g. using files, socket or child processes
 all of which are EventEmitters in Node.js. Multi-core can be done using this approach; see also: node-http-proxy.

 ### Internal implementation
 Internally, node.js relies on libev to provide the event loop, which is supplemented by libeio which uses
 pooled threads to provide asynchronous I/O. To learn even more, have a look at the libev documentaiton.

 So how doe we do async in Node.js?
 Tim Caswell describes the patterns in his excellent presentation:
 - First class functions. E.g. we pass around functions as data, shuffle them around and execute them when needed.
 - Function composition. Also known as having anoymous fnctions or closures that are executed after something happens in the evented I/O.



