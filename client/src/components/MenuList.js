import React from 'react'
import MenuCard from './MenuCard'

function MenuList({menuItems, user}) {
    return (
        <div>
            {menuItems.map(menuItem => <MenuCard key={menuItem.id} menuItem={menuItem} user={user}/> )}
        </div>
    )
}

export default MenuList