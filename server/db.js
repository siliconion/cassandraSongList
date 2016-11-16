const cassandra = require('cassandra-driver');
const authProvider = new cassandra.auth.PlainTextAuthProvider(process.env.DB_USERNAME, process.env.DB_PASSWORD);
clientOptions ={
            contactPoints: [process.env.DB_HOSTNAME],
            protocolOptions: { port: process.env.DB_PORT },
            keyspace: process.env.DB_KEYSPACE
        }

const client = new cassandra.Client(clientOptions);
//Set the auth provider in the clientOptions when creating the Client instance
// const client = new cassandra.Client({ authProvider: authProvider });

client.connect(function (err) {
  console.log(err);
});