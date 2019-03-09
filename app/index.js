import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import App from './routes';
import configureStore from './store';

import './stylesheets/base.scss';
import 'typeface-roboto';

const store = configureStore();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#388e3c',
      // light: green[300],
      // dark: green[700],
    },
    secondary: {
      main: '#fdd835',
      // light: yellow[300],
      // dark: yellow[800],
    },
  },
});

const renderApp = () =>
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );

renderApp();
