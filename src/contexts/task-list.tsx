import { createContext, FC, useContext } from "react";
import useTaskList from "../hooks/task-list";

// Crée un contexte qui doit pouvoir contenir la valeur de retour du hook useTaskList
const TaskListContext = createContext<ReturnType<typeof useTaskList> | undefined>(undefined);

// Crée un hook permettant d'utiliser le contexte en s'assurant que le composant client
// se trouve bien dans la hiérariche d'un Context Provider
export const useTaskListContext = () => {
  // Tente d'utiliser le contexte
  const value = useContext(TaskListContext);
  // Si le contexte renvoie une valeur vide, c'est donc que l'on est en-dehors de la hiérarchie d'un Context Provider
  if (typeof value === 'undefined') {
    throw new Error('TaskListContext should not be undefined. Did you forget to wrap your component inside a TaskListContextProvider?');
  }
  // Sinon, renvoie la valeur du contexte
  return value;
}

// Composant permettant d'emballer un ou plusieurs composant à l'intérieur d'un Context Provider
// leur permettant ainsi d'avoir accès à toutes les données que ce composant contient
export const TaskListContextProvider: FC = ({ children }) => {
  // Récupère une liste de tâches initialisée automatiquement depuis l'API
  const value = useTaskList();

  // Rendu du composant
  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  )
}
