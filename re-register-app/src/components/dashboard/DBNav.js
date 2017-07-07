
import React, { Component } from 'react';
import { 
  Link,
} from 'react-router-dom'

export default class DBNav extends Component {

  render() {
    console.log(this.props);
    const url = this.props.url
    return (
      <div>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to={`${url}/setting`}>Setting</Link></li>
        </ul>
      </div>
    );
  }
}
