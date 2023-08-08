import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task } from '../types';
import { mockedTasks } from '../contants';
import { DropResult } from 'react-beautiful-dnd';

const initialValues = {
  tasks: mockedTasks || [],
};

interface TaskStore {
  tasks: Array<Task>;
}

interface TaskActions {
  setTasks: (tasks: Array<Task>) => void;
  onDragEnd: (result: DropResult) => void;
  removeTask: (taskId: string) => void;
  removeSubTask: (taskId: string, subtaskId: string) => void;
  toggleCompleted: (taskId: string) => void;
  toggleCompletedSubtasks: (taskId: string, subtaskId: string) => void;
  toggleCollapsed: (taskId: string) => void;
}

export const useTaskStore = create<
  TaskStore & TaskActions,
  [['zustand/persist', { roles: string[] }]]
>(
  persist(
    (set) => ({
      ...initialValues,
      setTasks: (tasks: Array<Task>) => {
        set((state) => {
          return { ...state, tasks };
        });
      },
      removeTask: (taskId: string) => {
        set((state) => {
          const newTasks = state.tasks.filter((task) => task.id !== taskId);
          return { ...state, tasks: newTasks };
        });
      },
      removeSubTask: (taskId: string, subtaskId: string) => {
        set((state) => {
          const tasks = state.tasks;
          const taskIndex = tasks.findIndex((task) => task.id === taskId);
          const subtasks = tasks[taskIndex].subtasks;

          if (taskIndex === -1 || !subtasks) return state;

          const updatedSubtasks = subtasks.filter(
            (task) => task.id !== subtaskId
          );

          const updatedTasks = [...tasks];

          updatedTasks[taskIndex].subtasks = updatedSubtasks;

          return { ...state, tasks: updatedTasks };
        });
      },
      toggleCompleted: (taskId: string) => {
        set((state) => {
          const tasks = state.tasks;
          const taskIndex = tasks.findIndex((task) => task.id === taskId);
          if (taskIndex === -1) return state;
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex].completed =
            !updatedTasks[taskIndex].completed;
          return { ...state, tasks: updatedTasks };
        });
      },

      onDragEnd: (result: DropResult) => {
        set((state) => {
          if (!result.destination) return state;
          const reorderedItems = Array.from(state.tasks);
          const [movedItem] = reorderedItems.splice(result.source.index, 1);
          reorderedItems.splice(result.destination.index, 0, movedItem);
          return { ...state, tasks: reorderedItems };
        });
      },

      toggleCompletedSubtasks: (taskId: string, subtaskId: string) => {
        set((state) => {
          const tasks = state.tasks;
          const taskIndex = tasks.findIndex((task) => task.id === taskId);
          const subtasks = tasks[taskIndex].subtasks;

          if (taskIndex === -1 || !subtasks) return state;

          const subtaskIndex = subtasks.findIndex(
            (task) => task.id === subtaskId
          );

          const updatedTasks = [...tasks];

          const updatedSubtasks = [...subtasks];
          updatedSubtasks[subtaskIndex].completed =
            !updatedSubtasks[subtaskIndex].completed;
          updatedTasks[taskIndex].subtasks = updatedSubtasks;

          return { ...state, tasks: updatedTasks };
        });
      },

      toggleCollapsed: (taskId: string) => {
        set((state) => {
          const tasks = state.tasks;
          const taskIndex = tasks.findIndex((task) => task.id === taskId);
          if (taskIndex === -1) return state;
          if (!tasks[taskIndex].subtasks) return state;
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex].collapsed =
            !updatedTasks[taskIndex].collapsed;

          return { ...state, tasks: updatedTasks };
        });
      },
    }),
    {
      name: 'tasks',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
