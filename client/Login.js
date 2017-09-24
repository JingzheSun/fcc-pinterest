import React from 'react';
import {Route, Link} from 'react-router-dom';

export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={show: false};
		this.back = this.back.bind(this);
		this.showPassword = this.showPassword.bind(this);
	}

	back(e) {
	    e.stopPropagation();
	    this.props.history.goBack();
	}
	stop(e) {
	    e.stopPropagation();
	}
	showPassword(){
		this.setState(prev => ({
			show: !prev.show
		}));
	}

	render(){
		let {match} = this.props;
		return(
			<div style={styles.dark} onClick={this.back}>
				<form method="POST" action="/login" style={styles.modal} onClick={this.stop}>
					<Link to='/'><i className="fa fa-times" aria-hidden="true" style={styles.off}></i></Link>
					<h3>Please Login or Register</h3>
					<Route path={`${match.url}/fail`} component={Fail} />
					<Route path={`${match.url}/registerfail`} component={Rfail} />
					<input name="username" placeholder="username" type="text" className="form-control" required/>
					<div style={{'width':'100%'}}>
						<input name="password" placeholder="password" type={this.state.show?'text':'password'} className="form-control" required/>
						{
							!this.state.show ?
							<i onClick={this.showPassword} className="fa fa-eye pull-right" style={styles.eye} aria-hidden="true"></i>
							:<i onClick={this.showPassword} className="fa fa-eye-slash pull-right" style={styles.eye} aria-hidden="true"></i>
						}
					</div>
					<input name="submit" type="submit" value="Login" className="btn btn-success"/>
					<input name="submit" type="submit" value="Register" className="btn btn-success"/>
				</form>
			</div>
		)
	}
}

const Fail = () => (<p style={styles.fail}>Wrong username or password</p>)
const Rfail = () => (<p style={styles.fail}>Username alredy exist</p>)

const styles = {}

styles.fail = {
	color: 'red'
}

styles.dark = {
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	background: 'rgba(0, 0, 0, 0.35)'
}

styles.modal = {
	position: 'absolute',
	color: 'white',
	background: 'rgba(80, 80, 80, 0.5)',
	top: '25%',
	left: '10%',
	right: '10%',
	padding: 15,
	border: '1px solid black',
	borderRadius: '1em'
}

styles.eye = {
	position: 'relative',
	top: '-38px',
	color: 'black'
}

styles.off = {
	position: 'absolute',
	color: 'white',
	top: 10,
	right: 10
}