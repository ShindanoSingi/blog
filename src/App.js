import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
      <di>
        <Router>
          <nav className="navbar navbar-expand-lg justify-content-center navbar-light bg-dark text-center py-4">
            <Link className="nav-link text-white mx-2">Home</Link>
            <Link className="nav-link text-white mx-2">Create Post</Link>
            <Link className="nav-link text-white mx-2">Login</Link>
          </nav>

          <div className="container mt-5">

          </div>
        </Router>
      </di>
  );
}

export default App;
