import { Component, createRef } from 'react'
import { Link } from 'react-router-dom'
import { landingService } from '../services/landingService'

export class LandingEditPage extends Component {
   state = {
      landing: null
   }

   inputRef = createRef()

   async componentDidMount() {
      const landingId = this.props.match.params.id
      const landing = landingId ? await landingService.getLandingById(landingId) : landingService.getEmptyLanding()
      this.setState({ landing }, () => this.inputRef.current.focus())
   }

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      this.setState(prevState => ({ landing: { ...prevState.landing, [field]: value } }))
   }

   onSaveLanding = async ev => {
      ev.preventDefault()
      await landingService.saveLanding({ ...this.state.landing })
      this.props.history.push('/landing')
   }

   render() {
      const { landing } = this.state
      if (!landing) return <div>Loading...</div>
      return (
         <div className="landing-edit">
            {landing._id ? <h1>Edit current landing</h1> : <h1>Add landing</h1>}

            <form onSubmit={this.onSaveLanding}>
               <label htmlFor="name">Name</label>
               <input ref={this.inputRef} onChange={this.handleChange} value={landing.name} type="text" name="name" id="name" />

               <label htmlFor="phone">Phone</label>
               <input onChange={this.handleChange} value={landing.phone} type="phone" name="phone" id="phone" />

               <label htmlFor="email">Email</label>
               <input onChange={this.handleChange} value={landing.email} type="email" name="email" id="email" />

               <button className="btn-grad">Save</button>
            </form>
            <Link className="btn-grad" to={`/landing`}>
               Back
            </Link>
         </div>
      )
   }
}
