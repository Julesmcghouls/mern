import express from "express";
import cors from "cors";
import records from "../routes/records.js";

// Path: server/routes/records.js
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

//start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
