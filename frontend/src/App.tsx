import { AppSidebar } from "./components/appsidebar";
import Dashboard from "./pages/dashboard";
import { Toaster } from "sonner"

const App = () => {
  return <div className="h-screen w-full flex">
    <AppSidebar />
    <Dashboard />
    <Toaster position="bottom-right" richColors />
  </div>;
};

export default App;
