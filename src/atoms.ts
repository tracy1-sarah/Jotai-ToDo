import {atom} from "jotai";
import {Task} from "./types";

export const tasksAtom = atom<Task[]>([]);

//Derived atoms for task counts and filters
// These atoms derive their values from the tasksAtom and filter or count tasks based on their completion
// status. They are used to provide quick access to these values without needing to filter the tasks
// array repeatedly in components.
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

// Action atoms
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
    (get, set, {id, title}: { id: number; title: string }) => {
        const currentTasks = get(tasksAtom);
        set(tasksAtom, currentTasks.map(task =>
            task.id === id ? {...task, title: title.trim()} : task
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
            task.id === id ? {...task, completed: !task.completed} : task
        ));
    }
);

export const clearAllTasksAtom = atom(
    null,
    (get, set) => {
        set(tasksAtom, []);
    }
);

