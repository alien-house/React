
import React, { Component } from 'react';
import { 
  NavLink,
} from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

export default class DBNav extends Component {

  render() {
    const url = this.props.url
    return (
      <div className="dashboard-nav">
        <ul>
          <li><NavLink activeClassName="active" exact to={`${url}`}><FontAwesome name='tachometer' />Dashboard</NavLink></li>
          <li><NavLink activeClassName="active" to={`${url}/messages`}><FontAwesome name='paper-plane-o' />Messages</NavLink></li>
          <li><NavLink activeClassName="active" to={`${url}/resume`}><FontAwesome name='file-text-o' />Resume</NavLink></li>
          <li><NavLink activeClassName="active" to={`${url}/projects`}><FontAwesome name='folder-open-o' />Projects</NavLink></li>
          <li><NavLink activeClassName="active" to={`${url}/tasks`}><FontAwesome name='list' />Tasks</NavLink></li>
          <li><NavLink activeClassName="active" to={`${url}/setting`}><FontAwesome name='cog' />Setting</NavLink></li>
        </ul>
      </div>
    );
  }
}
