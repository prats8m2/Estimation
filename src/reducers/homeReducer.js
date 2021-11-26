import {SAVE_NUMBER_PLAYER} from '../constants'

const initialState = {
    numberOfPlayer: ''
};


const home = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_NUMBER_PLAYER:
          console.log(action.payload)
        return {
            ...state,
            numberOfPlayer: action.payload
        }
      default:
        return state
    }
  }
  
  export default home;
  