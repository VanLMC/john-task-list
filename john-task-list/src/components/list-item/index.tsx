import { Task } from "../../types"
import Checkbox from '../checkbox';
import { Container, ListItemText } from "./styles"

interface ListItemProps {
  task: Task
  toggleCompleted: (taskId: string) => void,
  toggleCollapsed: (taskId: string) => void,
}

export default function ListItem({ task, toggleCompleted, toggleCollapsed }: ListItemProps) {
  const { id, text, completed, collapsed } = task;

  return (
    <Container 
    key={id} 
    $completed={completed} 
    $collapsed={collapsed}
    onClick={() => toggleCollapsed(id)}
    >
      <Checkbox
      isChecked={task.completed}
      setIsChecked={() => toggleCompleted(id)}
      />
      <ListItemText>{text}</ListItemText>
    </Container>
  )
}
