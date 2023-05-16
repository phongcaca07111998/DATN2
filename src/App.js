import "./App.css";
import Chatbot from "./Components/chatbot/chatbot";
import { Routerr } from "./Router/router";
import { memo } from "react";
function App() {
  return (
    <div>
      <Routerr />
      <Chatbot/>
    </div>
  );
}

export default memo(App);
