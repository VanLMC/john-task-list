import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListItem from '../list-item';
import { SubtasksContainer } from './styles';
import { useTaskStore } from '../../store/task';
import { Task } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const DraggableList: React.FC = () => {
  const [
    tasks,
    setTasks,
    toggleCompleted,
    toggleCompletedSubtasks,
    toggleCollapsed,
    onDragEnd,
    removeTask,
    removeSubtask,
  ] = useTaskStore((state) => [
    state.tasks,
    state.setTasks,
    state.toggleCompleted,
    state.toggleCompletedSubtasks,
    state.toggleCollapsed,
    state.onDragEnd,
    state.removeTask,
    state.removeSubTask,
  ]);

  const handleAddNewSubTask = (taskId: string, text: string) => {
    const newSubTask: Task = {
      id: uuidv4(),
      text: text,
      completed: false,
      collapsed: true,
    };

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const subtasks = tasks[taskIndex].subtasks;

    if (taskIndex === -1) return;

    const updatedSubtasks = [...(subtasks || []), newSubTask];

    const updatedTasks = [...tasks];

    updatedTasks[taskIndex].subtasks = updatedSubtasks;

    setTasks(updatedTasks);
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
            {tasks &&
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ListItem
                        type="TASK"
                        task={task}
                        toggleCompleted={toggleCompleted}
                        toggleCollapsed={toggleCollapsed}
                        removeTask={removeTask}
                        handleAddNewSubTask={(text: string) => {
                          handleAddNewSubTask(task.id, text);
                        }}
                      />
                      {!task.collapsed && (
                        <SubtasksContainer>
                          {task.subtasks?.map((subtask) => (
                            <ListItem
                              type="SUBTASK"
                              task={subtask}
                              toggleCompleted={() =>
                                toggleCompletedSubtasks(task.id, subtask.id)
                              }
                              removeTask={() =>
                                removeSubtask(task.id, subtask.id)
                              }
                            />
                          ))}
                        </SubtasksContainer>
                      )}
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
