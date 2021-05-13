const express = require("express");
require("../db");
const Payload = require("../models/payload");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", async (req, res) => {
    const payload = new Payload(req.body);
    try {
        await payload.save();
        await res.status(200).send(payload);
    } catch (error) {
        res.status(404).send({ error: "Payload not created!" });
    }
});

app.get("/read", async (req, res) => {
    try {
        const payload = await Payload.find({});
        await res.status(200).send(payload);
    } catch (error) {
        res.status(500).send();
    }
});

app.patch("/update/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["data"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const payloadUpdate = await Payload.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!payloadUpdate) {
            return res.status(404).send();
        }
        res.send(payloadUpdate);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const deletePayload = await Payload.findByIdAndDelete(req.params.id);

        if (!deletePayload) {
            return res.status(404).send();
        }
        res.send(deletePayload);
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log("Server is running on port " + port);
});
