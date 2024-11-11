import { useState } from 'react'
import './App.css'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './components/Firebase/firebase.utils'

function App() {
  const [stateUser, setStateUser] = useState(null)
  console.log(stateUser);

  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()
  const gitHubProvider = new GithubAuthProvider()


  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setStateUser(user)

      })
      .catch(err => console.log(err)
      )
  }


  const handleGithubLogin =() =>{
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setStateUser(user)

      })
      .catch(err => console.log(err)
      )
  }

  const handleSignOut =() =>{
      signOut(auth)
      .then(res => {
        console.log(res);
        setStateUser(null)
        
      })
      .catch(err => console.log(err)
      )
  }

  return (
    <>

      <h1>Vite + React</h1>

      <button onClick={handleGoogleLogin}>Google Login</button>
      <button onClick={handleGithubLogin}>Github Login</button>
      <button onClick={handleSignOut}>Sign Out</button>

      {
        stateUser &&
        <>
          <h1>Name: {stateUser.displayName}</h1>
          <h3>Email: {stateUser.email}</h3>
          <img src={stateUser.photoURL} alt="" />
        </>
      }


    </>
  )
}

export default App
