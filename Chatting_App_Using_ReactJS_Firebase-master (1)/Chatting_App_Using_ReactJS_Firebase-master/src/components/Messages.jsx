import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { ChatContext } from "../Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return (
    <div
      className="messages-container"
      style={{ maxHeight: "51vh", overflowY: "auto" }}
      ref={containerRef}
    >
      <div className="messages">
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
