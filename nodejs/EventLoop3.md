## Understanding Event Loop
Most opeational systems provide some kind of an Asynchronous IO interface, which allows you to start processing data taht does not requried the
reuslt of the communication, meanwhile the communication still goes on.

This can be achieved in several ways. Nowadays it is mostly done by leveraging
the possibilities of multithreading at the cost of extra software complexity.
For example reading a file in Java or Pyhton is a blocking operation. Your program
cannot do anything else while it is waiting for the network/disk communication to finish. All you can do
- at least in java - is to fire up a different thread then notify your main thread when the operation has finished.

It is tedious, complicated, but gets the job done. But what about Node? Well, we are surely facing
some problems as Node.js - or more like V8 - is single-threaded. Our code can only run in one thread.

In a browser seting setTimeout(someFunction, 0) can sometimes fix things magically. But why does setting a
timeout to 0, deffering execution by 0 milliseconds fix anything? Isn't it the same as simply
calling someFunction immediately? Not really.

First of all, let's take a look at the call stack, or simply, "stack". I am going to make things
simple, as we only need to understand the very basics of the call stack.

## Stack
Whenever you call a functions return address, parameters and local variables will be pushed to
the stack. If you call another function from the currently running function, its contents will be pushed on top
in the same manner as the previous one - with its return address.

Even though V8 is single-threaded, the underlying C++ API of Node isn't.
It means that whenever we call something that is a non-blocking operation, Node will
call some code that will run concurrently with our javascript code under the hood.
Once this hiding thread receives the value it awaits for or throws an error, the provided
callback will be called with the necessary parameters.

## Task queue
JavaScript is a single-threaded, event-driven language. This means that we can attach listeners
to events, and when a said event fires, the listener executes the callback we provided.

Whenever you call setTimeout, http.get or fs.readFile, Node.js sends these operations to a
different thread allowing V8 to keep exectuing our code. Node also calls the callback when the coutner
has run down or the IO / http operation has finished.

However, we only have one main thread and one call-stack, so in case there is another
request being served when the said file is read, its callback will need to wait for the
stack to become empty. The limbo where callbacks are waiting for their turn to be executed
is called in an infinite loop whenever the main thread has finished its previous task, hence the name 'event loop';

In our previous example it would look something like this:
1. express registers a handler for the 'request' event that will be called when request arrives to '/'
2. skips the functions and starts listening on port 3000
3. the stack is empty, waiting for 'request' event to fire
4. upon incoming request, the long awaited event fires, express calls the provided handler
5. sendWeatherOfRandomCity is pushed to the stack
6. getWeatherOfRandomCity is called and pushed to the stack
7. Math.floor and Math.random are called, pushed to the stack and popped, a form citeis is assigned to city


