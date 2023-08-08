import { KeyboardEvent, useRef } from 'react';
import './App.css';
import DraggableList from './components/draggable-list';
import { useTaskStore } from './store/task';
import { Container, Input, InputContainer } from './styles';
import { Task } from './types';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useTaskStore((state) => [
    state.tasks,
    state.setTasks,
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddNewTask = (text: string) => {
    const newTask: Task = {
      id: uuidv4(),
      text: text,
      completed: false,
      collapsed: true,
    };

    setTasks([...tasks, newTask]);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!inputRef.current) return;
      const inputValue = inputRef.current.value;
      handleAddNewTask(inputValue);
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <Container>
        <h1>John's List</h1>

        <InputContainer>
          <Input
            placeholder="Press Enter to add new task"
            onKeyDown={handleEnterPress}
            ref={inputRef}
          />
        </InputContainer>
        <DraggableList />
      </Container>
    </>
  );
}

export default App;
