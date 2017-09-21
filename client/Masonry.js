import React from 'react';
import {Link} from 'react-router-dom';
import MasonryLayout from 'react-masonry-layout';

export default class Masonry extends React.Component{

	render(){
		let images = this.props.info.images;
		return(
		<div className="container">
			<MasonryLayout id="items" sizes={sizes} infiniteScroll={()=>{}}>
		      	{images.map((v, i) => (
		      		<div key={i} style={styles.base}>
			      		<Link to={{pathname:'/img/'+v._id, state: {modal: true}}}>
			      			<img src={v.url} style={styles.img} />
			      		</Link>
		      		</div>
		        ))}
		    </MasonryLayout>
	    </div>
		)
	}
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

styles.base = {
 	width: '236px',
  	display: 'block',
  	padding: '10px',
  	background: 'rgba(80,80,80,0.5)'
}

styles.img = {
 	width: '216px',
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