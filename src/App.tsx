import "./styles/output.css";

import AddReactionButton from "./components/core/AddReactionButton";
import Home from "./components/_partials/Home";
import React from "react";
import ReactionBadge from "./components/core/Reactions";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ReactionBadge />
      <AddReactionButton />
      <Home />
    </div>
  );
}

export default App;
