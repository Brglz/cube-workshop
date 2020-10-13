const Cube = require('../models/cube');

const newCube = new Cube('default', 'this is default cube', 'http://google.com', 1);

newCube.save();
