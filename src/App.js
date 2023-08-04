import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/';
    });
  }

  return (
      <div>
        <Router>
          <nav className="navbar navbar-expand-lg justify-content-center navbar-light bg-dark text-center py-4">
            <Link to='/' className="nav-link text-white mx-2">Home</Link>

            {isAuth === false ? <Link to='/login' className="nav-link text-white mx-2"> Login</Link> :
              <>
              <Link to='/create-post' className="nav-link text-white mx-2">Create Post</Link>
                <button className="btn btn-primary" onClick={signUserOut}> Logout</button>
              </>
            }

          </nav>

          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
