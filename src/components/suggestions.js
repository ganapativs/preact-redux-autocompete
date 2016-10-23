import { h, Component } from 'preact';
import CountrySuggestion from './country-suggestion';

export default class Suggestions extends Component {
	shouldComponentUpdate({ searchQuery, focusedItem, inputFocused, countries, onSelect }) {
		return searchQuery !== this.props.searchQuery ||
            focusedItem !== this.props.focusedItem ||
            inputFocused !== this.props.inputFocused || 
            countries !== this.props.countries ||
            onSelect !== this.props.onSelect;
	}

	render({ searchQuery, focusedItem, inputFocused, countries, onSelect }) {
        let suggestionStyles = {
            height: searchQuery && searchQuery.length && countries.length && inputFocused ? 
                        countries.length * 50 + 60 : 
                            searchQuery && searchQuery.length && inputFocused ? 
                                110 : 0, 
            paddingTop: searchQuery && inputFocused ? 60 : 0,
            opacity: searchQuery && inputFocused ? 1 : 0
        };
        return (
            <div class="autocomplete-suggestions" 
                 style={suggestionStyles}>
                {
                    searchQuery && searchQuery.length && countries.length
                    ?
                        countries.map((country, i) => (
                            <CountrySuggestion key={Object.keys(country)[0]} 
                                onSelect={onSelect} 
                                focused={focusedItem === i}
                                country={country} />
                        )) 
                    :
                        searchQuery && searchQuery.length
                        ?
                            <div class="autocomplete-suggestion animated fadeInUp empty">
                                No country found with that name.
                            </div>
                        :
                            null
                }
            </div>
        )
	}
}
