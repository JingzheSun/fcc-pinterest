import React from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav.js';
import Masonry from './Masonry.js';

export default class Gallery extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			login: false,
			myName: 'DiabloHAHAHA',
			images: [],
			add: false
		}
		this.previousLocation = this.props.location
		axios.post('/',{}).then(res =>{
			this.setState({images: res.data})
		}).catch(err => console.log(err))

		this.confirm = this.confirm.bind(this);
	}

	confirm(event){
		if(event.key == "Enter"){
			let v = event.target.value.toLowerCase();
			if (v == "naotan" || v == "zgz"){
				this.setState({add: true});
			}else{
				event.target.value = '';
			}
		}
	}

	componentWillUpdate(nextProps) {
    const { location } = this.props
	    // set previousLocation if props.location is not modal
	    if (
	      	nextProps.history.action !== 'POP' &&
	      	(!location.state || !location.state.modal)
	    ) {
	      	this.previousLocation = this.props.location
	    }
  	}

	render(){
		const { location } = this.props;
		const isModal = !!(
	    	location.state &&
	    	location.state.modal &&
	    	this.previousLocation !== location // not initial render
	    )
		return(
		<div>
			<Nav login={this.state.login}/>
			<div className="container text-center">
				{this.state.add ?
					<Link to={{pathname:'/add', state: {modal: true}}}>
						<button className="btn btn-primary">Add</button>
					</Link> :
					<input className="form-control" onKeyDown={this.confirm}
					placeholder="Enter passcode to upload images" />
				}
			</div>
			<Switch location={isModal ? this.previousLocation : location}>
				<GalleryRoute path="/" info={this.state} component={Masonry}/>
				<GalleryRoute path="/collections" info={this.state} component={Masonry}/>
		    	<GalleryRoute path="/my" info={this.state} component={Masonry}/>
		    	<Redirect to={{pathname:'/'}}/>
	    	</Switch>
	    	{isModal && <Route path="/img/:id" render={props => (
	    		<Image {...props} data={this.state.images} />
	    	)} />}
	    	{isModal && <Route path="/add" component={Add} />}
	    </div>
		)
	}
}

const GalleryRoute = (route) => (
	<Route path={route.path} render={props => (
	    <route.component {...props} info={route.info}/>
	)}/>
)

const Add = ({match, history}) => {
	const back = (e) => {
	    e.stopPropagation();
	    history.goBack();
	}
	const stop = (e) => {
	    e.stopPropagation();
	}
	return(
		<div style={styles.dark} onClick={back}>
			<form method="POST" action="/add" style={styles.modal} onClick={stop}>
				<input name="title" placeholder="title" type="text" className="form-control"/>
				<input name="url" placeholder="url" type="text" className="form-control"/>
				<input type="submit" value="Post Image" className="btn btn-success"/>
			</form>
		</div>
	)
}

const Image = ({match, history, data}) => {
	const back = (e) => {
	    e.stopPropagation();
	    history.goBack();
	}
	const stop = (e) => {
	    e.stopPropagation();
	}
	const findById = (ele) => (
		ele._id == match.params.id
	)
	return(
		<div style={styles.dark} onClick={back}>
			<img src={data.find(findById).url} style={styles.img} />
		</div>
	)
}

const styles = {}

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
	background: 'rgba(80, 80, 80, 0.7)',
	top: '25%',
	left: '10%',
	right: '10%',
	padding: 15,
	border: '1px solid black',
	borderRadius: '1em'
}

styles.img = {
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	maxHeight: window.innerHeight,
	maxWidth: window.innerWidth,
	background: 'rgba(80, 80, 80, 0.7)',
	margin: 'auto',
	padding: 15,
	border: '1px solid black',
	borderRadius: '0.5em'
}