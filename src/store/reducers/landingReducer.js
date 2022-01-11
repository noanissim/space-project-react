const INITIAL_STATE = {
   landings: null,
   filterBy: null
}

export function landingReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case 'SET_LANDINGS':
         return {
            ...state,
            landings: [...action.landings]
         }

      case 'ADD_LANDING':
         return {
            ...state,
            landings: [...state.landings, action.landing]
         }

      case 'REMOVE_LANDING':
         return {
            ...state,
            landings: state.landings.filter(landing => landing._id !== action.landingId)
         }

      case 'UPDATE_LANDING':
         return {
            ...state,
            landings: state.landings.map(landing => (landing._id === action.landing._id ? action.landing : landing))
         }
      case 'SET_FILTER_BY':
         return {
            ...state,
            filterBy: { ...action.filterBy }
         }

      default:
         return state
   }
}
