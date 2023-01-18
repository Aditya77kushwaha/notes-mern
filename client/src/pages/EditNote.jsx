import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./NewNote.css";

const EditNote = () => {
  const [note, setnote] = useState({
    title: "",
    desc: "",
    img: "",
    status: false,
  });
  const [originalNote, setOriginalNote] = useState({
    title: "",
    desc: "",
    img: "",
    status: false,
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
        placeholder="Title of your note"
      />
      <textarea
        type="text"
        name="desc"
        className="desc"
        onChange={handleChange}
        placeholder="Write something..."
      />
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
              // console.log(err);
            });
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default EditNote;
