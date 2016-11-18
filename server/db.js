module.exports = (function(){
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

  let db = {};
  db.findUser = (username, callback) => {
    const query = 'SELECT * FROM auth_table WHERE username = ?';
    client.execute(query, [username], { prepare: true }, callback);
  }
  db.addUser = (username, hashPassword, callback) => {
    const data = [username, Date.now() ,hashPassword ];
    const query = 'INSERT INTO auth_table (username ,date_joined ,hashed_pass) VALUES (?, ?, ?)';
    client.execute(query, data, { prepare: true }, callback);
  }
  db.getSongList = (username, callback) => {
    const query = 'SELECT * FROM songs WHERE username = ?';
    client.execute(query, [username], { prepare: true }, callback);
  }
  db.addSong = (username, songInfo, callback) => {
    console.log("db add song", username, songInfo);
    const query = 'INSERT INTO songs (username, artist_name, album, song_name, track) VALUES (?, ?, ?, ?, ?)';
    const data = [username, songInfo.artist, songInfo.album, songInfo.song, songInfo.track];
    client.execute(query, data, { prepare: true }, callback);
  }
  db.removeSong = (username, songInfo, callback) => {
    const query = 'DELETE FROM WHER username=? AND artist_name=? AND album=? AND song_name=? AND track=?';
    const data = [username, songInfo.artist, songInfo.album, songInfo.song, songInfo.track];
    client.execute(query, data, { prepare: true }, callback);
  }
  return db;
})();
  


