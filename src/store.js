import { createStore } from 'redux';

let ACTIONS = {
	SEARCH_COUNTRIES: ({ countries, ...state }, { filteredCountries }) => ({
		countries: filteredCountries,
		...state
	})
}

const INITIAL = {
	countries: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
