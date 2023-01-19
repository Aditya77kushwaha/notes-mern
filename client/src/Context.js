import React, { createContext, useState } from "react";

export const NoteContext = createContext(null);
export const NoteProvider = (props) => {
  const [notes, setNotes] = useState({});
  const [curNote, setCurNote] = useState({});

  return (
    <NoteContext.Provider value={{ notes, setNotes, curNote, setCurNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
