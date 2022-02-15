import { useState, useEffect } from "react";
import { Task, TaskInput } from "../types/api";

const useTaskList = () => {
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

  // Crée une fonction permettant d'ajouter une nouvelle tâche
  const createTask = (newTask: TaskInput) => {
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

  return {
    states: {
      tasks,
    },
    actions: {
      createTask,
      updateTask,
      deleteTask,
    }
  }
}

export default useTaskList;
