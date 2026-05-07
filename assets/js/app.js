const cityList = document.getElementById('city-list');
const agentList = document.getElementById('agent-list');

async function loadData() {
  try {
    const [citiesRes, agentsRes] = await Promise.all([
      fetch('data/cities.json'),
      fetch('data/agents.json'),
    ]);

    const cities = await citiesRes.json();
    const agents = await agentsRes.json();

    renderCities(cities);
    renderAgents(agents);
  } catch (error) {
    cityList.innerHTML = '<p class="error">Unable to load city data.</p>';
    agentList.innerHTML = '<p class="error">Unable to load agent data.</p>';
    console.error(error);
  }
}

function renderCities(cities) {
  cityList.innerHTML = cities
    .map(
      (city) => `
      <article class="card">
        <h4>${city.name}</h4>
        <p>${city.province}</p>
        <p>Population: ${city.population.toLocaleString()}</p>
        <div class="badge secondary">${city.highlights.join(' · ')}</div>
      </article>
    `
    )
    .join('');
}

function renderAgents(agents) {
  agentList.innerHTML = agents
    .map(
      (agent) => `
      <article class="card">
        <h4>${agent.name}</h4>
        <p>${agent.type}</p>
        <p>${agent.description}</p>
        <div class="badge primary">${agent.location}</div>
      </article>
    `
    )
    .join('');
}

loadData();
