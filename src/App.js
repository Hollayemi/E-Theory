import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/HomePage/Home';
import Login from './Pages/AuthPage/Login/Login';
import SignUp from './Pages/AuthPage/SignUp/SignUp';
import Dashboard from './Pages/Dasboard'

export const server = "http://localhost:3020"

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <SignUp />
          </Route>
          <Route exact path='/dashboard/user/lecturer'>
            <Dashboard />
          </Route> 
          <Route exact path='/dashboard/user'>
            <Dashboard />
          </Route>
          <Route path='/404'>
            <NotFound />
          </Route>
          <Redirect to ="/404" >
            <NotFound />
          </Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
