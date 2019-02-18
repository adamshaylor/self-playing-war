import getSuits from './get-suits';
import getRanks from './get-ranks';

const createDeck = () => {
  return getSuits().reduce((accumulator, suit) => {
    return accumulator.concat(getRanks().map(rank => ({ suit, rank })));
  }, []);
};

export default createDeck;
