import noteContext from "./noteContext";
import { useState, useContext } from "react";
import loadingBarContext from "../loadingBar/loadingBarContext";

const NoteState = (props) => {
  const authToken = localStorage.getItem("authToken");

  const { setProgress } = useContext(loadingBarContext);

  const [notes, setNotes] = useState([]);

  //Get All Note

  const fetchNote = async () => {
    setProgress(30);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/fetchaallnotes`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setProgress(60);

      const json = await response?.json();

      if (json.statusCode === 200) {
        setNotes(json.data);
      }
      setProgress(100);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Add Note

  const addNote = async (title, description, tag) => {
    setProgress(30);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/createnote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );

      setProgress(60);

      const json = await response.json();

      if (json.statusCode === 201) {
        const _id = json.data._id;

        setNotes((prev) => [
          {
            _id,
            title,
            description,
            tag,
            createdAt: json.data.createdAt,
            updatedAt: json.data.updatedAt,
          },
          ...prev,
        ]);
      }

      setProgress(100);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Delete Note

  const deleteNote = async (_id) => {
    setProgress(30);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/deletenote/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setProgress(60);

      const json = await response.json();

      if (json.statusCode === 200) {
        setNotes((prev) =>
          prev.filter((todo) => {
            return todo._id !== _id;
          })
        );
      }

      setProgress(100);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Edit Note

  const updateNote = async (updatedNote) => {
    setProgress(30);

    try {
      const { _id, updatedTitle, updatedDescription, updatedTag } = updatedNote;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/notes/updatenote/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            updatedTitle,
            updatedDescription,
            updatedTag,
          }),
        }
      );

      setProgress(60);

      const json = await response.json();

      if (json.statusCode === 200) {
        setNotes((prev) =>
          prev.map((note) => {
            return note._id === _id
              ? {
                  _id,
                  title: updatedTitle,
                  description: updatedDescription,
                  tag: updatedTag,
                  createdAt: json.data.createdAt,
                  updatedAt: json.data.updatedAt,
                }
              : note;
          })
        );
      }

      setProgress(100);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const logout = async () => {
    setProgress(30);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_LINK}/api/v1/users/logoutuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setProgress(60);

      const json = await response.json();

      if (json.statusCode === 200) {
        localStorage.removeItem("authToken");

        // document.cookie =
        //   "noteCookie" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        setNotes([]);
      }

      setProgress(100);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, fetchNote, addNote, deleteNote, updateNote, logout }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
