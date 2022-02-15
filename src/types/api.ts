// Représente une tâche récupérée dans l'API
export interface Task {
  id: number
  description: string
  done: boolean
}

// Représente les données nécessaires à la création ou la modification d'ne tâche
export interface TaskInput {
  description: string
  done: boolean
}
