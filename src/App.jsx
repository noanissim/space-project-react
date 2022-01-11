// import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/scss/global.scss'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
// import { StatisticPage } from './pages/StatisticPage'
import { LandingDetailsPage } from './pages/LandingDetailsPage'
import { LandingEditPage } from './pages/LandingEditPage'
import { SignupPage } from './pages/SignupPage'

export function App() {
   // const PrivateRoute = props => {
   //    // return props.isAdmin ? <Route component={props.component} path={props.path} /> : <Redirect to='/' />
   //    return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
   // }

   return (
      <Router>
         <div className="App">
            <AppHeader />
            <main>
               <Switch>
                  <Route component={LandingEditPage} path="/landing/edit/:id?" />
                  <Route component={LandingDetailsPage} path="/landing/:id" />
                  <Route component={LandingPage} path="/landing" />
                  <Route component={SignupPage} path="/signup" />
                  {/* <Route component={StatisticPage} path="/statistic" /> */}
                  {/* <PrivateRoute isAdmin={true} component={StatisticPage} path="/statistic" /> */}
                  <Route component={HomePage} exact path="/" />
               </Switch>
            </main>
         </div>
      </Router>
   )
}
