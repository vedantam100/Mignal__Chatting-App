import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'

function Sidebar() {
  return (
      <div className="bg-gray-600 border-r-2 border-red-400 rounded-2xl w-1/3 h-full" >
        <Navbar />
        <Searchbar/>
        <Chats/>
      </div>
  )
}

export default Sidebar