import React from "react";
import {useState, useEffect} from 'react';
import HomeCard from './HomeCard'
function Homepage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('/items');
            const data = await response.json();

            const firstFourItems = data.slice(0, 4);
            setItems(firstFourItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className='Homepage'>
        <h1>Welcome to The Flat-Cake Factory!</h1>
        <h2>Featured Items</h2>

        <br></br>
        {items.map(item => <HomeCard key={item.id} item={item}/> )}

        </div>
    )
}

export default Homepage;