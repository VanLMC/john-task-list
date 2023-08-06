
import ListItem from './components/list-item'
import { Container } from './styles'
import { Task } from './types'
import './App.css';
import { useState } from 'react';


//todo: add linter
//todo: refactor new checkbox

const mockedTasks : Array<Task> = [
  {
    id: 1,
    text: 'Task 1 yadayadayadayadada',
    completed: false,
  },
  {
    id: 2,
    text: 'Task 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos sed hic delectus porro blanditiis maxime, et velit, sit eum at ipsum nesciunt. Et numquam impedit veniam reprehenderit architecto.',
    completed: false,
  },
  {
    id: 3,
    text: 'Task 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos s',
    completed: false,
  },
  {

    id: 4,
    text: 'Task 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos s',
    completed: false,
  }
]
function App() {

const [tasks, setTasks]  = useState(mockedTasks);


const toggleCompleted = (taskId: number) => {

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if(taskIndex === -1) return;
  const updatedTasks = [...tasks];
  updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
  setTasks(updatedTasks);

}

  return (
    <Container>
      {tasks.map((task) => <ListItem task={task} toggleCompleted={toggleCompleted} />)}
    </Container>
  )
}

export default App
