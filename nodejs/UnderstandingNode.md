## Understanding NodeJs
souce: Felix, http://debuggable.com

Node.js has generally caused two reactions in people I've introduced it to.
Basically people either "got it" right away, or they ended up being very confused.

It is a command line tool. You donwload a tarball, compile and install the source.
It let's you run JavaScript program by typing the command line in your temrinal.
The JS is executed by the V8 Javascript engine (the thing that makes Google Chrome so fast)
Node provides a JavaScript API to access the network and file system

Node is basically very good when you need to do several things at the same time.
Have you ever written a piece of code and said " I wish this would run in parallel"?
Well, in ndoe everything runs in parallel, except your code.

Imagine your code is the king, and node is his army of servants.

The day starts by one servant waking up the king and asking h8im if he needs anything.
The king gives the servant a list of tasks and goes back to sleep a little longer.
The servant now distributes those tasks among his colleagues and they get to work.

Once a servant finishes a task, he lines up outside the kings quarter to report.

```
var fs = require('fs')
, sys = require('sys');

fs.readFile('treasure-chamber-report.txt', function(report) {
    sys.puts("oh, look at all my money:" + report);
});

fs.writeFile('letter-to-princess.txt', '...', function(){
    sys.puts("can't wait to hear back from her!");
});
```
Your code gives node the two tasks to read and write a file, and then goes to sleep. Once node has completed a task, teh callback for it is fired.
But there can only be one callback firing at the same tine. Until that callback has finished executing, all other callbacks have to wait in line.
In addition to that, there is no guarantee on the order in which the callbacks will fire.

So we don't have to worry about code acessing the same data structures at the same time. That's the entire beauty of JavaScript single-threaded/ event loop design.
## Why should I use it?
One reason is efficiency. In a web application, your main response time cost is usually the sum of time it takes to execute all your database queries.
With node, you can execute all your queries at once, reducing the response time to the duration it takes to execute the slowest query.

Another reason is JavaScript. You can use node to share code between the borwser and your backend. javaScript is also on its way to become a really universal language. No matter if you did python, ruby, java, php, etc in the past, you've probably picked up some JS along the way.

And the last reason is raw speed. V8 is constantly pushing the boundaries in being one of hte fastest dynamic language interpreters on the planet.
I can't think of any other language that is being pushed for speed as aggressively as JavaScript is right now. In addition to that, node;s I/O facilities are really light weight, bringing you as close to fully utilizing your systems full I/O capacities as possible.

## So you are saying I should write all my apps in node from now on?
Yes and no. Once you start to swing the node hammer, everything is obviously going to start looking like a nail.
Make your decision based on:
1. Are low response times/high concurrency important? Node is really good at that.
2. How big is the project? Small projects should be fine. Big projects should evaluate carefully
    - Available libraries
    - Resources to fix a bug or two upstream
[Dependence injection](./)



