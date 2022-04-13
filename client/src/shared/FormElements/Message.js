import React from "react";
import styles from "./Message.module.css";

// this.props.location.state.detail.user
const Message = (props) => {
  if (props.children==="") {
    return ""
  }

  if (props.error) {
    return (
      <div className={`alert alert-warning ${styles.msg}`} style={props.style}>
        {props.children}
      </div>
    );
  }

  return (
    <div className={styles.msg} style={props.style}>
      {props.children}
    </div>
  );
};

export default Message;
