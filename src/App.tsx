import React, { useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import {
  remainingTasksCountAtom,
  clearAllTasksAtom, 
  initializeFromStorageAtom
} from "./atoms";
import { useAtomValue, useSetAtom } from "jotai";

function App() {
  const remainingTasksCount = useAtomValue(remainingTasksCountAtom);
  const clearAllTasks = useSetAtom(clearAllTasksAtom);
  const initializeFromStorage = useSetAtom(initializeFromStorageAtom);

  // Initialize state from localStorage on mount
  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <div
      className="hero bg-gray-100
      h-screen md:min-h-[700px] w-full m-auto flex flex-col items-center mt-14 transition-all duration-500"
    >
      <div
        className="flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 text-black"
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl">
            My Tasks
          </h1>
        </div>
        
        <div className="shadow-md">
          <AddTaskForm />
        </div>

        <div
          className="scroll bg-white
          w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500"
        >
          <div
            className="w-full overflow-hidden mb- sticky top-0 bg-white flex items-center justify-between text-gray-500 border-b"
          >
            <p className="text-gray-500 px-2 py-3">
              {remainingTasksCount} tasks left{" "}
            </p>
            <button onClick={clearAllTasks}>Clear all tasks</button>
          </div>

          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;
