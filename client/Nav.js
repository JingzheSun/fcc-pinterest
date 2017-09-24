import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export default class Nav extends React.Component{

	logout(){
		axios.get('/logout').then(res => console.log('res'+res)).catch(err => console.log('err'+err));
	}

	render(){
		let s = this.props.info;
		const User = () =>(
			<ul className="nav navbar-nav navbar-right">
				<li className="dropdown" id='menu'>
					<a href="#" className="dropdown-toggle" data-toggle="dropdown">
						<span>{'Hello ' + s.user.username}</span>
					</a>
					<ul className="dropdown-menu">
			            <li><NavLink to='/collections'>My Collections</NavLink></li>
			            <li><NavLink to='/my'>My Pins</NavLink></li>
			            <li className="divider"></li>
			            <li><a href='/logout'>Logout</a></li>
			        </ul>
		        </li>
		    </ul>
		)

		const Guest = () =>(
			<ul className="nav navbar-nav navbar-right">
				<li><NavLink to={{pathname:'/login', state: {modal: true}}}>Login</NavLink></li>
			</ul>
		)

		return(
			<nav className="navbar navbar-inverse" role="navigation">
			    <div className="container-fluid">
				    <div className="navbar-header">
				        <NavLink to="/" className="navbar-brand">Pinterest</NavLink>
				    </div>
				    <div>
				        {s.login?<User/>:<Guest/>}
				    </div>
			    </div>
			</nav>
		)
	}
}
