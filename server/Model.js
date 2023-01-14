const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 1000,
    },
    img: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
