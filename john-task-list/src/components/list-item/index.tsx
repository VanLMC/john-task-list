import { KeyboardEvent, useRef, useState } from 'react';
import { Task } from '../../types';
import Checkbox from '../checkbox';
import {
  Button,
  Container,
  Input,
  InputContainer,
  ListItemText,
} from './styles';

interface ListItemProps {
  task: Task;
  toggleCompleted: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  toggleCollapsed?: (taskId: string) => void;
  handleAddNewSubTask?: (text: string) => void;
  type: 'TASK' | 'SUBTASK';
}

export default function ListItem({
  task,
  toggleCompleted,
  toggleCollapsed,
  removeTask,
  handleAddNewSubTask,
  type,
}: ListItemProps) {
  const { id, text, completed, collapsed } = task;

  function handleDelete() {
    const shouldDelete = window.confirm('Are you sure you want to delete?');

    if (shouldDelete) {
      removeTask(task.id);
    }
  }
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [openSubtaskForm, setOpenSubtaskForm] = useState(false);

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!inputRef.current) return;
      const inputValue = inputRef.current.value;
      handleAddNewSubTask && handleAddNewSubTask(inputValue);
      inputRef.current.value = '';
      setOpenSubtaskForm(false);
    }
  };

  return (
    <>
      <Container
        key={id}
        $completed={completed}
        $collapsed={collapsed && !!task.subtasks ? true : false}
        onClick={() => {
          toggleCollapsed && toggleCollapsed(id);
        }}
      >
        <Checkbox
          isChecked={task.completed}
          setIsChecked={() => toggleCompleted(id)}
        />
        <ListItemText>{text}</ListItemText>

        {type === 'TASK' && (
          <Button
            title="Add subtask"
            onClick={() => setOpenSubtaskForm((value) => !value)}
            style={{ marginLeft: 'auto' }}
          >
            ➕
          </Button>
        )}
        <Button
          title="delete task"
          onClick={handleDelete}
          style={{ marginLeft: type === 'TASK' ? '5px' : 'auto' }}
        >
          🗑️
        </Button>
      </Container>
      {openSubtaskForm && (
        <InputContainer>
          <Input
            placeholder="Press Enter to add new task"
            onKeyDown={handleEnterPress}
            ref={inputRef}
          />
        </InputContainer>
      )}
    </>
  );
}
