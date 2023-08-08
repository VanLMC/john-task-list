import { Task } from "./types";

export const mockedTasks : Array<Task> = [
    {
      id: '1',
      text: 'Task 1 yadayadayadayadada',
      completed: false,
    },
    {
      id: '2',
      text: 'Task 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos sed hic delectus porro blanditiis maxime, et velit, sit eum at ipsum nesciunt. Et numquam impedit veniam reprehenderit architecto.',
      completed: false,
      collapsed: true,
      subtasks: [
        {
          id: '1',
          text: 'SubTask 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos s',
          completed: false,
        },
        {
          id: '2',
          text: 'SubTask 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolor eos s',
          completed: false,
        },
      ]
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
      collapsed: true,
          subtasks: [
        {
          id: '1',
          text: 'SubTask 3 Lorem ipsum dolor sit a',
          completed: false,
        },
        {
          id: '2',
          text: 'SubTask 4 Lorem ipsum dolor sit amet conse',
          completed: false,
        },
        {
          id: '3',
          text: 'SubTask 4 Lorem ipsum dolor sit amet consect',
          completed: false,
        },
      ]
  
    }
  ]
  