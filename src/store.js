import { createStore } from 'redux';

let ACTIONS = {};

const INITIAL = {
	todos: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
