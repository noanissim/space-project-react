import React, { Component } from 'react'
// import { userService } from '../services/userService'

export class HomePage extends Component {
   state = {
      user: null,
      btc: '',
      moves: []
   }

   render() {
      return (
         <div className="homepage-app">
            <h1>Welcome to the spaceX app!</h1>
         </div>
      )
   }
}
