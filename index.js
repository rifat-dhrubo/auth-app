const mongoose = require('mongoose');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 12 && minor <= 0)) {
  console.log(`🙅‍♀️🙅‍♂️🚫🚫 Please use Node version 12.0 or higher🚫🚫🙅‍♀️🙅‍♂️`);
  process.exit();
}

// import environmental variables from our .env file
require('dotenv').config();

// Connect to our Database and handle any bad connections
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });
  console.log(`Database Connected`);
} catch (dbConnectionError) {
  console.error(dbConnectionError);
}

// Start our app!
const app = require('./server');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → http://127.0.0.1/${server.address().port}`);
});
