import React from 'react'
import useStore from '../../Store'
import './Link.css'
function Link() {
    const link = useStore((state)=>state.link);
  return (
    <div className="Linker">
        <h1 >Link</h1>
        <a href={link}>Open your link</a>
    </div>
  )
}

export default Link