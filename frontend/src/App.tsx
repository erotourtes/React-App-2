import { Toaster } from "sonner";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import TaskList from "./components/TaskList/TaskList";

function App() {
  return (
    <div className="container p-5">
      <div className="mb-7">
        <NavBar />
      </div>
      <TaskList />
      <Toaster />
    </div>
  );
}

export default App;
