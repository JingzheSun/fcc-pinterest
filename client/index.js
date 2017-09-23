import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';
import Gallery from './Gallery.js';

const App = () => (
	<HashRouter>
		<Route component={Gallery}/>
	</HashRouter>
)

ReactDOM.render(<App />, document.getElementById('root'));