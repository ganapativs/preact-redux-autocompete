import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import Suggestions from './suggestions';
import Footer from './footer';

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
    
    onFocus = () => {
        if(this.blurTimeout)
            clearTimeout(this.blurTimeout);
        this.blurTimeout = null;
        this.setState({inputFocused: true});
    }
    
    onBlur = () => {
        this.blurTimeout = setTimeout(() => {
            this.setState({inputFocused: false});
            this.blurTimeout = null;
        }, 100);
    }
    
	render({ countries }, { searchQuery, selectedCountry, focusedItem, inputFocused }) {
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
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
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
                    <Suggestions searchQuery={searchQuery} 
                                 focusedItem={focusedItem} 
                                 inputFocused={inputFocused} 
                                 countries={countries} 
                                 onSelect={this.onSelect} />
                </div>
                <Footer searchQuery={searchQuery} />
			</div>
		);
	}
}
