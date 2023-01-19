const Blog = ({title, author, likes, id, handleLike, handleDelete}) => (
  <div id={id}>
    TITLE: {title} AUTHOR: {author} LIKES: {likes} <button onClick={handleLike}>LIKE</button> <button onClick={handleDelete}>DELETE</button>
  </div>  
)

export default Blog