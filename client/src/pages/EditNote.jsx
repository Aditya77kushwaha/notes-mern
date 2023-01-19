import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../Context";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./NewNote.css";

const EditNote = () => {
  const [originalNoteEdited, setOriginalNoteEdited] = useState({
    title: false,
    desc: false,
    img: false,
    status: false,
  });
  const { curNote, setCurNote } = useContext(NoteContext);

  const [note, setnote] = useState({
    title: curNote?.title,
    desc: curNote?.desc,
    img: curNote?.img,
    status: curNote?.status,
  });
  const history = useHistory();
  const id = useParams().id;

  const handleChange = (e) => {
    setnote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setOriginalNoteEdited((prev) => ({ ...prev, [e.target.name]: true }));
  };

  useEffect(() => {
    console.log("Cur id now is", id);
    const fetchNote = async () => {
      const res = await axios.get(`/${id}`);
      setCurNote(res.data);
    };
    fetchNote();
  }, []);

  return (
    <div className="wrap">
      <input
        type="text"
        name="title"
        className="title"
        onChange={handleChange}
        placeholder="New title"
        value={!originalNoteEdited?.title ? curNote?.title : note?.title}
      />
      <textarea
        type="text"
        name="desc"
        className="desc"
        onChange={handleChange}
        placeholder="Write something..."
        value={!originalNoteEdited?.desc ? curNote?.desc : note?.desc}
      />
      <label>
        Mark as Done
        <input
          checked={!originalNoteEdited?.status ? curNote?.status : note?.status}
          type="checkbox"
          name="status"
          value={!originalNoteEdited?.status ? curNote?.status : note?.status}
          onChange={(e) => {
            setnote((prev) => ({ ...prev, status: !prev.status }));
            setOriginalNoteEdited((prev) => ({
              ...prev,
              status: true,
            }));
          }}
          className="status"
        />
      </label>
      <button
        className="create"
        onClick={() => {
          axios
            .put(`/${id}`, note)
            .then((res) => {
              // console.log(res);
              history.push("/");
            })
            .catch((err) => {
              console.log(err);
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
