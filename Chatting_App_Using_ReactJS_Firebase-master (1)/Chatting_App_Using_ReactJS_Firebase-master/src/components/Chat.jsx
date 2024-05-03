import React ,{useContext} from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../Context/ChatContext';

function Chat() {
  const {data}=useContext(ChatContext)
  return (
    <div className='bg-blue-300 rounded-2xl w-2/3 h-full relative'>
      <div className="nav flex items-center justify-between p-4 bg-gray-600 rounded-xl">
        {/* User Information */}
        <div className="flex items-center">
          <div className="img">
            <img
            src= {data.user?.photoURL}
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
          </div>
          <div className="user ml-2">
            <h1 className="text-white text-xl"><strong>{data.user?.name}</strong></h1>
          </div>
        </div>

        <div className="icons flex">
          <div className="icon ">
          <img className='size-12 p-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nO2Zv0rEQBCHP0EOLG2EO2zsfQBb69jIPYXVNf5phbO4V/AVbL32BMvzBXyA9BYXkROUlYFRckG9hHh7u+t8ENiEzO78MrPJ7gQMwzAMw1jgCJgAz4DzeBQ6bsYfcOXZ+Z+OYdtISCdz4BTo4hcZ70zHd20ic6cdiIh1cq5+SJo1YRM4kcZMO/AdiSo99UP8qcMGcAw8qt1XfoaAq+nLAXBfmV9RCdkHbkv35bEJ2QWugbdS+l0CW7EI2QZGwItef1VBO9/ZhCikAwyAJz1/B26AvV9sghSSl9pjnRvLbIIU4oApcNjAJkghff1OELuQJpiQVeIsItgcWQkutdTqp/L6dcBDCh/EPJUlSieVRWMyy/hlG6sito1VclvdWsWHZMpBE21ItW+dXLQt0GXawVyrffJkfNJTEfJGcm2L2cNKvkVZxP4k07AWMf9WMAzDMIx/zQc6q1c06XLfNwAAAABJRU5ErkJggg==" alt='img1'/>
          </div>
          <div className="icon ">
          <img className='size-12 p-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACd0lEQVR4nO2WTYiNURjHfxpcck2T1ISVJfKRGoPsLMjCkKKs2RA2s7eRhciYOxtsZKNsJLFgw8p3DUMjiRgroZl8zBXj6tH/1Jkz57zve827sLj/eur0Pl//5znPc+6FFlpo4T9FBTgE3AO+Ah+BO8A+YG6G3xzgCPAA+AZ8Am7Lz2IWwhJgEGgk5BWwOeH3JMdvS5HKB+UwDPQA84FOYD/wWroJ4Cgww6v8qXTvgF3y6wD2Ai+l+w0c9/ym4LCX3JxDVIGzCmR2F4CZartLviDiN1uEJ2R3EZgVseO+DKzyLPTojs32MvBIZ6s8C9uAMdlejZH4IqW1Lw+bNKD+PRfx6wI+ex2chNEmAm31uuAk1v4QGz0C50LlXSl25ATZA/yQ7SXgoc67c/y2e6TNry00OCDli8QQdqhtruLzCnLQW7WFie3q84a3FkuOhuKxR2In0A4sUpIR6az6XiZPuevCG2AAeKYZsbn6IN0vbUwmOpU89aC8BdZG/BZ7Q5wSW8NjWt0oKkC/mGYFqalq3++K9ONq9zpgnqQbOAPUZXM9dgVtwLUmgtwUCUt+w3uIVmZ0d7V3jSdC5cl/CGKETnukQz/XtdC/ri4vdR9XqbWxICkSdfm459WIUIAAuuaGiv6LgYwgKbggTrqaINCt78/dh+GMICm4IE6qQdKUoJfWzt9dsPEgSBFUp0GgXecxSsCQgtnGFL2C9fo+VAaBmrcRRQk4n1NlEFihTahrO/IIrNFTbmu4nJLgNmIkQiJM/l629tCVhopexoY60a97rko2qO3uJ/xW6i8Z0yRhc+Aeppj8VOWlJ/exTElswt3PsZ1t4Kbc+R9iqg4lZ/8vuAAAAABJRU5ErkJggg==" alt='img1'/>
          </div>
          <div className="icon ">
          <img className='size-12 p-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6UlEQVR4nO3UPW4CMRDF8X+TpYKlDRyKj2MEkluGEAmiNMmSayz0iSy9wgUTKAfxftJUM35YXmwwMzMzMzMzs1sxAJ6BLXBSvQFroLmVjCnwCfwG9QFMsmcMqsVfwAwYquZAp97+nxNJkfGigW+gPdNvq5BVsIkUGe9qlhOILDRT/qtpM45qlk8YGWmmD/opMvorAtoLm0iRsVWzXKjIUjOboJ8iY61mF1yyMfCjmafgB1JkNHqfy8BBF2qkWlaLd8BDsIksGUyqkHNVFj9Gi5Nl0Oh93ugFKfWqzxieQNIMMzMzMzMzuzt/PIC5/t3dQ80AAAAASUVORK5CYII=" alt='img1'/>
          </div>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  );
}

export default Chat;
