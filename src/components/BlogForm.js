import { useState } from 'react'

const BlogForm = ({ addBlog }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	return (
		<div>
			<b>Create New </b><br />
			<form onSubmit={(event) => {
				event.preventDefault()
				addBlog(title, author, url)
				setTitle('')
				setAuthor('')
				setUrl('')}}>

				<div>
					title:
					<input
						type="text"
						value={title}
						name="Title"
						className='title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={author}
						name="Author"
						className='author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={url}
						name="Url"
						className='url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit" className="create">create</button>
			</form>
		</div>
	)
}

export default BlogForm