import { Outlet } from "react-router-dom";
import Sidebar from "./components/global/Sidebar";
import Navbar from "./components/global/Navbar";

const App = () => {
  return (
    <div className="bg-light_gray h-svh flex flex-col">
      <Navbar />

      <div className="flex flex-grow">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
