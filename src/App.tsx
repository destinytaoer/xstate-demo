import { Routes, Route } from 'react-router-dom';
import Example from './pages/Example/Route';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <h1>Learn XState</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="example/*" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
