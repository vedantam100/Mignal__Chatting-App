import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

function Chats() {
  const [chats, setChats] = useState({}); // Changed state to object
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Set chats to an empty object if doc.data() is undefined
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({
      type: "CHANGE_USER",
      payload: u
    });
  };

    return (
      <div>
        {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
          <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className="relative flex bg-slate-800 p-4 rounded-lg">
            <img
              src={chat[1].userInfo?.photoURL || 'fallback_url'}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div className="ml-5 text-12 text-white flex-col items-center">
              <div className="font-bold">{chat[1].userInfo?.name}</div> 
              {chat[1].lastMessage?.text === "" ? (
               
                <div>
                  <h1>Continue!</h1>
                </div>
              ) : (
                <div>
                  <p className='text-sm'>{chat[1].lastMessage?.text}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
    
}

export default Chats;
