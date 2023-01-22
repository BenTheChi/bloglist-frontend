import { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [noticationMessage, setNotificationMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [currUser, setUser] = useState(null)
	const [blogsToShow, setBlogsToShow] = useState([])


	useEffect(() => {
		(async () => {
			let initialBlogs = await blogsService.getAll()
			setBlogs(initialBlogs)
		})()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogsService.setToken(user.token)

			const usersBlogs = blogs.filter( blog => {
				if(blog.user){
					if(blog.user.username === user.username){
						return true
					}
				}

				return false
			})

			usersBlogs.sort((a, b) => a.likes > b.likes ? -1 : 1)
			setBlogsToShow(usersBlogs)
		}
	}, [blogs])

	const addBlog = async (title, author, url) => {
		let newBlog = await blogsService.create({ title: title, author: author, url: url })
		const newBlogsToShow = [...blogsToShow, newBlog].sort((a, b) => a.likes > b.likes ? -1 : 1)
		setBlogsToShow(newBlogsToShow)
		setNotificationMessage('New blog added')
		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			setUser(user)
			setUsername('')
			setPassword('')
			blogsService.setToken(user.token)

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)

			const usersBlogs = blogs.filter( blog => {
				if(blog.user){
					if(blog.user.username === user.username){
						return true
					}
				}

				return false
			})

			usersBlogs.sort((a, b) => a.likes > b.likes ? -1 : 1)
			setBlogsToShow(usersBlogs)

			setNotificationMessage('Successfully logged in')
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)

		} catch (exception) {
			setNotificationMessage('Wrong credentials')
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}

	}

	const handleLogout = async () => {
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
		setNotificationMessage('Successfully logged out')
		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}

	const handleLike = (likedBlog) => {
		const newBlogsToShow = blogsToShow.map((blog) => {
			if(blog.id === likedBlog.id){
				let updatedBlog = likedBlog
				updatedBlog.likes++
				updatedBlog.user = currUser.id
				blogsService.update(likedBlog.id, updatedBlog)
				return updatedBlog
			}

			return blog
		})

		newBlogsToShow.sort((a, b) => a.likes > b.likes ? -1 : 1)
		setBlogsToShow(newBlogsToShow)
	}

	const handleDelete = (deleteBlog) => {
		if(!window.confirm(`Remove blog ${deleteBlog.title}?`))
			return false

		const newBlogsToShow = blogsToShow.filter((blog) => {
			if(blog.id === deleteBlog.id){
				blogsService.deleteBlog(deleteBlog.id)
				return false
			}

			return true
		})

		newBlogsToShow.sort((a, b) => a.likes > b.likes ? -1 : 1)
		setBlogsToShow(newBlogsToShow)
	}

	if(currUser === null){
		return(
			<div>
				<h1>Log In To Application</h1>
				<Notification message={noticationMessage} />
				<LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
			</div>
		)
	} else {
		return(
			<div>
				<h1>Blogs</h1>
				<Notification message={noticationMessage} />
				{currUser.username} logged in <br/><br/> <button onClick={handleLogout}>logout</button>
				<Togglable buttonLabel="New Blog" id='new-blog'>
					<BlogForm addBlog={addBlog}/>
				</Togglable>
				<ul>
					{blogsToShow.map((blog) =>
						<Blog key={blog.id} title={blog.title} author={blog.author} likes={blog.likes} url={blog.url} handleLike={() => {handleLike(blog)}} handleDelete={() => {handleDelete(blog)}}/>
					)}
				</ul>
			</div>
		)
	}
}

export default App