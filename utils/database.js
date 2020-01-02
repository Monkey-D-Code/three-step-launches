const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'three-step-launchers',
    'root',
    '',
    {
        dialect : 'mysql',
        host : 'localhost',
    }
);

module.exports = sequelize;