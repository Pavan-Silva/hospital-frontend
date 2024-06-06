import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg-light_gray h-svh flex flex-col">
          <Navbar />

          <div className="flex flex-grow">
            <Sidebar />
            <main className="p-3 w-full">
              <Outlet />
            </main>
          </div>
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
