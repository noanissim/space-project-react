import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LandingFilter } from '../cmps/LandingFilter'
import { LandingList } from '../cmps/LandingList'

import spaceGif from '../assets/img/space.gif'

import { connect } from 'react-redux'
import { loadLandings, removeLanding, setFilterBy } from '../store/actions/landingActions'
import { spendBalance, loadUser } from '../store/actions/userActions'

class _LandingPage extends Component {
   async componentDidMount() {
      await this.props.loadLandings()
   }

   changeFilter = filterBy => {
      this.props.setFilterBy(filterBy)
      this.props.loadLandings()
   }

   onSpendBalance = () => {
      this.props.spendBalance(5)
   }

   render() {
      const { landings } = this.props
      if (!landings)
         return (
            <div>
               {' '}
               <img src={spaceGif} alt="spaceGif" />
            </div>
         )
      return (
         <div className="landing-page container">
            <LandingFilter changeFilter={this.changeFilter} />

            <LandingList landings={landings} />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      landings: state.landingModule.landings,
      loggedInUser: state.userModule.loggedInUser
   }
}

const mapDispatchToProps = {
   loadLandings,
   removeLanding,
   setFilterBy,
   spendBalance,
   loadUser
}

export const LandingPage = connect(mapStateToProps, mapDispatchToProps)(_LandingPage)
