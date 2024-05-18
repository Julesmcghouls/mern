import express from "express";

//This helps us connect to DB
import db from "./db/connection.js";

//This helps us convert id from string to ObjectId 
import { ObjectId } from "mongodb";
//Router is an instance of express router 
//We use it to define our routes
const router = express.Router();

//This section will help us get all the records from the database   
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//This section will help us get a specific record from the database
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: ObjectId(req.params.id) }; 
    let results = await collection.findOne(query);

    if (!results) {
        res.send("Record not found").status(404); 
    } else {
        res.send(results).status(200);
    }
});

//This section will help us add a record to the database
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding record");
    }
});

//This section will help us update a record in the database
router.put("/:id", async (req, res) => {
    try {
        let query = { _id: ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        };
        let collection = await db.collection("records");
        let result = await collection.updateOne(query, update);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating record");
    }
});

//This section will help us delete a record from the database
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const collection = await db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting record");
    }
});

export default router;
