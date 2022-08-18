const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function requestAPI() {
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
}

export default requestAPI;
