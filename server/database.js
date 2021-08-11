const mongoose = require('mongoose');

const URI = 'mongodb://localhost/Tienda';

mongoose.connect(URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;