import "backpack.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "../store/store";
import MainPage from "../components/mainPage/MainPage";

const App: React.FC = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
);

export default App;
