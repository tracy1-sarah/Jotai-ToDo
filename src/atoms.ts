import { atom } from "jotai";
import { Task } from "./types";

// Core state atoms
export const tasksAtom = atom<Task[]>([]);

// Derived atoms for computed values
export const completedTasksAtom = atom((get) => 
  get(tasksAtom).filter(task => task.completed)
);

export const remainingTasksAtom = atom((get) => 
  get(tasksAtom).filter(task => !task.completed)
);

export const totalTasksAtom = atom((get) => 
  get(tasksAtom).length
);

export const completedTasksCountAtom = atom((get) => 
  get(completedTasksAtom).length
);

export const remainingTasksCountAtom = atom((get) => 
  get(remainingTasksAtom).length
);

// Action atoms for state mutations
export const addTaskAtom = atom(
  null,
  (get, set, title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false
    };
    set(tasksAtom, [...get(tasksAtom), newTask]);
  }
);

export const editTaskAtom = atom(
  null,
  (get, set, { id, title }: { id: number; title: string }) => {
    const currentTasks = get(tasksAtom);
    set(tasksAtom, currentTasks.map(task => 
      task.id === id ? { ...task, title: title.trim() } : task
    ));
  }
);

export const deleteTaskAtom = atom(
  null,
  (get, set, id: number) => {
    const currentTasks = get(tasksAtom);
    set(tasksAtom, currentTasks.filter(task => task.id !== id));
  }
);

export const toggleTaskCompletedAtom = atom(
  null,
  (get, set, id: number) => {
    const currentTasks = get(tasksAtom);
    set(tasksAtom, currentTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }
);

export const clearAllTasksAtom = atom(
  null,
  (get, set) => {
    set(tasksAtom, []);
  }
);


// Utility atoms for form state
export const newTaskTitleAtom = atom<string>("");

// Local storage persistence atoms
export const tasksWithPersistenceAtom = atom(
  (get) => get(tasksAtom),
  (get, set, newTasks: Task[]) => {
    set(tasksAtom, newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
);


// Initialize atoms from localStorage
export const initializeFromStorageAtom = atom(
  null,
  (get, set) => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        set(tasksAtom, JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }
);
