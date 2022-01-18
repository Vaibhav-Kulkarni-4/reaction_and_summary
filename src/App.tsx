import "./styles/output.css";

import Home from "./components/_partials/Home";
import ToastContainer from "./components/core/ToastContainer";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;
