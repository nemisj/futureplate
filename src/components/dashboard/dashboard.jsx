import styles from './dashboard.css';
import icon from './dashboard.svg';

import React from 'react';


export default class Dashboard extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        This is a dashboard. <br />
        Path to icon is: {icon}
        <div className={styles.icon} />
      </div>
    );
  }
}

