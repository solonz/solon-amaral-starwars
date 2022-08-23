import React, { useContext } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { planets } = useContext(PlanetsContext);

  return (
    <div>
      {planets.length && <Table />}
    </div>
  );
}

export default App;
