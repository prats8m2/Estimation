/* eslint-disable eqeqeq */
import { CALL, FINAL, NEXT, MAX } from "../constants";
import arrayRotate from "../helpers";

const initialState = {
  round: 1,
  call: [],
  final: [],
  total: [],
  lastRound: [],
  maxHands: 0,
  graphData: [],
};

const score = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CALL:
      if (state.call[action.payload.idx] != undefined) {
        return {
          ...state,
          call: state.call.map((call, idx) =>
            idx === action.payload.idx ? parseInt(action.payload.call) : call
          ),
        };
      } else {
        return {
          ...state,
          call: [...state.call, parseInt(action.payload.call)],
        };
      }

    case FINAL:
      if (state.final[action.payload.idx] != undefined) {
        return {
          ...state,
          final: state.final.map((final, idx) =>
            idx === action.payload.idx ? parseInt(action.payload.final) : final
          ),
        };
      } else {
        return {
          ...state,
          final: [...state.final, parseInt(action.payload.final)],
        };
      }
    case NEXT: {
      // eslint-disable-next-line no-lone-blocks
      return {
        ...state,
        call: new Array(action.payload.numberOfPlayer).fill(""),
        final: new Array(action.payload.numberOfPlayer).fill(""),
        round: action.payload.newRound,
        total: arrayRotate(action.payload.newTotalScore),
        lastRound: arrayRotate(action.payload.roundScore),
        maxHands: 0,
        graphData: action.payload.graphData,
      };
    }

    case MAX: {
      // eslint-disable-next-line no-lone-blocks
      return {
        ...state,
        maxHands: action.payload,
      };
    }
    default:
      return state;
  }
};

export default score;
