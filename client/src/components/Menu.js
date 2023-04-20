import React from 'react'
import MenuList from './MenuList'

function Menu({menuItems, user, handleOrders}) {

    return (
        <div>
            <h1>Menu</h1>
            <MenuList menuItems={menuItems} user={user} handleOrders={handleOrders}/>
        </div>
    );
}

export default Menu;