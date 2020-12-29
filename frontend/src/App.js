import React from 'react';
import {BrowserRouter as Router , Route , Redirect, Switch} from 'react-router-dom';
import ReadProducts from './prdouct/pages/ReadProducts';



function App() {
  return (
  <Router>
  <Switch>
  <Route path='/' exact>
  <ReadProducts/>
  </Route>
  <Redirect to='/'/>
  </Switch>
  </Router>
  );
};

export default App;
