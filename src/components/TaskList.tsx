import React from "react";
import Task from "./Task";
import { tasksAtom } from "../atoms";
import { useAtomValue } from "jotai";

const TaskList = () => {
  const tasks = useAtomValue(tasksAtom);
  const reversedTasks = tasks.slice().reverse();
  
  if (tasks.length === 0) {
    return (
      <div className="w-full h-[80%] flex items-center justify-center overflow-hidden">
        <p className="text-gray-500 text-center z-10">Empty task</p>
      </div>
    );
  }
  
  return (
    <ul className="">
      {reversedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  );
};

export default TaskList;
