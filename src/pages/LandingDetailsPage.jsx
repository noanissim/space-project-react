import { Component } from 'react'
import { Link } from 'react-router-dom'
import { landingService } from '../services/landingService'
import { eventBusService } from '../services/eventBusService'
import { userService } from '../services/userService'
import { TextField, Button } from '@mui/material'
import spaceGif from '../assets/img/space.gif'

export class LandingDetailsPage extends Component {
   state = {
      landing: null,
      user: null,
      videoUrl: ''
   }

   componentDidMount() {
      this.loadLanding()
      // this.loadUser()
   }

   setVideoUrl = () => {
      const videoUrl = 'https://www.youtube.com/embed/' + this.state.landing.links.youtube_id
      this.setState({ videoUrl })
   }

   async loadLanding() {
      console.log('this.props.match :>>', this.props.match)
      const landing = await landingService.getLandingById(this.props.match.params.id)
      this.setState({ landing })
      this.setVideoUrl()
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.match.params.id !== this.props.match.params.id) {
         this.loadLanding()
      }
   }

   loadUser() {
      const user = userService.getUser()
      if (!user) this.props.history.push('/signup')
      this.setState({ user })
   }

   onGoBack = () => {
      this.props.history.push('/landing')
   }

   onRemoveLanding = async () => {
      const { landing } = this.state
      await landingService.deleteLanding(landing._id)
      eventBusService.emit('delete', landing._id)
      this.onGoBack()
   }

   render() {
      const { landing, videoUrl } = this.state
      if (!landing)
         return (
            <div>
               {' '}
               <img src={spaceGif} alt="spaceGif" />
            </div>
         )
      return (
         <div className="landing-details container">
            <img src={landing.links.mission_patch} alt="img" />
            <h2> Flight number: {landing.flight_number}</h2>
            <h2> Flight name: {landing.mission_name}</h2>
            <div className="info">
               <p>
                  {' '}
                  <span>Launch date:</span> {landing.launch_date_local || 'No information'}
               </p>
               <p>
                  <span>Details:</span> {landing.details || 'No information'}
               </p>
               <p>
                  <span>Failures:</span> {landing.launch_failure_details?.time || 'No information'}, <span> reason:</span> {landing.launch_failure_details?.reason || 'No information'}
               </p>
               <p>
                  <span>Wikipedia: </span>
                  <a href={landing.links.wikipedia} rel="noreferrer" target="_blank">
                     {landing.links.wikipedia}
                  </a>
               </p>

               <p>
                  <span>Youtube: </span>
                  <a href={landing.links.video_link} rel="noreferrer" target="_blank">
                     {landing.links.video_link}
                  </a>{' '}
               </p>
               <p>
                  <span>Article: </span>
                  <a href={landing.links.article_link} rel="noreferrer" target="_blank">
                     {landing.links.article_link}
                  </a>{' '}
               </p>
            </div>
            <iframe title="video" src={videoUrl}></iframe>

            <Button onClick={this.onGoBack} variant="contained">
               Back
            </Button>
         </div>
      )
   }
}
