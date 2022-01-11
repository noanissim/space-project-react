import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { Component } from 'react'

export class LandingFilter extends Component {
   state = {
      // name: '',
      // phone: '',
      // email: '',
      term: '',
      sort: ''
   }

   handleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value : target.value
      this.setState({ [field]: value }, () => {
         this.props.changeFilter(this.state)
      })
   }

   handleChange2 = ev => {
      console.log('ev', ev.target.value)
      this.setState({ term: ev.target.value }, () => {
         this.props.changeFilter(this.state)
      })
   }

   onClear = () => {
      this.setState({ term: '' }, () => {
         this.props.changeFilter(this.state)
      })
   }

   render() {
      const { term, sort } = this.state
      return (
         <div className="landing-filter">
            <form>
               <section className="input-container">
                  {/* <label htmlFor="term">Filter by name / details:</label> */}
                  <TextField id="outlined-name" label="Filter by name / details" value={term} onChange={this.handleChange} type="text" name="term" id="term" />
                  {/* <input onChange={this.handleChange} value={term} type="text" name="term" id="term" /> */}
               </section>
            </form>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 160 }}>
               <InputLabel id="demo-simple-select-label">Sort by success</InputLabel>
               <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sort} label="sort" onChange={this.handleChange2}>
                  {/* <MenuItem value={''}></MenuItem>
                  <MenuItem value={''}>All</MenuItem> */}
                  <MenuItem value={'success'}>Success</MenuItem>
                  <MenuItem value={'failure'}>Fail</MenuItem>
               </Select>
            </FormControl>
            <Button onClick={this.onClear} variant="contained">
               Clear filter
            </Button>
         </div>
      )
   }
}
