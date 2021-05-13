const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1:27017";

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
