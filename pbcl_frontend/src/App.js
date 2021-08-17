import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Fragment } from 'react';
import Home from './routes/home/Home.js';
import Pastes from './routes/pastes/Pastes.js';
import Route404 from './routes/route404/Route404';
import Paste from './components/Paste/Paste';
import Create from './routes/create/Create';

function App() {
  return (
    <Router>
      <Fragment>
        <ul className="header">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pastes">Pastes</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pastes">
            <Pastes />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route exact path="/paste/:id">
            <Paste />
          </Route>
          <Route>
            <Route404 />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
