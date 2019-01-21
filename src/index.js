import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faIndustry, faSync, faEdit, faBan, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faIndustry, faSync, faEdit, faBan, faPlus)
ReactDOM.render(<App />, document.getElementById('root'));
