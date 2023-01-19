const Notification = ({ message }) => {
	if (message === null) {
	  return null
	}
  
	return (
	  <div className="error" style={{color: "blue", backgroundColor: "grey", padding: "2px", size: "40px", textAlign:"center"}}>
		{message}
	  </div>
	)
  }
  
  export default Notification