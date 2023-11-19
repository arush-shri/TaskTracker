import './App.css';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Loginsignup from './components/signup-signin/Loginsignup';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import UserProfile from './components/User/UserProfile';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/"
            element={<Home/>}/>
          <Route path="/About"
            element={<About/>}/>
          <Route path="/Todo"
            element={<TodoList/>}/>
          <Route path="/Loginsignup"
            element={<Loginsignup/>}/>
            <Route path="/UserProfile"
            element={<UserProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
