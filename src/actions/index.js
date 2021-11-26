import {
  SAVE_NUMBER_PLAYER,
  SAVE_NAME_PLAYER,
  CALL,
  FINAL,
  TOTAL,
  MAX,
  NEXT} from '../constants'


export function saveNumberOfPlayer(payload) {
    return { type: SAVE_NUMBER_PLAYER, payload }
  };


export function saveNameOfPlayer(payload) {
    return { type: SAVE_NAME_PLAYER, payload }
};

export function callPlayerHand(call, idx) {
  console.log(call)
  return { type: CALL, payload:{'call': call, 'idx': idx} }
};

export function finalPlayerHand(final, idx) {
  return { type: FINAL, payload:{'final': final, 'idx': idx} }
};

export function totalScore(payload) {
  return { type: TOTAL, payload }
};

export function nextRound(newRound,numberOfPlayer, roundScore, newTotalScore ) {
  return { type: NEXT, payload :{newRound,numberOfPlayer, roundScore, newTotalScore} }
};


export function setMaxHands(payload) {
  return { type: MAX, payload }
};