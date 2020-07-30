import React, { useState, useEffect, useRef } from "react";
import { Typography, FormControl, Input, IconButton } from "@material-ui/core";
import "./App.css";
import db from "./firebase/firebase";
import Message from "./Message/Message";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
import Alert from "./Alert";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatboxRef = useRef(null);
  const [showMessages, setShowMessages] = useState(false);
  const [scrollPosition, setScrollPosition] = useState();
  const [previousHeight, setPreviousHeight] = useState([]);

  // Use effect function for scroll
  useEffect(() => {
    const reference = chatboxRef.current;
    const initialHeight =
      reference.scrollHeight - chatboxRef.current.clientHeight;
    const heightsArray = [];
    for (let i = -3; i <= 3; i++) {
      heightsArray.push(initialHeight + i);
    }
    setPreviousHeight(heightsArray);
    setScrollPosition(initialHeight);
    const scrollFunc = (e) => {
      setScrollPosition(Math.round(e.target.scrollTop));
    };
    reference.addEventListener("scroll", scrollFunc);

    return () => reference.removeEventListener("scroll", scrollFunc);
  }, []);

  // For initializing username
  useEffect(() => {
    Alert().then((res) => {
      let user = "";
      user = res.value;
      setUsername(user ? user : "Guest");
      setShowMessages(true);
    });
  }, []);

  useEffect(() => {
    // Firebase realtime updates
    db.collection("messages")
      .orderBy("timeStamp", "asc")
      .onSnapshot((docs) => {
        const messagesArray = [];
        docs.forEach((doc) =>
          messagesArray.push({ data: doc.data(), id: doc.id })
        );
        setMessages(messagesArray);
      });
  }, []);

  // Update scrolling behaviour
  useEffect(() => {
    const checkForScroll =
      previousHeight.length &&
      previousHeight.some((val) => val === scrollPosition);
    if (checkForScroll) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }

    // New array for total height
    const newHeightArray = [];
    for (let i = -3; i <= 3; i++) {
      newHeightArray.push(
        chatboxRef.current.scrollHeight - chatboxRef.current.clientHeight + i
      );
    }
    setPreviousHeight(newHeightArray);
  }, [messages, showMessages]);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      username,
      message: inputValue,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputValue("");
  };

  return (
    <div className="App" ref={chatboxRef}>
      <img
        src="https://maxcdn.icons8.com/Share/icon/Logos/facebook_messenger1600.png"
        alt="Messenger Icon"
        width="200"
      />
      <Typography variant="h5">Messenger App</Typography>
      <Typography variant="h6">Welcome {username}</Typography>
      <br />
      {showMessages && 
          messages.map((message) => (
            <Message key={message.id} data={message} username={username} />
          ))
      }

      <form onSubmit={handleSubmit} className="app__form">
        <FormControl className="app__formcontrol">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="app__form_input"
            placeholder="Enter message...."
          />
          <IconButton
            variant="outlined"
            color="primary"
            type="submit"
            disabled={!inputValue}
            className="app__form_xxfdfsubmit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
