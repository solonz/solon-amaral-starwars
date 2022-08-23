import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

const MAIOR_QUE = 'maior que';
const MENOR_QUE = 'menor que';
const IGUAL_A = 'igual a';

function Table() {
  const {
    filteredByName,
    handleChange,
    handleColumn,
    handleComparison,
    handleValuee,
    filterFunc,
    valuee,
  } = useContext(planetsContext);

  return (
    <main>
      <form>
        <label htmlFor="search">
          Filtrar Por Nome
          <input
            type="search"
            placeholder="filtro"
            onChange={ handleChange }
          />
        </label>
      </form>
      <div>
        <select
          data-testid="column-filter"
          onChange={ handleColumn }
          name="column"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleComparison }
          name="comparison"
        >
          <option value={ MAIOR_QUE }>maior que</option>
          <option value={ MENOR_QUE }>menor que</option>
          <option value={ IGUAL_A }>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          onChange={ handleValuee }
          type="number"
          min={ 0 }
          name="value"
          value={ valuee }
        />

        <button
          data-testid="button-filter"
          onClick={ filterFunc }
          type="button"
        >
          Aplicar Filtro

        </button>
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
          {filteredByName.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
