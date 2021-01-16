import React, { useState } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

function MenuBar() {
//   state = { activeItem: 'bio' }
const [activeItem, setActiveItem] = useState('')


//   handleItemClick = (e, { name }) => setState({ activeItem: name })
const handleItemClick = (e, { name }) => setActiveItem(name);


//   render() {
    return (
    // const { activeItem } = state

    // return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
            />
            {/* <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={handleItemClick}
            /> */}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            This is an stretched grid column. This segment will always match the
            tab height
          </Segment>
        </Grid.Column>
      </Grid>
    )
  
}

export default MenuBar