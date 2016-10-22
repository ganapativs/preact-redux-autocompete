import countries from './countries.js';

export function searchCountry(searchQuery) {
    let filteredCountries = [];
    for (var country in countries) {
        if (countries.hasOwnProperty(country) && searchQuery.length) {
            if(countries[country].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) {
                filteredCountries.push({[country]: countries[country]});
            }
        }
    }
    
    /**
    Ideally you would make a server call here and get suggestions.
    You can use redux-thunk or similar package to dispatch async actions.
    */
	return {
		type: 'SEARCH_COUNTRIES',
		filteredCountries: filteredCountries.slice(0, 8)
	};
}