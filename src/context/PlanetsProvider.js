import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredByName, setFilteredByName] = useState([]);
  const [numericFilters, setNumericFilters] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valuee, setValuee] = useState([0]);

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setPlanets(results);
      setFilteredByName(results);
    }
    fetchPlanets();
  }, []);

  function handleChange({ target: { value } }) {
    setFilteredByName(planets.filter(
      (planet) => planet.name.toLowerCase().includes(value),
    ));
  }

  function handleColumn({ target: { value } }) {
    setColumn(value);
  }

  function handleComparison({ target: { value } }) {
    setComparison(value);
  }

  function handleValuee({ target: { value } }) {
    setValuee(value);
  }

  function filterFunc() {
    if (comparison === 'maior que') {
      setFilteredByName(planets.filter((planet) => Number(planet[column]) > valuee));
    }
    if (comparison === 'menor que') {
      setFilteredByName(planets.filter((planet) => Number(planet[column]) < valuee));
    }
    if (comparison === 'igual a') {
      setFilteredByName(planets.filter(
        (planet) => Number(planet[column]) === Number(valuee),
      ));
    } else {
      return planets;
    }
  }

  const contextValue = {
    planets,
    setPlanets,
    filteredByName,
    setFilteredByName,
    numericFilters,
    setNumericFilters,
    handleChange,
    column,
    setColumn,
    comparison,
    setComparison,
    valuee,
    setValuee,
    handleColumn,
    handleComparison,
    handleValuee,
    filterFunc,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default PlanetsProvider;
