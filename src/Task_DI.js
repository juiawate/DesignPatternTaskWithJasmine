
function DI() {
    this.dependencies = {};
}

DI.prototype.register = function (name, obj) {
    this.dependencies[name] = obj;
};

DI.prototype.resolve = function (name) {
    return this.dependencies[name];
};

DI.prototype.inject = function () {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    var func = args.shift();
    var params = getParam(func);
    //console.log(params);

    var func_args = params.map(function (p) {
        return self.resolve(p) || args.shift();
    });

    //console.log(func_args);
    return func.apply(null,func_args);
};

function getParam(fn) {
    var args = fn.toString().match(/^\s?function\s[^(]+\(([^)]+)/i)[1];
    //console.log(args);
    return args.match(/[^,]+/g);
}
