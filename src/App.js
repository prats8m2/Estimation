import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import HomeComp from './components/home';
import Players from './components/players';
import Playground from './components/playgroud'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/players" element={<Players/>}>
        </Route>
        <Route path="/playground" element={<Playground/>}>
        </Route>
        <Route path="/" element={<HomeComp/>}>
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
