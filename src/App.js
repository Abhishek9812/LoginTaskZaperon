import './App.css';
import StickyFooter from './components/Footer';
import Login from './components/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      <div>
        <StickyFooter />
      </div>
    </div>
  );
}

export default App;
