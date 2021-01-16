import React, { useState } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import {Link } from 'react-router-dom'

function HomeMenuBar() {
//   state = { activeItem: 'bio' }

// in order for the links and the menubar to always link up
const pathname = window.location.pathname;
const path = pathname === '/' ? 'home' : pathname.substr(1);

const [activeItem, setActiveItem] = useState(path)
//   handleItemClick = (e, { name }) => setState({ activeItem: name })
const handleItemClick = (e, { name }) => setActiveItem(name);


//   render() {
    return (
   
    <Grid>
    <Grid.Column width={4}>
      <Menu fluid vertical tabular size ="massive" color="green">
        <Menu.Item
         name='about'
            active={activeItem === 'about'}
            onClick={handleItemClick}
            as ={Link}
            to="/about"
        />
        <Menu.Item
         name='creator'
            active={activeItem === 'creator'}
            onClick={handleItemClick}
            as ={Link}
            to="/creator"
        />
        <Menu.Item
          name='fun'
                active={activeItem === 'fun'}
                onClick={handleItemClick}
                as ={Link}
                to="/fun"
        />
       
      </Menu>
    </Grid.Column>

    <Grid.Column stretched width={12}>

    </Grid.Column>
  </Grid>

    )
  
}

export default HomeMenuBar

