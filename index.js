const express = require('express');
const helmet = require('helmet');

const cohortRoutes = require('./routes/cohortRoutes');
const studentRoutes = require('./routes/studentRoutes');

const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.use('/cohorts', cohortRoutes);
server.use('/students', studentRoutes);

server.listen(9000, () => console.log('API Running!'));

module.exports = server;
