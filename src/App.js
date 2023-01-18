import { useState, useEffect } from 'react'
import blogsService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([]) 
	const [newBlog, setNewBlog] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('') 
	const [password, setPassword] = useState('') 
  
	useEffect(() => {
	  blogService
		.getAll().then(initialNotes => {
		  setNotes(initialNotes)
		})
	}, [])
  
	// ...
  
	const handleLogin = (event) => {
	  event.preventDefault()
	  console.log('logging in with', username, password)
	}
  
	return (
	  <div>
		<h1>Notes</h1>
  
		<Notification message={errorMessage} />
  
		<form onSubmit={handleLogin}>
		  <div>
			username
			  <input
			  type="text"
			  value={username}
			  name="Username"
			  onChange={({ target }) => setUsername(target.value)}
			/>
		  </div>
		  <div>
			password
			  <input
			  type="password"
			  value={password}
			  name="Password"
			  onChange={({ target }) => setPassword(target.value)}
			/>
		  </div>
		  <button type="submit">login</button>
		</form>
  
		// ...
	  </div>
	)
  }
  
  export default App