import PropTypes from 'prop-types'

const Blog = ({ title, author, likes, id, handleLike, handleDelete }) => (
	<div id={id}>
    TITLE: {title} AUTHOR: {author} LIKES: {likes} <button onClick={handleLike}>LIKE</button> <button onClick={handleDelete}>DELETE</button>
	</div>
)

Blog.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	likes: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
}

export default Blog