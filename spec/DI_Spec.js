
describe('Testing for Dependency Injection Task', function () {

    var d;
    beforeEach(function () {
        d = new DI();
    });

    it('Should register new dependency', function () {
        d.register('car',{make: 'Audi'});
        expect(d.dependencies).toEqual({car: Object({make: 'Audi'})});
    });

    it('Should resolve dependencies', function () {
        d.register('car',{make: 'Audi'});
        var dep = d.resolve('car');
        expect(dep).toEqual({make: 'Audi'});
    });

    it('Should inject dependency', function () {
        d.register('car', {make: 'Audi'});
        function move(car, name){
            for(var prop in car) var c = car[prop];
            return c+' : '+name;
        }
        var msg = d.inject(move,'A6');
        expect(msg).toEqual('Audi : A6');
    });
});