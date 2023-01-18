import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Note.css";

const Note = () => {
  const [note, setnote] = useState();
  const id = useParams().id;
  const history = useHistory();

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`/${id}`);
      setnote(res.data);
    };
    fetchNote();
  }, [id]);

  return (
    <div className="notes">
      <h1 className="note-title">
        {note?.title}
        <sup
          className={note?.status ? "completed" : "incomplete"}
          onClick={() => {
            history.push(`/editnote/${note?._id}`);
          }}
        >
          ✏️
        </sup>
      </h1>
      <div className="note-desc">{note?.desc}</div>
      <div className="note-status"></div>
      {/* <button>Edit Note</button> */}
    </div>
  );
};

export default Note;
