import React from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
