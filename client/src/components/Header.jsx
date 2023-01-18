import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  return (
    <>
      <header
        onClick={() => {
          history.push("/");
        }}
      >
        <div className="wrapper">
          <blockquote>
            <p className="quote">
              I can shake off everything as I write; my sorrows disappear, my
              courage is reborn.
            </p>
            <cite>Anonymous</cite>
          </blockquote>
        </div>
      </header>
    </>
  );
};

export default Header;
