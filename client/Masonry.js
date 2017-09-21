import React from 'react';
import {Link} from 'react-router-dom';
import Bricks from 'bricks.js';

export default class Masonry extends React.Component{

	componentDidUpdate() {
		instance.update();
		setTimeout(() => {
			instance.pack();
		}, 20);
	}

	componentWillUnmount() {
	    instance.resize(false)
	}

	render(){
		let images = this.props.info.images;
		return(
		<div className="container" id="container">
	      	{images.map((v, i) => (
	      		<div key={i} style={styles.base}>
		      		<Link to={{pathname:'/img/'+v._id, state: {modal: true}}}>
		      			<img src={v.url} style={styles.img} />
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
  	padding: 0
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
$(document).ready(function(){
	instance = Bricks({
	  	container: '#container',
	  	packed: 'data-packed',
	  	sizes: sizes
	})
  	instance
    	.resize(true)     // bind resize handler
    	.pack()           // pack initial items

})