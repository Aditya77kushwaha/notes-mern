import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./NewNote.css";

const EditNote = () => {
  const [originalNote, setOriginalNote] = useState({
    title: "",
    desc: "",
    img: "",
    status: false,
  });
  const [note, setnote] = useState({
    title: originalNote?.title,
    desc: originalNote?.desc,
    img: originalNote?.img,
    status: originalNote?.status,
  });
  const history = useHistory();
  const id = useParams().id;

  const handleChange = (e) => {
    setnote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`/${id}`);
      setOriginalNote(res.data);
    };
    fetchNote();
  }, [id]);

  return (
    <div className="wrap">
      {/* <div className="title">{originalNote?.title}</div>
      <div className="desc">{originalNote?.desc}</div>
      <div className="status">
        {originalNote?.status ? "Completed" : "Incomplete"}
      </div> */}
      <input
        type="text"
        name="title"
        className="title"
        onChange={handleChange}
        placeholder="New title"
        value={note?.title}
      />
      <textarea
        type="text"
        name="desc"
        className="desc"
        onChange={handleChange}
        placeholder="Write something..."
        value={note?.desc}
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
          // console.log(note);
          axios
            .put(`/${id}`, note)
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
        Edit
      </button>
    </div>
  );
};

export default EditNote;
