const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://brglz:s10061097@cluster0.yjfrp.mongodb.net/cubicle?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Database connected');
})

require('./config/express')(app);

app.use('/', indexRouter);
app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));