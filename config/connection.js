const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://jomsey:user1234@cluster0.sf4qafq.mongodb.net/neighbornetDB';

connect(connectionString);

module.exports = connection;
