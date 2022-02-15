import { FC, FormEventHandler, useState } from "react";
import { Form, Button } from "react-bootstrap"
import { TaskInput } from "../types/api";

interface AddTaskFormProps {
  createTask: (newTask: TaskInput) => void
}

const AddTaskForm: FC<AddTaskFormProps> = ({ createTask }) => {
  // État décrivant le contenu du champ "Description de la nouvelle tâche"
  const [description, setDescription] = useState('');

  // Crée une fonction permettant de gérer la validation du formulaire
  const handleSubmit: FormEventHandler = (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();
    // Compile les saisies de l'utilisateur dans un nouvel objet
    const newTask: TaskInput = {
      description,
      done: false,
    };
    // Déclenche la création d'une nouvelle tâche
    createTask(newTask);
    // Vide le formulaire
    setDescription('');    
  }
    
  // Rendu du composant
  return (
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
  )
}

export default AddTaskForm;
