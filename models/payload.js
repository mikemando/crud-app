const mongoose = require("mongoose");
const validator = require("validator");

const Payload = mongoose.model("payload", {
    data: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Enter a valid Email!");
                }
            },
        },
        country: {
            type: String,
            required: true,
        },
    },
});

module.exports = Payload;
