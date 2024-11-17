/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { transact, addTransaction, db } from "./firebase";
import { useHistory } from "react-router-dom";
import "./transfer.css";

function Transfer() {
  const [state, setState] = useState({
    receiver: "",
    sender: "",
    amount: "",
    accounts: [],
  });

  const history = useHistory();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setState({
        ...state,
        accounts: snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag1 = false;
    let flag2 = false;
    let id1, id2 = [0, 0];
    for (let i = 0; i < state.accounts.length - 1; i++) {
      if (state.receiver === state.sender) {
        alert("Payer's and Reciever's account numbers cannot be same!");
        setState({ ...state, receiver: "", sender: "", amount: "" });
        break;
      }
      if (state.accounts[i].data.accountno === state.sender) {
        flag1 = true;
        id1 = i;
        // console.log(state.to);
      }
      if (state.accounts[i].data.accountno === state.receiver) {
        flag2 = true;
        id2 = i;
        // console.log(state.from);
      }
    }
    if (!flag1) {
      alert("Check Reciever's account number!");
    } else if (!flag2) {
      alert("Check Payer's account number!");
    } else {
      // Go to firebase
      if (Number(state.accounts[id1].data.balance) < Number(state.amount)) {
        alert("Insufficient Balance");
        setState({ ...state, receiver: "", sender: "", amount: "" });
      } else {
        transact(
          state.accounts[id1].id,
          state.accounts[id1].data.balance,
          state.accounts[id2].id,
          state.accounts[id2].data.balance,
          state.amount
        );
        addTransaction(state.amount, state.receiver, state.sender);

        setState({ ...state, receiver: "", sender: "", amount: "" });
        history.replace("/transactions");
      }
    }
  };

  return (
    
    <div class="container" css={CSS}>
    <img src='/images/img-2.jpg' />
    <div id='login-form'class='login-page'>
      <div class="form-box">
      <h1>Transfer Money</h1>
      
       
    
      <form id="login" class="input-group-login" onSubmit={handleSubmit}>
      <label htmlFor="from" className="label">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            className="input-field"
            maxLength={7}
            value={`$${state.amount}`}
            placeholder="$0.00"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-dot characters
              setState({ ...state, amount: value });
            }}
        />

          <b><label htmlFor="sender" className="label">
            From
          </label></b>
          <input
            type="number"
            
            name="sender"
            class="input-field"
           
            value={state.sender}
            onChange={(e) => setState({ ...state, sender: e.target.value })}
          />
        
        
          <b><label htmlFor="receiver" className="label">
            To
          </label></b><br/>
          <input
            type="number"
            
            name="receiver"
            class="input-field"
            
            value={state.receiver}
            onChange={(e) => setState({ ...state, receiver: e.target.value })}
          />
        
        
          
          <button type="submit" class='submit-btn'><b>
            Transfer </b>
          </button>
        
      </form>
    </div>
    </div>
    </div>
  );
}

const CSS = css`

`;
  
export default Transfer;