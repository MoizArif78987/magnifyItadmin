import {Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
