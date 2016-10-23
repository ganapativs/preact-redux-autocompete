import { h, Component } from 'preact';

export default class Footer extends Component {
	shouldComponentUpdate({ searchQuery }) {
		return searchQuery !== this.props.searchQuery;
	}

	render({ searchQuery }) {
        if(!searchQuery)
            return (
                <div class="footer animated fadeInUp">
                    <a href="http://meetguns.com" class="hidden-xs" target="_blank">
                        <button class="bttn-stretch bttn-sm">
                            meetguns.com
                        </button>
                    </a>
                    <a href="https://twitter.com/ganapativs" target="_blank">
                        <button class="bttn-stretch bttn-sm">
                            @ganapativs
                        </button>
                    </a>
                    <a href="https://github.com/ganapativs/preact-redux-autocompete" target="_blank">
                        <button class="bttn-stretch bttn-sm">
                            Github Repo
                        </button>
                    </a>
                    <a href="https://ganapativs.github.io/bttn.css/" class="hidden-xs" target="_blank">
                        <button class="bttn-stretch bttn-sm">
                            bttn.css
                        </button>
                    </a>
                </div>
            );
        else
            return null;
	}
}
