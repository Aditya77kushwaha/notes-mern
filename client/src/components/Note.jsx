import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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
    <div>
      <div className="title">{note?.title}</div>
      <div className="desc">{note?.desc}</div>
      <div className="status">{note?.status ? "Completed" : "Incomplete"}</div>
      <button
        className="edit"
        onClick={() => {
          history.push(`/editnote/${note?._id}`);
        }}
      >
        Edit Note
      </button>
    </div>
  );
};

export default Note;
