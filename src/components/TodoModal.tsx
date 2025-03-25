import { X } from "lucide-react";
import { useState } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const TodoModal = ({ onClose }: { onClose: () => void }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: input,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-white rounded-xl p-4 w-80 font-mono shadow-xl relative z-50">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={onClose}
      >
        <X />
      </button>
      <h2 className="text-lg font-bold text-purple-600 mb-3">To-Do List</h2>
      <div className="flex mb-3">
        <input
          type="text"
          placeholder="Add a new task..."
          className="border p-2 flex-grow rounded-l text-sm text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-3 rounded-r text-sm"
        >
          Add
        </button>
      </div>
      <ul className="text-sm text-gray-800 max-h-[250px] overflow-y-auto space-y-1 pr-1">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tasks yet. Add one above!
          </p>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="bg-blue-50 px-3 py-2 rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  className={`${task.done ? "line-through text-gray-400" : ""}`}
                >
                  {task.text}
                </span>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeTask(task.id)}
              >
                x
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoModal;
