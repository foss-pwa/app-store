/* eslint-disable toplevel/no-toplevel-side-effect */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <div><App></App></div>,
  document.getElementById('app'),
);
module.hot.accept();
