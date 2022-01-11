import { TextField, Button } from '@mui/material'
import React, { Component } from 'react'
import { userService } from '../services/userService'

import bitcoin from '../assets/img/bitcoin.png'

export class SignupPage extends Component {
   state = {
      user: null
   }

   componentDidMount() {
      this.loadUser()
   }

   loadUser() {
      const user = userService.getEmptyUser()
      this.setState({ user }, () => console.log('signup page', user))
   }

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
   }

   onSaveUser = async ev => {
      ev.preventDefault()
      userService.signup(this.state.user.name)
      console.log(this.props)
      this.props.history.push('/')
   }

   render() {
      const { user } = this.state
      if (!user) return <div>Loading...</div>
      return (
         <div className="signup-page">
            <h1>Signup here!</h1>
            <form>
               {/* <img src="./img/bitcoin.png" alt="" /> */}
               <img src={bitcoin} alt="bitcoin" />
               <label htmlFor="name">Enter your name</label>
               <TextField id="outlined-name" label="Name" value={user.name} onChange={this.handleChange} type="text" name="name" />
               <Button onClick={this.onSaveUser} variant="contained">
                  Sign up
               </Button>
            </form>
         </div>
      )
   }
}
