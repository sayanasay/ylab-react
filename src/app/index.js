import React from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./item-page";

/**
 * Приложение
 */
function App() {
  const select = useSelector((state) => ({
    name: state.modals.name,
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/:slug" element={<ItemPage />} />
      </Routes>
      {select.name === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default React.memo(App);
