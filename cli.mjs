import store from './store/index';
import { step } from './store/actions';
import { queryGameResolution } from './store/queries';

const logState = state => {
  const formatNumber = number => {
    const string = String(number);
    return string.length === 1 ? ' ' + string : string;
  };

  const formatCard = card => {
    if (!card) {
      return '   ';
    }
    const { suit, rank } = card;
    return rank.length === 1 ? suit + rank + ' ' : suit + rank;
  }

  const {
    playerOneStack,
    playerOnePlayed,
    playerTwoStack,
    playerTwoPlayed
  } = state;

  const row = [
    '(1)',
    `[${ formatNumber(playerOneStack.length) }]`,
    `[${ formatNumber(playerOnePlayed.length) }]`,
    formatCard(playerOnePlayed.slice(-1)[0]),
    formatCard(playerTwoPlayed.slice(-1)[0]),
    `[${ formatNumber(playerTwoPlayed.length) }]`,
    `[${ formatNumber(playerTwoStack.length) }]`,
    '(2)'
  ];

  console.log(row.join(' '));
};

logState(store.getState());
while(!queryGameResolution(store.getState()).gameOver) {
  store.dispatch(step());
  logState(store.getState());
}

const { winner } = queryGameResolution(store.getState());
if (typeof winner === 'number') {
  console.log(`GAME OVER: PLAYER ${ winner } WINS`);
}
else {
  console.log(`GAME OVER: TIE`);
}
