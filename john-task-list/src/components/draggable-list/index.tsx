


import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import ListItem from '../list-item';
import { Task } from '../../types';

const mockedTasks : Array<Task> = [
  {
    id: '1',
    text: 'Task 1 yadayadayadayadada',
    completed: false,
  },
  {
    id: '2',
    text: 'Task 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos sed hic delectus porro blanditiis maxime, et velit, sit eum at ipsum nesciunt. Et numquam impedit veniam reprehenderit architecto.',
    completed: false,
  },
  {
    id: '3',
    text: 'Task 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos s',
    completed: false,
  },
  {

    id: '4',
    text: 'Task 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos s',
    completed: false,
  }
]

const DraggableList: React.FC = () => {

const [tasks, setTasks]  = useState(mockedTasks);

const toggleCompleted = (taskId: string) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if(taskIndex === -1) return;
  const updatedTasks = [...tasks];
  updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
  setTasks(updatedTasks);

}

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(tasks);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setTasks(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            style={{
              listStyle: 'none',
            }}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  >
                  <ListItem
                    task={task}
                    toggleCompleted={toggleCompleted}
                  />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
