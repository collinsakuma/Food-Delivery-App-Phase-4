import React from 'react'
import MenuList from './MenuList'

function Menu({menuItems, user}) {

    return (
        <div>
            <h1>Menu</h1>
            <MenuList menuItems={menuItems} user={user}/>
        </div>
    );
}

export default Menu;