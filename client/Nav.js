import React from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends React.Component{

	render(){
		let s = this.props;
		return(
			<nav className="navbar navbar-inverse" role="navigation">
			    <div className="container-fluid">
				    <div className="navbar-header">
				        <NavLink to="/" className="navbar-brand">Pinterest</NavLink>
				    </div>
				    <div>
				        <ul className="nav navbar-nav navbar-right">
				            <li><NavLink to='/collections'>My Collections</NavLink></li>
				            <li><NavLink to='/my'>My Pins</NavLink></li>
				            <li><NavLink to={'/' + s.login? 'logout' : 'login'}>{s.login? "Logout":"Login"}</NavLink></li>
				        </ul>
				    </div>
			    </div>
			</nav>
		)
	}
}