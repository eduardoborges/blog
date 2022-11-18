


const movies = [
  { id: 1, name: "Titanic", year: 1997 },
  { id: 2, name: "Bastardos Inglórios", year: 2009 },
  { id: 3, name: "Laranja Mecânica", year: 1971 },
  { id: 4, name: "Soul", year: 2021 },

];

function findByID(id) {
  return movies.find(item => item.id === id);
}

function findByName(name = '') {
  return movies.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
}

function findBeforeYear(year) {
  return movies.filter(item => item.year < year);
}

function findYear21Century() {
  return movies.find(item => item.year > 2000);
}

