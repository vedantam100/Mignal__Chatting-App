import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  const handleSend = async () => {
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            reject, // Error handling
            () => resolve(uploadTask.snapshot.ref)
          );
        });
  
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
        await sendMessage({ text:"Photo Published", img: downloadURL });
      } else {
        await sendMessage({ text });
      }
  
      await updateChatTimestamps(text);
      setText("");
      setImg(null);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error
    }
  };
  
  const sendMessage = async ({ text = "", img = null }) => {
    const messageData = {
      id: uuid(),
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };
    if (text === "") {
      messageData.text = "null";
    }
    if (text !== "") {
      messageData.text = text;
    }
  
    if (img) {
      messageData.img = img;
    }
  
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion(messageData),
    });
  };
  
  const updateChatTimestamps = async (text) => {
    const messageUpdate = {
      [`${data.chatId}.lastMessage`]: { text },
      [`${data.chatId}.date`]: serverTimestamp(),
    };
  
    const userChatsUpdate = {
      ...messageUpdate,
    };
  
    await Promise.all([
      updateDoc(doc(db, "userChats", currentUser.uid), userChatsUpdate),
      updateDoc(doc(db, "userChats", data.user.uid), userChatsUpdate),
    ]);
  };
  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      console.log("Hola");
      handleSend();
    }
  };
  
  
    
  return (
    <div className="absolute bottom-0">
      <div className="flex space-x-4 w-full bg-white p-2 rounded-xl">
        {/* Text Input */}
        <div className="textInput">
          <input
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Enter Your Text"
            className="border border-gray-300 rounded-md px-4 py-2 h-14 text-black text-xl focus:outline-none focus:border-blue-500"
            style={{ width: "37vw" }}
            value={text}
          />
        </div>

        {/* File Input */}
        <div className="input relative">
  <input
    type="file" // Change type to "file"
    id="fileInput"
    onChange={(e) => setImg(e.target.files[0])}
    className="hidden"
  />
  <label
    htmlFor="fileInput"
    className="cursor-pointer"
    title="Choose File"
  >
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2Yu2tUQRTGf4pG4hYxaJFEAr5ANIhNglik10YMKNrY2wkWVlaCpSD4BwiBaGlhpyRaiEoMpLBQEZ8IGvCB+IjvkQPfwrBslru5M7N7w3wwzN4zZ75zPubcuzMDGdWCi9QeAYMrQYgDHgNDqYWEhC/mCbA5KHsHhMynFOMiCtkAzOr3C2BL4DhNg8biNDH39fwS2Bo4VtOgsTj7gHuyvQK2BY7XNGgsThNz1xOzvapCDDXglsZeAztSBI3FWQNmNP4W2J0iaCzO9cC0fN6FEtMJIXUxNz0xI1RUiKEXuCHfBWAPXbxFaacthAgaEmU2ml0lpCN5uCwkLFxekYSldRS4DByp8oqMAf8Uw/rRqgo53PB5PRQrj3YJVgPXgKfAQAH/tcBV4AtwBVgTKI/SBGe9OTMSFgIupZBx4DfwF/ikeWcafI4B74HjEfMoRdCvM7f5ngcO6OU1YfvlY6e+z/JZBPZFyKMUwSrguvzueHV+QbZnwCbggbctt/5NG7eNLoWQ0/L5AAx79h5gzjvtWf9com7r2S4d1nWDkFHgp8rIPqWN8MvJL7ONWimzTwbIoxRBn5fMxRYcJ+TzDdjl2fcCXzV2qkQehdCKYEpjcwXKY1K+D3Xyq2NCq/kHOLjMPAphKYKTstsf2c4CPDXdvtucSw1j52T/2OIKKIoQuwn8LvsvJVCkLXp7qmb2+uomE2KXAD9KHlmXatMphaA67w/UekrkURj5qBsYLq+IkEsrMFwuLSGXVmC4XFqC67K2bKwYIRkkxn8X7NPmzR/WMQAAAABJRU5ErkJggg=="
      alt=""
      className="w-8 h-8 mt-2"
    />
  </label>
</div>


        {/* Image Input */}
        <div className="input relative">
          <input
            type="file"
            alt=""
            id="imageInput"
            onChange={(e) => setImg(e.target.files[0])}
            
            className="hidden"
          />
          <label
            htmlFor="imageInput"
            className="cursor-pointer"
            title="Choose Image"
          >
            {/* Add a descriptive title attribute */}
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACR0lEQVR4nO2YX4hPQRTHP0ho5d+SfyVLWItS9ldevaw88OJVKQ+U4k1SyJvyYNuilDzIg8KbWlL+tEmKIkVK8mfTrpIU8YLR1PfWdLvpZ52Ze3ebb013zj1zz5nvzJmZOwcyxhdcpHIdmDYRiDhgEJiemoglQjJ3gZmm1msgMqrnHaDD2EdSImuAYdXvA7OM/VQ6jWVzOfBa8mOg09hXpdNYNpcBr/TuCTDf2F+l01g2FwHP9f4FsHi8EvFYCDyT7iWwNIXTWDbnAY+kfwN0pXAay+Yc4KHavANWpnAay+Zs4IHavQdWpXAay2YHcDs4PNencDoWm/9aPlo4tcT//Gg2ikgt/XCZiC1cnhEhh5YxXA6tNkdiLXAcGACOAFsq2uwALgKndZEK4ZMPe4ELQP9frrzRZ2RPxaHlO1Rgf0k3AiyQbi7wNNB9A6bUTeQM0BMkFDYDU/Vb8QNoAVekO6xvz0v2P4cb9D1NIOJxUrJ/blX9pnSFPATMEMHfQLdBP8yJ7JJ8LQirQrc6uGO0VP9g1A9zIjsl3wCOqX4qSDJ4+RPQFyQbGklkn+TLwIGSrluyTzJsCmankUTOSfZb8fYgx+uxTfIt5a/8+vjV5r3cpSTiR/kL8BNYoQX9Ffgu3dXSrlXc/u4BG5V5pCnniB/hg4H+REn/VskFj3VaL4Xuc51EeoGzmpFDGtkQk4DdwCVtyeXE2xLgqE52vylMrotIKrhMRMgzYgyXQ0vIoWUMl0NLyKFlDJdDyyBzHqOMGROGSAaJ8QfHG8OPWAuI/wAAAABJRU5ErkJggg=="
              alt=""
              className="w-8 h-8 mt-2"
            />
          </label>
        </div>

        {/* Send Button */}
        <div className="sendButton">
          <button
            onClick={handleSend}
            
            className="bg-blue-500 h-14 w-20 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;