import React from 'react';
import {Link} from 'react-router-dom';
import Bricks from 'bricks.js';


export default class Masonry extends React.Component{

	componentDidUpdate() {
		instance.pack();
		setTimeout(()=>{
			instance.pack();	
		}, 30)
		setTimeout(()=>{
			instance.pack();	
		}, 300)
		setTimeout(()=>{
			instance.pack();	
		}, 1000)
	}

	componentDidMount() {
		createInstance();
	}

	componentWillUnmount() {
		instance.resize(false);
	}

	render(){
		let {match} = this.props;
		let state = this.props.info;
		let images = state.images;
		if (state.login && match.url == '/my'){
			images = images.filter(image=>(image.creatorName == state.user.username))
		}else if (state.login && match.url == '/collections'){
			images = images.filter(image=> state.user.collections.includes(image._id))
		}
		return(
		<div className="container" id="container">
	      	{images.map((v, i) => (
	      		<div key={i} style={styles.base}>
		      		<Link to={{pathname:`${match.url}/img/${v._id}`, state: {modal: true}}}>
		      			<img src={v.url} onError={e => {e.target.src='notfound.jpg'}} style={styles.img} />
		      		</Link>
	      		</div>
	        ))}
	    </div>
		)
	}
}

var instance;
const styles = {};

styles.base = {
 	width: '236px',
  	display: 'block',
  	padding: '6px',
  	background: 'rgba(80,80,80,0.4)',
  	borderRadius: '0.3em'
}

styles.img = {
 	width: '224px',
  	margin: 0,
  	padding: 0,
  	borderRadius: '0.5em'
}


const sizes = [
	{ columns: 2, gutter: 25 },
	{ mq: '768px', columns: 3, gutter: 20 },
	{ mq: '1024px', columns: 4, gutter: 15 },
	{ mq: '1366px', columns: 5, gutter: 15 },
	{ mq: '1600px', columns: 6, gutter: 15 },
	{ mq: '1920px', columns: 7, gutter: 15 }
]

// start it up, when the DOM is ready
// note that if images are in the grid, you may need to wait for document.readyState === 'complete'
const createInstance =()=>{
	instance = Bricks({
	  	container: '#container',
	  	packed: 'data-packed',
	  	sizes: sizes
	})
  	instance
    	.resize(true)     // bind resize handler
    	.pack()           // pack initial items
}