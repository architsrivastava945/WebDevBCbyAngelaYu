// var generateName = require('sillyname');
import generateName from 'sillyname'; // we can you this instead of require
var sillyname = generateName();

import {randomSuperhero} from 'superheroes';
var superheroName = randomSuperhero();
console.log(`My superhero name is ${superheroName}.`);

console.log(`My name is ${sillyname}.`);