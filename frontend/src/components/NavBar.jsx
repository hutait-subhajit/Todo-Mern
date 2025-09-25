import React from 'react'
import '../style/Navbar.css'
import { Link } from 'react-router-dom'


const NavBar = () => {
    return (
        <nav className='navContainer'>
            <div className='navTitle'>To-Do</div>
            <ul className='navList'>
                <Link to='/'>
                    <li className='navListItem'>List</li>
                </Link>
                <Link to='/add'>
                    <li className='navListItem'>Add Task</li>
                </Link>
            </ul>
        </nav>
    )
}

export default NavBar