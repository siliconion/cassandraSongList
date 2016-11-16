import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Import compiled SASS
require('./sass/app.sass');

ReactDOM.render(<App />, window.document.getElementById('app'));
