import { combineReducers } from 'redux'
import home from "./homeReducer";
import player from "./playerReducer";
import score from "./scoreReducer";

export default combineReducers({
    home,
    player,
    score
})
