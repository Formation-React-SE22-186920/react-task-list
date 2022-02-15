import { Container } from "react-bootstrap";
import AddTaskForm from "../components/add-task-form";
import TaskList from "../components/task-list";
import { TaskListContextProvider, useTaskListContext } from "../contexts/task-list";

const TaskListPageContent = () => {
  // Accède aux données distribuées par le contexte
  const { states } = useTaskListContext();

  // Si la requête n'a pas encore répondu, affiche un message "Chargement…"
  if (states.tasks.length === 0) {
    return <div>Loading...</div>;
  }

  // Rendu du composant
  return (
    <Container>
      <h1>Liste des tâches</h1>

      {/* Liste des tâches */}
      <TaskList />

      {/* Formulaire de création de tâche */}
      <AddTaskForm />
    </Container>
  );  
}

const TaskListPage = () => {
  // Rendu du composant
  return (
    <TaskListContextProvider>
      <TaskListPageContent />
    </TaskListContextProvider>
  );  
}

export default TaskListPage;
