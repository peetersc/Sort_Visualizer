import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import {About} from './About';
import {Contact} from './Contact';
import {NoMatch} from './NoMatch';
import Layout from './components/Layout';
import {Jumbotron} from './components/Jumbotron';
import {sortType} from './Home'
class App extends Component{

  render(){
    return(
      <React.Fragment>
        <Jumbotron/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route component={NoMatch}/>
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}


export default App;

