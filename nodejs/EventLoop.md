## Understanding the Node.js Event Loop
Source: Trevor Norrish

Node's event loop is central to being able to handle high throughput scenarios. It is a magical place filled with unicorns and rainbows, and is the reason Node can essentially be
"single threaded" while still allowing an arbitrary number of operations ot be handled in the background. This post will shed light on how the event loop operates so you
too can enjoy the magic.

## Event Driven Programming
The first thing needed in order to understand the event loop is an understanding of the event-driven programming
paradigm. This has been well understood since the 1960's. Today, event-driven programming is largely used in UI applications.
A major usage of JavaScript is to interact with the DOM, so the use of event-based APIs was natural.

Defined simply: event-driven programming is applicaiton flow control that is determined by events or changes in state.
The general implemenation is to have a central mechanism that listens for events and calls a callback function once an event has been detected (i.e. state has changed);
 That's the basic principle behind Node's event loop.

For those familiar with client-side JavaScript development, think of all the .on*() methods, such as element.onclick(), that are used in conjunction
with DOM elements to convey user interaction. This pattern works well when a single item can emit many possible events. Node uses this pattern in the form of the EventEmitter,
and is located in palces such as Server, Socket and the 'http' module. It's useful whenwe need to emit more than one type of state change from a single instance.

Another common pattern is succeed or fail. There are two common implementations around today. Firt is the "error back" callback style, where the error of the call is the first argument passed to the callback.
The second has emerged with ES6, using Promises.

The 'fs' module mostly uses the error back callback style. It would technically be possible to emit additional events
for some calls, such as fs.readFile(), but the API was made to only alert the user if the desired operation succeeded or if something failed.
This API selection was an architecture decision and not due to technical limitations.
```
function MyEmitter() {
    EventEmitter.call(this);
}

util.inherits(MyEmitter, EventEmitter);

MyEmitter.prototype.doStuff = function doStuff() {
    console.log('before')
    emitter.emit('fire')
    console.log('after')}
};

var me = new MyEmitter();
me.on('file', function() {
    console.log('emit fired');
}) ;

me.doStuff();
```
EventEmittr often apperas asynchronous because it is regularly used to signal the completion of asynchronous operations, but the EventEmitter
API is entirely synchronous. The emit function may be called asynchronously, but note that all the listener functions will be executed synchronously, in the order they were added,
befroe any execution can continue in statements following the call to emit.

## Mechanical Overview
Node itself depends on multiple libraries. One of those is libuv, the magical library that handles the queueing and processing of asynchronous
events. For the remainder of this post please keep in midn that I won't distinguish if a point made relates directly to Node or libuv.

Node utilizes as much of wha'ts already available from the opeating system's kernel as possible. Responsibilities like
 making write requests, holding connections and more are therefore delegated to and handled by the system.
 For example, incoming connections are queued by the system until they can be handled by the node.

 You may have head tha Node has a thread pool, and might be wondering "if Node pushes all those responsibilities down
 why would a thread pool be needed?" It's because the kernel doesn't support doing everything asynchronously.
 In those cases Node has to lock a thread for the duration of hte operation so ti can continue executing the event loop without blocking.

 All callbacks scheduled via process.nextTick() are run at the end of a phase of the event loop (e.g. timers) before
 transitioning to the next phase. This creates the potential to unintentional starve the event loop with recursive calls to process.nextTick();

  "Pending callbacks" is where callbacks are queued to run that aren't handled by any other phase.

 ## Event Emitter and the Event Loop
 To simplify interaction with the event loop the EventEmitter was created. It is a generic wrapper that more
