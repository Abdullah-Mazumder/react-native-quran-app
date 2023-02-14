import store from "./src/store/store";
import { Provider } from "react-redux";
import MainApp from "./src/MainApp";
import CustomStatusBar from "./src/components/CustomStatusBar";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <CustomStatusBar />
        <MainApp />
      </Provider>
    </>
  );
};

export default App;
