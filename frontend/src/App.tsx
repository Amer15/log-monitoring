import { AppSidebar } from "./components/appsidebar";
import Dashboard from "./pages/dashboard";

const App = () => {
  return <div className="h-screen w-full flex">
    <AppSidebar />
    <Dashboard />
  </div>;
};

export default App;
