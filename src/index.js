import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import WebFont from 'webfontloader';
import store from './store';
import App from './components/app';
import 'animate.css';
import './style';

// Load google fonts
WebFont.load({
    google: {
      families: ['Titillium+Web:300,400,600']
    }
});

render((
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
), document.body);
