import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredByName, setFilteredByName] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    valuee: 0,
  });

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setPlanets(results);
    }
    fetchPlanets();
  }, []);

  const checkSelectedFilters = (selectedFilter) => !selectedFilters.find(
    (filter) => selectedFilter === filter.column,
  );

  const filteredPlanets = (linha) => {
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.valuee));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.valuee));
        break;
      case 'igual a':
        bools.push(linha[filter.column] === filter.valuee.toUpperCase());
        break;
      default:
        return true;
      }
    });

    return bools.every((el) => el);
  };

  const contextValue = {
    planets,
    setPlanets,
    filteredByName,
    setFilteredByName,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    checkSelectedFilters,
    filteredPlanets,
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
