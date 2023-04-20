import React from 'react'
import MenuCard from './MenuCard'

function MenuList({menuItems, user, handleOrders, handleOrdersTotal}) {
    return (
        <div>
            {menuItems.map(menuItem => <MenuCard key={menuItem.id} menuItem={menuItem} user={user} handleOrders={handleOrders} handleOrdersTotal={handleOrdersTotal}/> )}
        </div>
    )
}

export default MenuList