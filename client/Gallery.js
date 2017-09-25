import React from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav.js';
import Masonry from './Masonry.js';
import Login from './Login.js';

export default class Gallery extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			login: false,
			user: {username: 'GUEST'},
			images: [],
			add: false
		}
		this.previousLocation = this.props.location
		axios.post('/',{}).then(res =>{
			let d = res.data
			this.setState({images:d.images, login: d.login, user: d.user})
		}).catch(err => console.log(err))

		this.like = this.like.bind(this);
		this.thumb = this.thumb.bind(this);
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

  	like(match, tf, e) {
		e.stopPropagation();
		if (tf){
			this.setState(prev => {
				prev.user.collections.push(match.params.id);
				return {prev}
			})
		} else {
			this.setState(prev => {
				let i = prev.user.collections.indexOf(match.params.id);
				prev.user.collections.splice(i, 1);
				return {prev}
			})
		}
		axios.post('/collections', {user: this.state.user})
			.then(res => console.log('Liked')).catch(err => console.log(err));
	}

	thumb(match, e) {
	    e.stopPropagation();
		this.setState(prev => {
			prev.images.find((ele)=>(match.params.id==ele._id)).Like += 1;
			return {prev}
		})
		axios.post('/thumb',{imageId: match.params.id})
			.then(res => console.log('thumb up!')).catch(err => console.log(err));
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
			<Nav location={this.props.location} info={this.state}/>
			<div className="container text-center">
				{this.state.login &&
					<Link to={{pathname:`${this.props.location.pathname}/add`, state: {modal: true}}}>
						<button id='add'>UPLOAD IMAGE</button>
					</Link>
				}
			</div>
			<Switch location={isModal ? this.previousLocation : location}>
				<Redirect exact from="/" to='/main' />
				<GalleryRoute path="/main" info={this.state} component={Masonry}/>
				<GalleryRoute path="/collections" info={this.state} component={Masonry}/>
		    	<GalleryRoute path="/my" info={this.state} component={Masonry}/>
	    	</Switch>
	    	<Switch>
	  		  	<Route path="/:whatever/add" component={Add} />
		    	<Route path="/:whatever/login" component={Login} />
		    	{
		    		this.state.images.length ?
		    		<Route path="/:position/img/:id" render={props => (
			    		<Image {...props} like={this.like} thumb={this.thumb} data={this.state} />
			    	)} />:
			    	<Redirect from="/:position/img" to='/' />
		    	}
	    	</Switch>
	    </div>
		)
	}
}

const GalleryRoute = (route) => (
	<Route path={route.path} render={props => (
	    <route.component {...props} info={route.info}/>
	)}/>
)

const Add = ({history, location}) => {
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

const Image = ({match, history, data, like, thumb}) => {

	const findById = (ele) => (
		ele._id == match.params.id
	)
	let image = data.images.find(findById);

	const back = (e) => {
	    e.stopPropagation();
	    history.goBack();
	}
	const stop = (e) => {
	    e.stopPropagation();
	}
	
	return(
		<div style={styles.dark} onClick={back}>
			<div style={styles.canvas}>
				<img src={image.url} onError={e => {e.target.src='notfound.jpg'}} style={styles.img} />
				<div style={styles.op}>
					<span className='pull-left'>
						{
							data.login &&
							(data.user.collections.includes(match.params.id) ?
							<i onClick={like.bind(this, match, false)} className="fa fa-heart" aria-hidden="true"></i> :
							<i onClick={like.bind(this, match, true)} className="fa fa-heart-o" aria-hidden="true"></i>)
						}
						<i onClick={thumb.bind(this, match)} className="fa fa-thumbs-up" aria-hidden="true"></i>
						{image.Like}
					</span>
					<span className='pull-right'>{'Uploader: ' + image.creatorName}</span>
				</div>
			</div>
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
	background: 'rgba(0, 0, 0, 0.35)',
	textAlign: 'center',
	color: 'white',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'flex'
}

styles.modal = {
	position: 'absolute',
	background: 'rgba(80, 80, 80, 0.5)',
	top: '25%',
	left: '10%',
	right: '10%',
	padding: 15,
	border: '1px solid black',
	borderRadius: '1em'
}

styles.canvas = {
	maxHeight: Math.round(window.innerHeight*0.7),
	maxWidth: Math.round(window.innerWidth*0.7),
	display: 'inline-block',
	background: 'rgba(180, 180, 150, 0.3)',
	padding: '5px',
	border: '1px solid black',
	borderRadius: '0.5em'
}

styles.img = {
	maxHeight: Math.round(window.innerHeight*0.6),
	maxWidth: '100%',
	margin: 'auto',
	border: 'none',
	borderRadius: '0.5em'
}

styles.op = {
	background: 'rgba(0, 0, 0, 0)',
	margin: '5px',
	padding: 0,
	fontSize: '20px'
}