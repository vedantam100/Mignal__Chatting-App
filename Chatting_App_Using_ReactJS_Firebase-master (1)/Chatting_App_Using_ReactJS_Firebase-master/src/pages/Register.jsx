import add from "../imgaes/Picture.png";
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { storage, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayPicture = e.target.avatar.files[0];

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const storageRef = ref(storage, `${user.uid}/${displayPicture.name}`);

      const uploadTask = uploadBytesResumable(storageRef, displayPicture);
      
      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          console.error('Upload error:', error);
          setErrorMessage('Error uploading display picture.');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(user, {
            displayName: name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name,
            photoURL: downloadURL,
            email,
          });
          await setDoc(doc(db, 'userChats', user.uid), {});
          navigate('/');
        }
      );
    } catch (error) {
      console.error('Registration error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="box p-8 bg-gray-800 rounded-lg shadow-lg text-center md:w-1/2 lg:w-1/3">
        <div className="text-3xl font-bold text-white mb-4">Temligram</div>
        <div className="text-xl font-semibold text-white mb-4">Register</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="sr-only">Display Name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-600"
              placeholder="Display Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-600"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-600"
              placeholder="Password"
              required
            />
          </div>
          <div className="relative">
            <input
              id="avatar"
              name="avatar"
              type="file"
              className="hidden"
            />
            <label htmlFor="avatar" className="text-white absolute cursor-pointer">
              <img src={add} alt="" className="w-6 h-6" />
            </label>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <p className="text-white mt-4">Already Have An Account? <Link to="/login">Login!</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
