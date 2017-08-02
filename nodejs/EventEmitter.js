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
