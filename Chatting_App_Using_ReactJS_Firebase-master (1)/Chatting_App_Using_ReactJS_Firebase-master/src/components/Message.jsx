import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const bgWidth = `${message?.text?.length * 10 + 250}px`; 
  let t = message.date.seconds+19800
  const secondsSinceEpoch = t; 
  const hours = Math.floor(secondsSinceEpoch / 3600) % 24; 
  const minutes = Math.floor((secondsSinceEpoch % 3600) / 60);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return (
    <>{message.text === "null" ? <p></p> :
    <div className="bg-slate-600 border-b flex items-center space-x-4 border-gray-200 border-2 rounded-2xl m-2" style={{ width: bgWidth }}>
      
        <div className="avatar  ">
          <img 
          
            src={message?.senderId === currentUser?.uid ? currentUser?.photoURL : (data?.user?.photoURL || 'fallback_url')} 
            alt="Avatar"
            className="rounded-full size-16 m-2" 
          />
        </div>
        <div className="name">
          <h1 className="text-lg font-bold">
            {message?.senderId === currentUser?.uid ? currentUser.displayName : data.user?.name}
          </h1>
        </div>
        <div className="message ">
          {message.img && <img
            className='p-4 w-72'
            src={message.img} alt="Uploaded" />}
          {message.text !== "" && <p>{message.text}</p>}
        </div>
        <div className="time">
          <p className="text-gray-500 pl-2">{formattedTime}</p>
        </div>
      </div>
  }
  
    </>
  );
}

export default Message;
