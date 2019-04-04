import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LinkDetails from './Link_details';
import LinkIndex from './Link_index';


const App = () => (
  <div>
    <Switch>
      <Route  exact path="/" component={LinkIndex} />
      <Route  exact path="/link/:linkName" component={LinkDetails} />
    </Switch>
  </div>
);

export default App;
