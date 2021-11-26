import { CALL, FINAL, TOTAL, NEXT , MAX} from '../constants'
import arrayRotate from '../helpers';

const initialState = {
    round: 1,
    call: [],
    final: [],
    total: [],
    lastRound: [],
    maxHands: 0
};


const score = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case CALL:
            if (state.call[action.payload.idx]!= undefined) {
                return {
                    ...state,
                    call: state.call.map(
                        (call, idx) => idx === action.payload.idx ? parseInt(action.payload.call)
                            : call
                    )
                }
            }
            else {
                return {
                    ...state,
                    call: [...state.call, parseInt(action.payload.call)]
                }
            }
            break;

        case FINAL:
            if (state.final[action.payload.idx] != undefined) {
                return {
                    ...state,
                    final: state.final.map(
                        (final, idx) => idx === action.payload.idx ? parseInt(action.payload.final)
                            : final
                    )
                }
            }
            else {
                return {
                    ...state,
                    final: [...state.final, parseInt(action.payload.final)]
                }
            }
            break;


        case NEXT:{
            return {
                ...state,
                call: new Array(action.payload.numberOfPlayer).fill(''),
                final: new Array(action.payload.numberOfPlayer).fill(''),
                round: action.payload.newRound,
                total: arrayRotate(action.payload.newTotalScore),
                lastRound: arrayRotate(action.payload.roundScore),
                maxHands: 0
            }
        }
        break;

        case MAX:{
            return {
                ...state,
                maxHands: action.payload
            }
        }
        break;
        default:
            return state
    }
}

export default score;
