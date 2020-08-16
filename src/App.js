import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories ] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: title ? title : `Repo ${Date.now()}`,
    });

    const data = response.data;

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
          {repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>
      <input type="text" onChange={e => setTitle(e.target.value)}/>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
