import { FC } from "react";
import { ListGroup } from "react-bootstrap"
import { Task, TaskInput } from "../../types/api";
import TaskListItem from './item';

interface TaskListProps {
  tasks: Task[]
  deleteTask: (id: number) => void
  updateTask: (id: number, updatedTask: TaskInput) => void
}

const TaskList: FC<TaskListProps> = ({ tasks, deleteTask, updateTask }) => {
  // Rendu du composant
  return (
    <ListGroup>
      {
        tasks.map(
          task => (
            <TaskListItem key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          )
        )
      }
    </ListGroup>
  )
}

export default TaskList;
