import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

import 'react-select/dist/react-select.css';

render(<Root />, document.getElementById('app-root'));
