/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { addUser } from './firebase';
import './createUser.css';

function CreateUser() {
  const [state, setState] = useState({
    name: "",
    email: "",
    accountno: "",
    balance: "",
    db: {},
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    state.db[state.accountno] = [state.name, state.email, state.accountno, state.balance]
    addUser(state.db[state.accountno])
    setState({...state, name: "", email: "", accountno: "", balance: ""})
  }

  return (
    
    <div class="container" css={CSS}>
    <div id='login-form'class='login-page'>
      <div class="form-box">
      <h1>Add Customer Details</h1>
    
      <form id="login" class="input-group-login" onSubmit={handleSubmit}>
      
          <label htmlFor="name" className="label">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            class="input-field"
            value={state.name}
            placeholder="Full Name"
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            name="email"
            class="input-field"
            value={state.email}
            placeholder="Email address"
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />

          <label htmlFor="account-no" className="label">
            Account Number
          </label>
          <input
            type="text"
            name="account-no"
            class="input-field"
            placeholder="Account Number"
            onChange={(e) => setState({ ...state, accountno: e.target.value })}
            />

          <label htmlFor="balance" className="label">
          Balance
        </label>
        <input
            type="text"
            name="balance"
            className="input-field"
            maxLength={7}
            value={`$${state.balance}`}
            placeholder="$0.00"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-dot characters
              setState({ ...state, balance: value });
            }}
        />
         <br/>
          <button type="submit" class='submit-btn'><b>
            Submit </b>
          </button>
        
      </form>
    </div>
    </div>
    </div>
  );
}
export default CreateUser;