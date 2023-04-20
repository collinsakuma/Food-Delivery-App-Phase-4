import React from 'react'

function HomeCard({item}){

    return (
        <div className='Homecard'>
        
        <h2>{item.name}</h2>
        <img src={item.img_url}/>
        <h3>Category: {item.category}</h3>
        <h3>$ {item.price/100}</h3>
        </div>
    )


}

export default HomeCard;