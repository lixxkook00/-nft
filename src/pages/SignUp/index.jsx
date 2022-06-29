import React, { useState,useRef } from 'react'
import {Link} from "react-router-dom"
import "./SignUp.scss"
import "../../components/Header/Header.scss"
import Validate from '../../components/Validate'
import { useEffect } from 'react'
import { connectWallet } from '../../utils/connectWallet'
import { signUpAccount } from '../../api/signup'


const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [refcode, setRefcode] = useState("")

  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmError, setConfirmError] = useState("")


  const [width, setWidth] = useState(window.innerWidth)

  const signUpRef = useRef(null)

  const checkUsername = () => {
      if(username.length === 0){
        setUsernameError("can not be empty!") 
        return false;
      }
      else if(username.length < 8 || username.length > 16){
        setUsernameError("must have 8 - 16 characters!")
        return false;
      }
      else {
        setUsernameError("")
        return true;
      }
  }

  const checkEmail = () => {
    if(email.length === 0){
        setEmailError("can not be empty!") 
        return false;
      }
    else {
      if(!String(email)
      .toLowerCase()
      .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      setEmailError("is invalid")
      return false;
      }
      else {
        setEmailError("")
        return true
      }
    }
    
  }
  
  

  const checkPassword = () => {
    if(password.length === 0) {
      setPasswordError("can not be empty!")
      return false;
    }
    else if(!String(password).match(/^[A-Za-z0-9 ]+$/)){
      setPasswordError("must not include special characters!")
      return false;
    }
    else {
      setPasswordError("")
      return true;
    }
  }

  const checkConfirm = () => {
    if (confirm.length === 0) {
      setConfirmError("can not be empty!")
      return false;
    }
    else if (confirm !== password){
      setConfirmError("must match to password");
      return false;
    }
    else {
      setConfirmError("");
      return true;
    }
  }

  const signup =async () => { 
    if(!window.ethereum) { 
        alert('You need install metamask !');
        window.open("https://metamask.io/");
    }
    else if (!window.ethereum.selectedAddress) { 
      alert("You need login Metamask first !!!");
      await connectWallet();
    }
    else {
      if( checkUsername()
      && checkEmail()
      && checkPassword()
      && checkConfirm() 
      ) { 
        const data = { 
          username: username,
          email: email,
          password: password,
          wallet: window.ethereum.selectedAddress
        }
        const status = await signUpAccount(data);
        if(status == true) { 
          alert('Signup Successfully !');
        }
        else { 
          alert('wrong !!!');
        }
      }
    }
  }



  useEffect(() => {
    window.addEventListener("resize", ()=>{
      const newWidth = signUpRef.current.clientWidth
      setWidth(newWidth)
    });
  }, []);
  return (
    <div className = "signup" ref = {signUpRef}>
        <div className="signup-container">
          {width >= 500 ? (<img src="/images/frame web.png" alt="" />) : (<img src="/images/frame mobile.png" alt="" />)}
            <div className="form-container">
                <div className="input-container">
                    <input type="text" value={username} placeholder='Enter your username' onChange={(e)=>setUsername(e.target.value)}/>
                    {usernameError ? <Validate field="Username" error = {usernameError}/> : null}
                </div>
                <div className="input-container">
                    <input type="email" value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
                    {emailError ? <Validate field="Email" error = {emailError}/> : null}
                    
                </div>
                <div className="input-container">
                    <input type="password" value={password} placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                    {passwordError ? <Validate field="Password" error = {passwordError}/> : null}

                </div>
                <div className="input-container">
                    <input type="password" value={confirm} placeholder='Confirm your password' onChange={(e)=>setConfirm(e.target.value)}/>
                    {confirmError ? <Validate field="Confirm password" error = {confirmError}/> : null}

                </div>
                <div className="input-container">
                    <input type="text"  placeholder={window.ethereum ? window.ethereum.selectedAddress || "Wallet address" : "You need login/install metamask first !" } disabled />
                </div>
            </div>
            <div className="btn-container">
              <button type="button" className='signup-btn' onClick = {()=>{
                checkUsername()
                checkEmail()
                checkPassword()
                checkConfirm()
                signup()
              }}>
                <img src="/images/button web.png" alt="" />
              </button>
            </div>
        </div>
        <div className="navigate">
          <Link className='navigate-btn' to = "/">Back to Home</Link>
        </div>
    </div>
  )
}

export default SignUp