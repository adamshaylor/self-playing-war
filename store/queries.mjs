import getRanks from './lib/get-ranks';

const ranks = getRanks();

export const queryGameResolution = state => {
  if (state.playerOneStack.length < 2 && state.playerTwoStack.length < 2) {
    return {
      gameOver: true,
      winner: null
    };
  }
  if (state.playerOneStack.length < 2) {
    return {
      gameOver: true,
      winner: 2
    };
  }
  if (state.playerTwoStack.length < 2) {
    return {
      gameOver: true,
      winner: 1
    };
  }
  return {
    gameOver: false,
    winner: null
  };
}

export const queryBattleResolution = state => {
  const [ playerOneBattleCard ] = state.playerOnePlayed.slice(-1);
  const [ playerTwoBattleCard ] = state.playerTwoPlayed.slice(-1);

  if (!playerOneBattleCard || !playerTwoBattleCard) {
    return {
      battleOver: true,
      winner: null
    };
  }

  if (ranks.indexOf(playerOneBattleCard.rank) > ranks.indexOf(playerTwoBattleCard.rank)) {
    return {
      battleOver: true,
      winner: 1
    };
  }

  if (ranks.indexOf(playerTwoBattleCard.rank) > ranks.indexOf(playerOneBattleCard.rank)) {
    return {
      battleOver: true,
      winner: 2
    };
  }

  return {
    battleOver: false,
    winner: null
  };
};
