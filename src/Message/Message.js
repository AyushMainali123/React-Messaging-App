import React from "react";
import { Paper } from "@material-ui/core";
import "./Message.css";
const Message = ({ data, username }) => {
  const tallyUser = data.data.username === username;
  const displayUsername = !tallyUser ? `${data.data.username}: ` : "";
  return (
    <div className="Message">
      <Paper
        className={`message__paper ${tallyUser && "currentuser"}`}
        elevation={3}
      >
        <b>{displayUsername}</b> {data.data.message}
      </Paper>
    </div>
  );
};

export default Message;
