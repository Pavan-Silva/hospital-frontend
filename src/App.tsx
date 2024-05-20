import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-light_gray h-svh flex flex-col">
      <Navbar />

      <div className="flex flex-grow">
        <Sidebar />
        <main className="p-3 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
