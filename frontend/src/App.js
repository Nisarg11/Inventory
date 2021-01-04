import React from 'react';
import {BrowserRouter as Router , Route , Redirect, Switch} from 'react-router-dom';
import ReadProducts from './prdouct/pages/ReadProducts';
import CreateProducts from './prdouct/pages/CreateProducts';
import EditProducts from './prdouct/pages/EditProducts';

function App() {
  return (
  <Router>
  <Switch>
  <Route path='/' exact>
  <ReadProducts/>
  </Route>
  <Route path='/add' exact>
  <CreateProducts/>
  </Route>
  <Route path='/edit/:id' exact component={EditProducts}>
  </Route>
  <Redirect to='/'/>
  </Switch>
  </Router>
  );
};

export default App;
