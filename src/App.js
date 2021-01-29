import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Comments from './components/Comments';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/comments" exact component={() => <Comments />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;