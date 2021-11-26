import {SAVE_NAME_PLAYER,NEXT} from '../constants'
import arrayRotate from '../helpers';

const initialState = {
    nameOfPlayers: []
};


const player = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case SAVE_NAME_PLAYER:
        return {
            ...state,
            nameOfPlayers: [...state.nameOfPlayers, action.payload]
        }
        case NEXT:{
            return {
                ...state,
                nameOfPlayers: arrayRotate(state.nameOfPlayers)
            }   
        } 
      default:
        return state
    }
  }
  
  export default player;
  