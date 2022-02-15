import { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Task } from './types/api';

function App() {
  // État permettant de stocker la liste de toutes les tâches existantes
  const [tasks, setTasks] = useState<Task[]>([]);

  // Associe un effet à certaines conditions
  useEffect(
    () => {
      // Envoie une requête HTTP à l'API
      fetch('http://localhost:8000/tasks')
      // Dès que la requête a répondu, interprète le contenu de la réponse en JSON
      .then(response => response.json())  
      // Dès que l'interprétation du contenu est terminée, range les données obtenues dans l'état
      .then(data => setTasks(data))
    },
    // Observe les changements dans une liste de variables vide
    // Ceci provoquera le déclenchement de l'effet uniquement au montage du composant
    []
  );

  // Si la requête n'a pas encore répondu, affiche un message "Chargement…"
  if (tasks.length === 0) {
    return <div>Loading...</div>;
  }

  // Rendu du composant
  return (
    <Container>
      <h1>Liste des tâches</h1>
      <ListGroup>
        {
          tasks.map(
            task => (
              <ListGroup.Item key={task.id}>
                {task.description}
              </ListGroup.Item>
            )
          )
        }
      </ListGroup>
    </Container>
  );
}

export default App;
