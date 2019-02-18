import createDeck from './lib/create-deck';
import shuffleArray from './lib/shuffle-array';
import { queryGameResolution, queryBattleResolution } from './queries';

const initialDeck = shuffleArray(createDeck());
const splitPoint = initialDeck.length / 2;
const initialState = {
  playerOneStack: initialDeck.slice(0, splitPoint),
  playerOnePlayed: [],
  playerTwoStack: initialDeck.slice(splitPoint),
  playerTwoPlayed: []
};

const actionHandlers = {};

actionHandlers.STEP = (state, action) => {
  if (queryGameResolution(state).gameOver) {
    return state;
  }

  const { winner } = queryBattleResolution(state);

  if (winner === 1) {
    return {
      ...state,
      playerOneStack: state.playerTwoPlayed.concat(state.playerOnePlayed, state.playerOneStack),
      playerOnePlayed: [],
      playerTwoPlayed: []
    };
  }

  if (winner === 2) {
    return {
      ...state,
      playerOnePlayed: [],
      playerTwoStack: state.playerOnePlayed.concat(state.playerTwoPlayed, state.playerTwoStack),
      playerTwoPlayed: []
    };
  }

  return {
    playerOneStack: state.playerOneStack.slice(0, -2),
    playerOnePlayed: state.playerOnePlayed.concat(state.playerOneStack.slice(-2)),
    playerTwoStack: state.playerTwoStack.slice(0, -2),
    playerTwoPlayed: state.playerTwoPlayed.concat(state.playerTwoStack.slice(-2))
  };
};

actionHandlers.RESET = (state, action) => {
  const newDeck = shuffleArray(createDeck());
  const splitPoint = newDeck.length / 2;
  return {
    playerOneStack: newDeck.slice(0, splitPoint),
    playerOnePlayed: [],
    playerTwoStack: newDeck.slice(splitPoint),
    playerTwoPlayed: []
  };
};

const defaultActionHandler = state => state;

const game = (state = initialState, action) => {
  const actionHandler = actionHandlers[action.type] || defaultActionHandler;
  return actionHandler(state, action);
}

export default game;
