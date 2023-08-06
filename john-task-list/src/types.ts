export interface Task {
    id: string;
    text: string;
    completed: boolean;
    subtasks?: Array<Task>;
}