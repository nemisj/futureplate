import './app.global.css';
import styles from './app.css';

import React from 'react';
import { Link } from 'react-router';


export default class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className="nav">
          Hi world!
          <Link to="/about">About</Link>
          <Link to="/">Dashboard</Link>
          <Link to="/list">Things</Link>
        </div>
        <div className="app">
          {this.props.children}
        </div>
      </div>
    );
  }
}

