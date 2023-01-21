import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ title, author, likes, url, handleLike, handleDelete }) => {
	const [detailsButton, setDetailsButton] = useState('SHOW')
	const [detailsStyle, setDetailsStyle] = useState({ display: 'none' })

	let blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		if(detailsButton === 'SHOW'){
			setDetailsButton('HIDE')
			setDetailsStyle({ display: '' })
		} else {
			setDetailsButton('SHOW')
			setDetailsStyle({ display: 'none' })
		}
	}

	return(
		<div style={blogStyle}>
			<button onClick={toggleVisibility}>{detailsButton}</button>
			<div>
			TITLE: {title} AUTHOR: {author} <button onClick={handleDelete}>DELETE</button>
			</div>
			<div style={detailsStyle}>
			URL: {url}
			LIKES: {likes} <button onClick={handleLike}>LIKE</button>
			</div>
		</div>
	)
}

Blog.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	likes: PropTypes.number.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
}

export default Blog