import { Task } from "../../types"
import Checkbox from '../new-checkbox';
import { Container, ListItemText } from "./styles"

interface ListItemProps {
  task: Task
  toggleCompleted: (taskId: string) => void,
}

export default function ListItem({ task, toggleCompleted }: ListItemProps) {
  const { id, text, completed } = task;

  return (
    <Container key={id} $completed={completed}>
      <Checkbox
      isChecked={task.completed}
      setIsChecked={() => toggleCompleted(id)}
      />
      <ListItemText>{text}</ListItemText>
    </Container>
  )
}
