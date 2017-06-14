import React from 'react'
import ReactDOM from 'react-dom';
import BasicExample from './js/BasicExample';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const app = document.getElementById('app');

ReactDOM.render(
     <BasicExample />,
app);
