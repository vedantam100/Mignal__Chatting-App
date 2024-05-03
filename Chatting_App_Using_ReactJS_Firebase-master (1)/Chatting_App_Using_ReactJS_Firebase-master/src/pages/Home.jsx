import React from 'react'
import Chat from '../components/Chat'
import Sidebar from "../components/Sidebar"

function Home() {
  return (
    <div 
    style={{backgroundColor :"#121212"}}
    className='h-screen w-screen flex justify-center items-center text-white font-semibold'
    >
      <div className="box border-2 border-cyan-600 h-3/4 w-3/4 rounded-2xl shadow-xl flex bg-blue-500">
            <Sidebar />
            <Chat />
        </div>
    </div>
  )
}

export default Home