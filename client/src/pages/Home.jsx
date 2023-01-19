import React, { useContext, useEffect } from "react";
import { NoteContext } from "../Context";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { notes, setNotes } = useContext(NoteContext);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8800/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [notes, setNotes]);

  return (
    <div className="home">
      <button
        className="home-new-note"
        onClick={() => {
          history.push("/newnote");
        }}
      >
        Wield your pen
      </button>
      <div className="home-card-group">
        {Object.keys(notes).map((key, idx) => {
          return (
            <div
              key={notes[key]?._id}
              className={`home-notes ${
                idx % 2 === 1 ? " alt-left" : "alt-right"
              }`}
            >
              <center
                onClick={() => {
                  history.push(`/note/${notes[key]?._id}`);
                }}
                className="home-notes-title"
              >
                {notes[key]?.title}
              </center>
              <button
                className="home-delete"
                onClick={() => {
                  axios
                    .delete(`/${notes[key]?._id}`)
                    .then((res) => {
                      history.go(0);
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                }}
              >
                Trash
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
