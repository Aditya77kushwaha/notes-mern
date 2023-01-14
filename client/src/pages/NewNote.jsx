import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div className="new-note">
      <input
        type="text"
        name="title"
        className="title"
        onChange={handleChange}
      />
      <input type="text" name="desc" className="desc" onChange={handleChange} />
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
      >
        Create
      </button>
    </div>
  );
};

export default NewNote;
