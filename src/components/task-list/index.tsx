import { FC } from "react";
import { ListGroup } from "react-bootstrap"
import { useTaskListContext } from "../../contexts/task-list";
import TaskListItem from './item';

interface TaskListProps { }

const TaskList: FC<TaskListProps> = () => {
  // Accède aux données distribuées par le contexte
  const { states } = useTaskListContext();

  // Rendu du composant
  return (
    <ListGroup>
      {
        states.tasks.map(
          task => (
            <TaskListItem key={task.id} task={task} />
          )
        )
      }
    </ListGroup>
  )
}

export default TaskList;
