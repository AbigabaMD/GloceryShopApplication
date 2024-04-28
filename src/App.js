import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faArrowRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  groceries =[
  
  { id: 1, name: 'Biscuits', price: 3000, image: 'biscuit.jpg' },
  { id: 2, name: 'Nutella', price: 11300, image: 'nutella.jpg' },
  { id: 3, name: 'Apples', price: 1000, image: 'apple.jpg' },
  { id: 4, name: 'Butter', price: 30000, image: 'butter.jpg' },
  { id: 5, name: 'Carrots', price: 1500, image: 'carrot.jpg' },
  { id: 6, name: 'Salted Chips', price: 7000, image: 'chips.jpg' },
  { id: 7, name: 'Cinnamon', price: 8000, image: 'cinnamon.jpg' },
  { id: 8, name: 'Corn', price: 2300, image: 'corn.jpg' },
  { id: 9, name: 'Garlic', price: 600, image: 'garlic.jpg' },
  { id: 10, name: 'Nutmeg', price: 10000, image: 'nutmeg.jpg' },
  { id: 11, name: 'Nuts', price: 8000, image: 'nuts.jpg' },
  { id: 12, name: 'Oats', price: 25000, image: 'oats.jpg' },
  

]

function App() {

  const [cart, setCart]=useState([]);


  const addToCart=(item)=>{
   const existingItemIndex= cart.findIndex((cartItem)=>cartItem.id === item.id);

   if(existingItemIndex !== -1) {
    const updatedCart = [...cart];
    updatedCart[existingItemIndex]={ ...updatedCart[existingItemIndex], quantity: updatedCart[existingItemIndex].quantity + 1};
    setCart(updatedCart);
   }
   else {
    setCart([ ...cart, { ...item, quantity: 1}]);
   }
  }


  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => 
    item.id === id && item.quantity > 1
  ? { ...item, quantity: item.quantity - 1}: item
   
  );

  setCart(updatedCart);
  };
const removeFromCart =(id) => {
  const updatedCart = cart.filter((item) => item.id !== id);
  setCart(updatedCart);
};
const increaseQuantity =(id) => {
  const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } :item));

  setCart(updatedCart);
}
 
  const handleMakeOrder = () => {
    toast.success('Your order has been placed successfully!');
  }
 
  const Cart = () => {
    return (
      <div style={{ marginTop: '20px', fontFamily: 'sans-serif', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'chocolate', borderRadius: '5px', border: '1px solid #ccc' }}>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty!</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                <img style={{ width: '100px', height: '100px', borderRadius: '10px', marginBottom: '10px' }} src={item.image} alt={item.name} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', '@media (min-width: 768px)': { flexDirection: 'column', alignItems: 'center' } }}>
                  <h3>{item.name} - UGX {item.price}</h3>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ margin: '5px' }}>
                      <button style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                      <button style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '10px 10px', marginLeft: '10px' }} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <button style={{ backgroundColor: 'green', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '10px 20px', marginRight: '10px' }} onClick={handleMakeOrder}>Make Order</button>
          <ToastContainer />
          <Link style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer', marginRight: '10px', marginLeft: '10px' }} to='/'>Continue Shopping</Link>
          <div style={{ cursor: 'pointer', marginLeft: '10px' }}>Checkout <FontAwesomeIcon icon={faArrowRight} /></div>
        </div>



      </div>
    );
  };

  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', paddingTop: '120px' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'Chocolate',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            justifyContent: 'space-between',
            marginBottom: '35px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '0 20px',
            zIndex: 999,
          }}
        >
          <h1 style={{ color: 'white' }}>Glocery Shop UG</h1>

          <Link to="/cart">
            <button
              style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              View <FontAwesomeIcon icon={faShoppingCart} /> ({cart.length})
            </button>
          </Link>

        
         
        </header>
    <style>
    {`
          @media (max-width: 768px) {

            header {
            flex-direction:column;
          align-items:center;
         
         
      }

          h1 {
            margin-bottom:10px;
      }
      button{
        margin-bottom:15px;
      }
    }
    `}
    </style>

      <Routes>
      <Route path='/'
      element={
     

      <div style={{
          display: 'grid',
          gap: '20px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: 'white',
          borderBottom: '1px solid #ccc',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(3, 1fr)', 
          },
      }} >

      {groceries.map((item) => (
        <div key={item.id} style={{
          borderRadius: '5px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
          padding: '10px',
          textAlign: 'center',
          boxSizing: 'border-box',
          width: '100%', 

}} >
        <img style={{width:'100px',height:'100px', borderRadius:'10px',marginBottom:'10px', }} src={item.image} alt={item.name}/>
        <h3 style={{marginBottom:'5px'}}>{item.name}</h3>
        <p>UGX {item.price}</p>
        <button
        style ={{
              backgroundColor:'chocolate',
          color:'white',
          border: 'none',
          padding:'5px 10px',
          borderRadius:'3px',
          cursor:'pointer',
        }}
         onClick={() => addToCart(item)}>
         Add to Cart
         </button>
        </div>
      ))}
        </div> }/>
        <Route 
        path='/cart'
        element={<Cart/>}/></Routes></div></Router>
     
  );
}

export default App;
