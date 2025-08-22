import {atom} from "jotai";
import {Task} from "./types";

export const tasksAtom = atom<Task[]>([]);

export const taskCountAtom = atom((get) =>
    get(tasksAtom).filter(task => !task.completed)
);

export const totalTaskAtom = atom((get) =>
    get(taskCountAtom).length
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

