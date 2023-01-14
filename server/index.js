//imports
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Note = require("./Model");

// middlewares
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

//dB connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//routes for CRUD
app.post("/", async (req, res) => {
  const newNote = new Note(req.body);
  try {
    const savedNote = await newNote.save();
    res.json(savedNote).status(200);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

app.get("/:id", async (req, res) => {
  const foundNote = await Note.findById(req.params.id);
  try {
    res.status(200).json(foundNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id);
    const updatedNote = await foundNote.updateOne({$set:req.body})
    res.json(updatedNote).status(200);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const foundNote = await Note.findById(req.params.id);
    const deletedNote = await foundNote.deleteOne({$set:req.body})
    res.json("Note Deleted").status(200);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
