import * as React from "react";
import "csshake";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EasyQuiz from "./EasyQuiz";
import HardQuiz from "./HardQuiz";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/easy" element={<EasyQuiz />} />
        <Route path="/hard" element={<HardQuiz />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
