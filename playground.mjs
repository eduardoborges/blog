import Benchmark from "benchmark";

var suite = new Benchmark.Suite;

const movies = [
  { id: 1, name: "Titanic", year: 1997 },
  { id: 2, name: "Bastardos Inglórios", year: 2009 },
  { id: 3, name: "Laranja Mecânica", year: 1971 },
  { id: 4, name: "Soul", year: 2021 },
];


// add tests
suite
  .add('[with inline fn]', function () {
    function findBeforeYear(year) {
      return movies.filter(item => item.year < year);
    }
    for (let i = 1900; i <= 3000; i += 10) {
      findBeforeYear(i);
    }

  })
  .add('[with hoc]', function() {
    function byBeforeYear(year) {
      return function(item){
        item => item.year < year
      }
    }
    for (let i=1900; i<=3000; i+=10) {
      movies.find(byBeforeYear(i));
    }
  })
  .add('[with thisValue]', function () {
    function isBefore(movie) {
      return movie.year > this;
    }
    for (let i = 1900; i <= 3000; i += 10) {
      movies.filter(isBefore, i)
    }
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is: ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });


