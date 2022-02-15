import { FC, FormEventHandler, useEffect, useState } from 'react';
import { Button, Container, Form, ListGroup } from 'react-bootstrap';
import { Task, TaskInput } from './types/api';
import { FaCheck, FaPen, FaTimes, FaTrashAlt } from 'react-icons/fa';

interface TaskListItemProps {
  task: Task
  deleteTask: (id: number) => void
  updateTask: (id: number, updatedTask: TaskInput) => void
}

const TaskListItem: FC<TaskListItemProps> = ({ task, deleteTask, updateTask }) => {
  // État permettant de savoir si l'élément est actuellement en cours de modification
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  // État décrivant le contenu du champ "Description"
  const [description, setDescription] = useState(task.description);

  // Crée une fonction permettant de gérer la validation du formulaire
  const handleSubmit: FormEventHandler = (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();
    // Déclenche la mise à jour de la tâche
    updateTask(task.id, { description, done: task.done });
    // Désactive la modification de la tâche
    setIsBeingEdited(false);
  }

  // Rendu du composant
  return (
    <ListGroup.Item key={task.id} className="d-flex justify-content-between">
      {
        isBeingEdited ?
          <div className="d-flex flex-grow-1">
            <Form className="d-flex flex-grow-1" onSubmit={handleSubmit}>
              <Form.Control
                className="flex-grow-1"
                type="text"
                size="sm"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
              <Button variant="success" size="sm" type="submit">
                <FaCheck />
              </Button>
            </Form>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsBeingEdited(false)}
            >
              <FaTimes />
            </Button>
          </div>
        :
          <div className="d-flex flex-grow-1">
            <div className="flex-grow-1">
              {task.description}
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsBeingEdited(true)}
            >
              <FaPen />
            </Button>
          </div>
      }
      <Button
        variant="danger"
        size="sm"
        onClick={() => deleteTask(task.id)}
      >
        <FaTrashAlt />
      </Button>
    </ListGroup.Item>
  )
}

function App() {
  // État permettant de stocker la liste de toutes les tâches existantes
  const [tasks, setTasks] = useState<Task[]>([]);
  // État décrivant le contenu du champ "Description de la nouvelle tâche"
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
    const newTask: TaskInput = {
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
    // Dès que l'interprétation du contenu est terminée, ajoute le nouvel objet créé à la liste des tâches existantes
    .then( (data: Task) => setTasks([ ...tasks, data ]));
    // Vide le formulaire
    setDescription('');
  }

  // Crée une fonction permettant de supprimer une tâche existante
  const deleteTask = (id: number) => {
    // Envoie une requête HTTP à l'API permettant de supprimer un enregistrement existant
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    })
    // Dès que la requête a répondu, retire l'élément supprimé de la liste des tâches existantes
    .then(response => setTasks(tasks.filter( task => task.id !== id )));
  }

  // Crée une fonction permettant de modifier une tâche existante
  const updateTask = (id: number, updatedTask: TaskInput) => {
    // Envoie une requête HTTP à l'API permettant de modifier un enregistrement existant
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    // Dès que la requête a répondu, interprète le contenu de la réponse en JSON
    .then(response => response.json())
    // Dès que l'interprétation du contenu est terminée, remplace la tâche actuelle par sa version modifée dans la liste des tâches existantes
    .then( (data: Task) => setTasks(tasks.map( task => task.id === id ? data : task )));
  }
  
  // Si la requête n'a pas encore répondu, affiche un message "Chargement…"
  if (tasks.length === 0) {
    return <div>Loading...</div>;
  }

  // Rendu du composant
  return (
    <Container>
      <h1>Liste des tâches</h1>

      {/* List des tâches */}
      <ListGroup>
        {
          tasks.map(
            task => (
              <TaskListItem task={task} deleteTask={deleteTask} updateTask={updateTask} />
            )
          )
        }
      </ListGroup>

      {/* Formulaire de création de tâche */}
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
