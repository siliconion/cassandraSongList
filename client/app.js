import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/MyComponent';
import SampleTagListContainer from './components/SampleTagListContainer.jsx';

// Import compiled SASS
require('./sass/app.sass');

// ReactDOM.render(<MyComponent title="Welcome to my app!" />, window.document.getElementById('app'));
ReactDOM.render(<SampleTagListContainer />, window.document.getElementById('app'));
