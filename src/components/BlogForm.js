import { useState } from 'react'

const BlogForm = ({ addBlog }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	return (
		<div>
			<b>Create New </b><br />
			<form onSubmit={() => {
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
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm