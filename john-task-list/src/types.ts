export interface Task {
  id: string;
  text: string;
  completed: boolean;
  collapsed?: boolean;
  subtasks?: Array<Task>;
}
