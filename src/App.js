import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";

function App() {
  return (
      <div>
        <Router>
          <nav className="navbar navbar-expand-lg justify-content-center navbar-light bg-dark text-center py-4">
            <Link to='/' className="nav-link text-white mx-2">Home</Link>
            <Link to='/create-post' className="nav-link text-white mx-2">Create Post</Link>
            <Link to='/login' className="nav-link text-white mx-2">Login</Link>
          </nav>

          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
