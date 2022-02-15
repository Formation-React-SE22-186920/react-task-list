import { FormEventHandler, useEffect, useState } from 'react';
import { Button, Container, Form, ListGroup } from 'react-bootstrap';
import { Task } from './types/api';

function App() {
  // État permettant de stocker la liste de toutes les tâches existantes
  const [tasks, setTasks] = useState<Task[]>([]);
  // État décrivant le contenant du champ "Description de la nouvelle tâche"
  const [description, setDescription] = useState('');

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

  // Crée une fonction permettant de gérer la validation du formulaire
  const handleSubmit: FormEventHandler = (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();
    // Compile les saisies de l'utilisateur dans un nouvel objet
    const newTask = {
      description,
      done: false,
    };
    // Envoie une requête HTTP à l'API permettant de créer un nouvel enregistrement
    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Dès que la requête a répondu, interprète le contenu de la réponse en JSON
    .then(response => response.json())
    // Dès que l'interprétation du contenu est terminée,
    .then( (data: Task) => setTasks([ ...tasks, data ]));
    // Vide le formulaire
    setDescription('');
  }

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

      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Créer une nouvelle tâche</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez la description de votre tâche"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <Button variant="primary" type="submit">
            Valider
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default App;
