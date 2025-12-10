export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export type TaskFilterType = 'all' | 'completed' | 'pending'