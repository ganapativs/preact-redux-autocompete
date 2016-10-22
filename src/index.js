import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import WebFont from 'webfontloader';
import store from './store';
import App from './components/app';
import countries from './countries.js';
import 'animate.css';
import './style';

// Load google fonts
WebFont.load({
    google: {
      families: ['Titillium+Web:300,400,600']
    },
    active: () => document.body.style.opacity = 1,
});
    
// Prefetch country flags
let isOpera = navigator.userAgent.indexOf("Opera") >= 0;
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
for (var country in countries) {
    if (countries.hasOwnProperty(country)) {
        let link = document.createElement('link');
        link.as = 'image';
        link.rel = isChrome || isOpera ? 'preload' : 'prefetch';
        link.crossOrigin = "anonymous";
        link.href = '/assets/countries/' + country.toLowerCase() + '.png';
        let s = document.head || document.getElementsByTagName('head')[0];
        s.appendChild(link);
    }
}

render((
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
), document.body);
