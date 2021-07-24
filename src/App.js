import './App.css';
import {Switch, Route} from 'react-router-dom';
import Main from './views/page1';
import Update from './views/page2';
import Create from './views/page2';
import User from './views/page3';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path='/create' component={Create}/>
      <Route path='/update/:id' component={Update}/>
      <Route path='/user/:id' component={User}/>
      <Route path='/' component={Main}/>
    </Switch>
    </div>
  );
}

export default App;
