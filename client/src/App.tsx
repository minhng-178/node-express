import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./layout/Home";
import NotFound from "./components/shared/NotFound";
import CreatePlayer from "./layout/players/createPlayer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePlayer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
