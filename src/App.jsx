import './App.scss';
import Home from './pages/Home/home'
import About from './pages/About/about'
import PageNotFound from './pages/404/pageNotFound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
//test
export default App;
