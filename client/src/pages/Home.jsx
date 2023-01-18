import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Home.css";

// export default CardGroup;

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
                      // console.log(res);
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
