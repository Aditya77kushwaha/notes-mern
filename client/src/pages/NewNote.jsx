import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NewNote.css";

const NewNote = () => {
  const [note, setnote] = useState({
    title: "",
    desc: "",
    img: "",
    status: false,
  });
  const history = useHistory();

  const handleChange = (e) => {
    setnote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="wrap">
      <input
        type="text"
        name="title"
        className="title"
        onChange={handleChange}
        placeholder="Title of your note"
      />
      <textarea
        type="text"
        name="desc"
        className="desc"
        onChange={handleChange}
        placeholder="Write something..."
      />
      <label>
        Mark as Done
        <input
          type="checkbox"
          name="status"
          value={note?.status}
          onChange={(e) => {
            setnote((prev) => ({ ...prev, status: !prev.status }));
            // console.log(note?.status);
          }}
          className="status"
        />
      </label>
      <button
        className="create"
        onClick={() => {
          axios
            .post("/", note)
            .then((res) => {
              // console.log(res);
              history.push("/");
            })
            .catch((err) => {
              // console.log(err);
            });
        }}
        disabled={!note.title || !note.desc}
      >
        Save
      </button>
    </div>
  );
};

export default NewNote;
