import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Routes from './Routes.js';


class App extends Component {
   render() {
      return (
            <Routes />
      )
   }
}
export default App
AppRegistry.registerComponent('App', () => App)