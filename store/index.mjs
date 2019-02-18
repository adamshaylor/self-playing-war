import { createStore } from 'redux/es/redux.mjs';
import game from './reducers';

const store = createStore(game);

export default store;
