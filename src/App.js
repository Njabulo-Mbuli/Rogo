import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Layout from './Containers/Layout/Layout';
import Home from './Containers/Home/Home';
import NewGame from './Containers/NewGame/NewGame';

import './App.css';

class App extends React.Component {

  render(){
    return (
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/#/NewGame" component={NewGame}/>
          </Switch>
        </BrowserRouter>
      </Layout>
    );
  }
}

export default App;
