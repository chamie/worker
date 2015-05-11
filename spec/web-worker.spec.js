describe('worker: create big array', function() {
  var myWorker, result;

  beforeEach(function(done) {
    myWorker = $worker(function(e) {
      var foo = [], min = e.data.min, max = e.data.max;

      for (var i = 0; i < e.data.length; i++) {
        foo.push(Math.floor(Math.random() * (max - min)) + min);
      }

      hello();

      self.postMessage(foo);
    }, function() { return new Array(1024)});

    myWorker.loadScripts(function hello() { console.log('hello world'); }, function foo() {});

    myWorker.onmessage = function(data) {
      result = data;
      done();
    };

    myWorker.postMessage({length: 1024, min: 0, max: 9999});
  });

  afterEach(function() {
    myWorker.terminate();
    myWorker = null;
    result = null;
  });

  it('should create a big array', function() {
    expect(result.length).toBe(1024);
  });
});
