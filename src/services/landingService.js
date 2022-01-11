import { storageService } from './storageService.js'
import axios from 'axios'
export const landingService = {
   getLandings,
   getLandingById,
   deleteLanding,
   saveLanding,
   getEmptyLanding,
   getLandingsAsync
   // loadLandings
}
const STORAGE_KEY = 'landings'

async function getLandingsAsync(filterBy = null) {
   const ans = storageService.load(STORAGE_KEY)
   console.log('ans :>>', ans)
   // if (ans) return Promise.resolve(ans)
   if (ans) {
      if (filterBy && filterBy.term) {
         console.log('filterBy :>>', filterBy)
         let landingsToReturn = filter(filterBy.term)
         return Promise.resolve(landingsToReturn)
      }
   }
   try {
      const res = await axios.get(`https://api.spacexdata.com/v3/launches`, { params: { limit: 20, offset: 0 } })
      console.log('res.data', res.data)
      res.data.forEach(landing => (landing._id = _makeId()))
      storageService.store(STORAGE_KEY, res.data)
      // return res.data
      return getLandings((filterBy = null))
   } catch (err) {
      console.log(err)
   }
}

function sort(arr) {
   return arr.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
         return -1
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
         return 1
      }

      return 0
   })
}

// function getLandings(filterBy = null) {
//    return new Promise((resolve, reject) => {
//       var landingsToReturn = landings
//       if (filterBy && (filterBy.name || filterBy.phone || filterBy.email)) {
//          landingsToReturn = filter(filterBy)
//       }
//       resolve(sort(landingsToReturn))
//    })
// }

function getLandings(filterBy = null) {
   return new Promise((resolve, reject) => {
      var landingsToReturn = storageService.load(STORAGE_KEY)
      if (filterBy && filterBy.term) {
         landingsToReturn = filter(filterBy.term)
      }
      // resolve(sort(landingsToReturn))
      resolve(landingsToReturn)
   })
}

function getLandingById(id) {
   let gLandings = storageService.load(STORAGE_KEY)
   return new Promise((resolve, reject) => {
      const landing = gLandings.find(landing => landing._id === id)
      landing ? resolve(landing) : reject(`Landing id ${id} not found!`)
   })
}

function deleteLanding(id) {
   let gLandings = storageService.load(STORAGE_KEY)
   return new Promise((resolve, reject) => {
      const index = gLandings.findIndex(landing => landing._id === id)
      if (index !== -1) {
         gLandings.splice(index, 1)
      }
      // if (!gLandings.length) gLandings = gDefaultLandings.slice()
      storageService.store(STORAGE_KEY, gLandings)
      resolve(gLandings)
   })
}

function _updateLanding(landing) {
   let gLandings = storageService.load(STORAGE_KEY)
   return new Promise((resolve, reject) => {
      const index = gLandings.findIndex(c => landing._id === c._id)
      if (index !== -1) {
         gLandings[index] = landing
      }
      storageService.store(STORAGE_KEY, gLandings)
      resolve(landing)
   })
}

function _addLanding(landing) {
   let gLandings = storageService.load(STORAGE_KEY)
   return new Promise((resolve, reject) => {
      landing._id = _makeId()
      gLandings.push(landing)
      storageService.store(STORAGE_KEY, gLandings)
      resolve(landing)
   })
}

function saveLanding(landing) {
   return landing._id ? _updateLanding(landing) : _addLanding(landing)
}

function getEmptyLanding() {
   return {
      name: '',
      email: '',
      phone: ''
   }
}

// function filter(filterBy) {
//    const name = filterBy.name.toLocaleLowerCase()
//    const phone = filterBy.phone
//    const email = filterBy.email.toLocaleLowerCase()
//    return landings.filter(landing => {
//       return landing.name.toLocaleLowerCase().includes(name) && landing.phone.includes(phone) && landing.email.toLocaleLowerCase().includes(email)
//    })
// }
function filter(term) {
   console.log('term', term)
   let gLandings = storageService.load(STORAGE_KEY)
   term = term.toLocaleLowerCase()
   return gLandings.filter(landing => {
      return landing['mission_name'].toLowerCase().includes(term) || landing?.details?.toLowerCase().includes(term)
   })
}

function _makeId(length = 10) {
   var txt = ''
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
   }
   return txt
}
