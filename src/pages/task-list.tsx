import { Container } from "react-bootstrap";
import AddTaskForm from "../components/add-task-form";
import TaskList from "../components/task-list";
import useTaskList from "../hooks/task-list";

const TaskListPage = () => {
  // Récupère une liste de tâches initialisée automatiquement depuis l'API
  const { states, actions } = useTaskList();
  
  // Si la requête n'a pas encore répondu, affiche un message "Chargement…"
  if (states.tasks.length === 0) {
    return <div>Loading...</div>;
  }

  // Rendu du composant
  return (
    <Container>
      <h1>Liste des tâches</h1>

      {/* Liste des tâches */}
      <TaskList tasks={states.tasks} deleteTask={actions.deleteTask} updateTask={actions.updateTask} />

      {/* Formulaire de création de tâche */}
      <AddTaskForm createTask={actions.createTask} />
    </Container>
  );  
}

export default TaskListPage;
