import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";
import Navbar from "./components/TextEditor/Navbar";
function App() {
  return (
    <>
    <Navbar />
      <Provider store={userStore}>
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
