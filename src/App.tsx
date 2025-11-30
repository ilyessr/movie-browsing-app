import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </Router>
  );
};

export default App;
