import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [notes, setNotes] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8800/")
      .then((res) => {
        // console.log(res.data);
        setNotes(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <button
        className="new-note"
        onClick={() => {
          history.push("/newnote");
        }}
      >
        New Note
      </button>
      {Object.keys(notes).map((key) => {
        return (
          <div key={notes[key]?._id} className="notes">
            <center
              onClick={() => {
                history.push(`/note/${notes[key]?._id}`);
              }}
              className="notes-desc"
            >
              {notes[key]?.title}
            </center>
            <button
              className="delete"
              onClick={() => {
                axios
                  .delete(`/${notes[key]?._id}`)
                  .then((res) => {
                    // console.log(res);
                    history.go(0);
                  })
                  .catch((err) => {
                    // console.log(err);
                  });
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
