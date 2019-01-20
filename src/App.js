import React, { Component } from 'react';
import './App.css';
import Tree from './components/Tree';
import {Helmet} from "react-helmet";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Factory Tree</title>
          <link rel="icon" type="image/png" href="factory.png" sizes="16x16" />
        </Helmet>
        <Tree />
      </div>
    );
  }
}

export default App;
