import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup'

// import { useAuthState } from "react-firebase-hooks/auth"; // Import the useAuth hook
// import { auth } from './firebaseConfig';




function App() {
  // const [user] = useAuthState(auth); // Get the current user state from Firebase

  

  return (
   
    <Router>
      <Routes>
        
        {/* <Route path="/" element={user?<Dashboard/>:<Navigate to="/login"/>}/> */}
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </Router>
   )
  
}

export default App
