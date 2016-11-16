const cassandra = require('cassandra-driver');
// Set the auth provider in the clientOptions when creating the Client instance
const authProvider = new cassandra.auth.PlainTextAuthProvider(process.env.DB_USERNAME, process.env.DB_PASSWORD);
const clientOptions = {
  contactPoints: [process.env.DB_HOSTNAME],
  protocolOptions: { port: process.env.DB_PORT },
  keyspace: process.env.DB_KEYSPACE,
  authProvider
}

const client = new cassandra.Client(clientOptions);

client.connect(function (err) {
  console.log("connection ", err);
});