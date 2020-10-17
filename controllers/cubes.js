const fs = require('fs');
const { getCubes } = require('./database-controller');

const getAllCubes = (callback) => {
    getCubes((cubes) => {
        callback(cubes);
    })

}

module.exports = { getAllCubes };