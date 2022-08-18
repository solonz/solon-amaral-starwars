import React, { useContext } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { planets } = useContext(PlanetsContext);

  return (
    <div>
      <span>Hello, App!</span>
      {planets.length > 1 && <Table />}
    </div>
  );
}

export default App;
