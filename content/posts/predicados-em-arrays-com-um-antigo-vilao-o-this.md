---
title: "Predicados em Arrays com um antigo vilão, o `this`"
date: 2022-11-17T23:19:30-03:00
slug: "predicados-em-arrays-com-um-antigo-vilao-o-this"
draft: true
---

É, o `this` é odiado entre quase todos os devs do javascript, talvez seja o elemento mais odiado e se você ainda não odeia ainda vai odiar. A razão é bem conhecida, seu comportamento e valor é meio estranho, assim como todo JS, mas ele em especial pois [depende do contexto que se encontra](https://www.30secondsofcode.org/articles/s/javascript-this), ou seja, do objeto que está em execução naquele momento.

É uma faca de *dois legumes* e pega muita gente, mas capturar referências do objeto em execução muitas vezes pode simplificar diversas aplicação do seu dia a dia, moçinho. Por exemplo, observe o seguinte código:


```javascript
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

```