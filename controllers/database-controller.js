const fs = require('fs');
const path = require('path');
const databaseFile = path.join(__dirname, '..', 'config/database.json');

const saveCube = (cube, callback) => {
    getCubes((cubes) => {
        cubes.push(cube)
        fs.writeFile(databaseFile, JSON.stringify(cubes), err => {
            if (err) {
                throw err;
            }
            console.log('newCube is successfully stored');
            callback()
        })
    });
}

const getCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0];
        callback(cube);
    })
}

const getCubes = (callback) => {
    fs.readFile(databaseFile, (err, dbData) => {
        if (err) {
            throw err;
        }
        const cubes = JSON.parse(dbData);
        return callback(cubes);
    })

}

module.exports = {
    getCubes,
    getCube,
    saveCube
}