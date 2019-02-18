import createRandomInteger from './create-random-integer';

const shuffleArray = array => {
  const { shuffled } = array.reduce(accumulator => {
    const { shuffled, unshuffled } = accumulator;
    const randomUnshuffledIndex = createRandomInteger(0, unshuffled.length - 1);
    const randomElement = unshuffled[randomUnshuffledIndex];
    shuffled.push(randomElement);
    unshuffled.splice(randomUnshuffledIndex, 1);
    return accumulator;
  }, {
    shuffled: [],
    unshuffled: [...array]
  });

  return shuffled;
};

export default shuffleArray;
