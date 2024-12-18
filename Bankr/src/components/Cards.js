import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>We are BANKR</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/deposit.jpg'
              text='Grounded in protecting your Money and Privacy '
              
            />
            <CardItem
              src='images/withdraw.png'
              text='Withdrawal of money at your own convenience'
             
            />
            <CardItem
              src='images/transfer.png'
              text='Transfer money using the account number'
             
             
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;