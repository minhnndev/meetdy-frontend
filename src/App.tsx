import "./reportWebVitals";
import "./App.css";
import { RecoilRoot } from "recoil";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import {
  PersistQueryClientProvider,
  persistOptions,
  queryClient,
} from "@/queries/core";
import ComposeProviders from "@/components/Providers/ComposeProviders";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const AppTestUI = () => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

function App() {
  return (
    <ReduxProvider store={store}>
      <ComposeProviders components={[RecoilRoot]}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={persistOptions}
        >
          <AppTestUI />
        </PersistQueryClientProvider>
      </ComposeProviders>
    </ReduxProvider>
  );
}

export default App;
