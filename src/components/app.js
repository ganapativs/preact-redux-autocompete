import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import CountrySuggestion from './country-suggestion';

@connect(reduce, bindActions(actions))
export default class App extends Component {
    componentWillMount = () => {
        this.setState({
            focusedItem: 0,
            searchQuery: '',
            selectedCountry: null,
            inputFocused: false
        });
        document.addEventListener('keydown', this._handleKey, false);
    }
    
    componentWillUnmount = () => {
        document.removeEventListener('keydown', this._handleKey, false);
    }
    
    // Navigate in suggestions using arrow keys and select using enter key
    _handleKey = (event) => {
        let {focusedItem} = this.state;
        let {countries} = this.props;
        // Up key
        if(event.keyCode === 38) {
            this.setState({
                focusedItem: focusedItem === 0 ? countries.length - 1 : focusedItem - 1
            });
        }
        else
        // Down
        if(event.keyCode === 40) {
            this.setState({
                focusedItem: focusedItem === countries.length - 1 ? 0 : focusedItem + 1
            });
        }
        else
        // Enter
        if(event.keyCode === 13) {
            this.onSelect(countries[focusedItem]);
        }
    }
    
	searchCountries = (e) => {
		let searchQuery = e.target.value;
        this.setState({ searchQuery, focusedItem: 0 });
		this.props.searchCountry(searchQuery);
        return false;
	}

    onClear = () => {
        this.setState({searchQuery: ''}); 
        this.props.searchCountry('');
    }
    
    onSelect = (country) => {
        this.setState({selectedCountry: country, searchQuery: ''});
        this.props.searchCountry('');
    }
    
	render({ countries }, { searchQuery, selectedCountry, focusedItem, inputFocused }) {
        let suggestionStyles = {
            height: searchQuery && searchQuery.length && countries.length && inputFocused ? 
                        countries.length * 50 + 60 : 
                            searchQuery && searchQuery.length && inputFocused ? 
                                110 : 0, 
            paddingTop: searchQuery && inputFocused ? 60 : 0,
            opacity: searchQuery && inputFocused ? 1 : 0
        };
		return (
			<div id="app" class="autocomplete-wrapper">
                <h2 class="title animated fadeInUp">
                    Fancy Preact Autocomplete 
                    <span class="blink">_</span>
                </h2>
                <div class="autocomplete-box animated slideInUp">
                    <form action="javascript:">
                        <input class={{"autocomplete-input animated fadeInUp": true, 
                                        "not-empty": searchQuery && searchQuery.length}}
                                value={searchQuery} 
                                onFocus={() => this.setState({inputFocused: true})}
                                onBlur={() => this.setState({inputFocused: false})}
                                onInput={this.searchCountries} 
                                placeholder="Search for countries" autoFocus />
                        {
                            searchQuery && searchQuery.length
                            ?
                                <span class="clear" onClick={this.onClear}>
                                    CLEAR
                                </span>
                            :
                                null
                        }
                    </form>
                    {
                        selectedCountry
                        ?
                            <div class="selected">
                                You have selected: <strong>{selectedCountry[Object.keys(selectedCountry)[0]]} ({Object.keys(selectedCountry)[0].toUpperCase()})</strong>
                            </div>
                        :
                            null
                    }
                    {/* We can move suggestions to separate component to make it more modular */}
                    <div class="autocomplete-suggestions" 
                         style={suggestionStyles}>
                        {
                            searchQuery && searchQuery.length && countries.length
                            ?
                                countries.map((country, i) => (
                                    <CountrySuggestion key={Object.keys(country)[0]} 
                                        onSelect={this.onSelect} 
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
                </div>
                <div class="footer animated fadeInUp">
                    <a href="http://meetguns.com" target="_blank">meetguns.com</a>
                    <a href="https://twitter.com/ganapativs" target="_blank">@ganapativs</a>
                    <a href="https://github.com/ganapativs/preact-redux-autocompete" target="_blank">Github Repo</a>
                </div>
			</div>
		);
	}
}
