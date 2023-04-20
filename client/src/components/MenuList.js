import React from 'react'
import MenuCard from './MenuCard'

function MenuList({menuItems, user, handleOrders}) {
    return (
        <div>
            {menuItems.map(menuItem => <MenuCard key={menuItem.id} menuItem={menuItem} user={user} handleOrders={handleOrders}/> )}
        </div>
    )
}

export default MenuList