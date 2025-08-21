import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSetAtom } from "jotai";
import { addTaskAtom } from "../atoms";

const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const addTask = useSetAtom(addTaskAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskTitle.trim()) {
      addTask(taskTitle.trim());
      setTaskTitle("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white w-full flex space-x-2 items-center rounded-lg px-4">
        <CiCirclePlus size={28} className="px-0 text-gray-500" />
        <input
          className="bg-transparent w-full h-fit p-1 py-4 text-lg"
          type="text"
          placeholder="Add a new task..."
          value={taskTitle}
          onChange={handleChange}
        />
        <button className="px-4 uppercase text-gray-500" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
