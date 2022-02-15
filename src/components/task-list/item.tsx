import { FC, useState, FormEventHandler } from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { FaCheck, FaTimes, FaPen, FaTrashAlt } from "react-icons/fa";
import { Task, TaskInput } from "../../types/api";

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
    <ListGroup.Item className="d-flex justify-content-between">
      <Form.Check
        className="me-2"
        onChange={(event) => updateTask(task.id, { description: task.description, done: event.target.checked })}
        checked={task.done}
      />
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

export default TaskListItem;
