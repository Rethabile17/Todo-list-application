import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      console.log("Logging out...")
    } else {
      navigate('/login');
    }
  };

  const handleregistration = () =>{
    navigate('./registration')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={handleregistration}
          value={loggedIn ? 'Sign out' : 'Sign Up'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : null}  
      </div>
    </div>
  )
}

export default Home;