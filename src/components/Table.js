import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

function Table() {
  const {
    filteredByName,
    setFilteredByName,
    selectedFilters,
    setSelectedFilters,
    planets,
    filters,
    setFilters,
    checkSelectedFilters,
    filteredPlanets,
  } = useContext(planetsContext);

  return (
    <main>
      <form>
        <label htmlFor="search">
          Filtrar Por Nome
          <input
            type="search"
            placeholder="filtro"
            onChange={ (e) => setFilteredByName(e.target.value) }
            data-testid="name-filter"
            value={ filteredByName }
          />
        </label>
      </form>
      <div>
        <select
          data-testid="column-filter"
          onChange={ (e) => setFilters({ ...filters, column: e.target.value }) }
          name="column"
        >
          {
            [
              'population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water',
            ]
              .filter(checkSelectedFilters).map((column) => (
                <option value={ column } key={ column }>
                  {column}
                </option>))
          }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => setFilters({ ...filters, comparison: e.target.value }) }
          name="comparison"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          onChange={ (e) => setFilters({ ...filters, valuee: e.target.value }) }
          type="number"
          min={ 0 }
          name="value-filter"
          value={ filters.valuee }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setSelectedFilters([...selectedFilters, filters]);
            setFilters({
              column: 'population',
              comparison: 'maior que',
              valuee: 0,
            });
          } }
        >
          Aplicar Filtro

        </button>
        <button
          type="button"
          onClick={ () => {
            const cloneArray = [...selectedFilters];
            cloneArray.splice(index, 1);
            setSelectedFilters(cloneArray);
          } }
        >
          𝙭
        </button>
        <span>
          {filters.column}
          {' '}
          {filters.comparison}
          {' '}
          {filters.valuee}
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.filter((planet) => planet.name.toLowerCase()
            .includes(filteredByName.toLowerCase()))
            .filter(filteredPlanets).map((pla) => (
              <tr key={ pla.name }>
                <td>{ pla.name }</td>
                <td>{ pla.rotation_period }</td>
                <td>{ pla.orbital_period }</td>
                <td>{ pla.diameter }</td>
                <td>{ pla.climate }</td>
                <td>{ pla.gravity }</td>
                <td>{ pla.terrain }</td>
                <td>{ pla.surface_water }</td>
                <td>{ pla.population }</td>
                <td>{ pla.films }</td>
                <td>{ pla.created }</td>
                <td>{ pla.edited }</td>
                <td>{ pla.url }</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
