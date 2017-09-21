import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import Gallery from './Gallery.js';

const App = () => (
	<BrowserRouter>
		<Route component={Gallery}/>
	</BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'));