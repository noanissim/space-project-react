import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { Component } from 'react'

export class LandingFilter extends Component {
   state = {
      // name: '',
      // phone: '',
      // email: '',
      term: ''
   }

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      this.setState({ [field]: value }, () => {
         this.props.changeFilter(this.state)
      })
   }

   render() {
      // const { name, phone, email, term } = this.state
      const { term } = this.state
      return (
         <form className="landing-filter">
            <section className="input-container">
               <label htmlFor="term">Filter by name / details:</label>
               <TextField id="outlined-name" label="Name" value={term} onChange={this.handleChange} type="text" name="term" id="term" />
               {/* <input onChange={this.handleChange} value={term} type="text" name="term" id="term" /> */}
            </section>

            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
               <InputLabel id="demo-simple-select-label">All</InputLabel>
               <Select labelId="demo-simple-select-label" id="demo-simple-select" value={term} label="All" onChange={this.handleChange}>
                  <MenuItem value={'all'}>All</MenuItem>
                  <MenuItem value={'success'}>Success</MenuItem>
                  <MenuItem value={'fail'}>Failure</MenuItem>
               </Select>
            </FormControl> */}
         </form>
      )
   }
}
