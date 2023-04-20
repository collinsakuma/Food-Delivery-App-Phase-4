import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Header from "./Header"
import NewOrder from "./NewOrder";
import Profile from './Profile';
import Menu from "./Menu";
import Homepage from "./Homepage";
import EditProfile from "./EditProfile";

function App() {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const MenuAPI ='/items';

  const [menuItems, setMenuItems] = useState([]);

  const [orderList, setOrderList] = useState([]);

  const handleOrders = (new_order) => {
    return setOrderList([...orderList, new_order])
  }
  console.log(orderList)

  const clearCart = () => {
    setOrderList([])
  }


  useEffect(()=> {
    fetch(MenuAPI)
    .then(res => res.json())
    .then(setMenuItems);
  }, []);

  
  
  
  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"})
      .then((r) => {
        if (r.ok) {
          setUser(null)
        }
      })
  }
  
  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <div className = 'app container'>
    <div className="App">
      <Header />
      <Navbar handleLogout={handleLogout} />
      <h1></h1>
      <div>
        <Switch>
          <Route exact path='/'>
            <div className='row'>
              <Homepage />
            </div>
          </Route>
          <Route path='/neworder'>
            <div className='row'>
              <NewOrder orders={userOrders} orderList={orderList} clearCart={clearCart} user={user}/>
            </div>
          </Route>
          <Route exact path='/menu'> 
            <div className='row'>
              <Menu menuItems={menuItems} user={user} handleOrders={handleOrders}/>
            </div>
          </Route>
          <Route exact path='/profile'>
            <div className='row'>
              <Profile user={user}/>
            </div>
          </Route>
          <Route exact path="/profile/edit_profile">
            <div className="row">
              <EditProfile user={user} handleLogout={handleLogout}/>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
    </div>
  );
}

export default App;
