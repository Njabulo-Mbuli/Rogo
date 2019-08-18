import React from 'react';
import logo from './logo.svg';
import Layout from '/Containers/Layout/Layout';
import './App.css';

class App extends React.Component {

  render(){
    return (
      <Layout>
        <Switch>
          <Route path="/" component={}/>
          <Route path="/#/NewGame" component={}/>
          <Route path="/#/ScoreBoard" component={}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
