import { BrowserRouter as Router } from 'react-router-dom'
import Search from './Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Search />
      </Router>
    </div>
  );
}

export default App;
