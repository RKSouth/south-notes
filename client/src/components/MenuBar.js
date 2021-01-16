import React, { useState } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import {Link } from 'react-router-dom'

function MenuBar() {
//   state = { activeItem: 'bio' }
const [activeItem, setActiveItem] = useState('')


//   handleItemClick = (e, { name }) => setState({ activeItem: name })
const handleItemClick = (e, { name }) => setActiveItem(name);


//   render() {
    return (
    // const { activeItem } = state

    // return (
        <Menu text>
        <Menu.Item header>Rachael-Book</Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as ={Link}
          to="/"
        />
        <Menu.Menu position="right">
        <Menu.Item
       name='login'
       active={activeItem === 'login'}
       onClick={handleItemClick}
       as ={Link}
       to="/login"
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as ={Link}
          to="/register"
        />
        </Menu.Menu>
      </Menu>


    )
  
}

export default MenuBar

