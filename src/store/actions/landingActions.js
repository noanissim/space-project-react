import { landingService } from '../../services/landingService'

export function loadLandings() {
   return async (dispatch, getState) => {
      const { filterBy } = getState().landingModule
      try {
         const landings = await landingService.getLandingsAsync(filterBy)
         dispatch({ type: 'SET_LANDINGS', landings })
      } catch (err) {
         console.log(err)
      }
   }
}

export function removeLanding(landingId) {
   return async dispatch => {
      try {
         await landingService.deleteLanding(landingId)
         dispatch({ type: 'REMOVE_LANDING', landingId })
      } catch (err) {
         console.log(err)
      }
   }
}

export function setFilterBy(filterBy) {
   return async dispatch => {
      dispatch({ type: 'SET_FILTER_BY', filterBy })
   }
}

export function getLandingById(landingId) {
   return async () => {
      return await landingService.getLandingById(landingId)
   }
}
