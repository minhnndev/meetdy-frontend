import "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import {
  PersistQueryClientProvider,
  persistOptions,
  queryClient,
} from "@/queries/core";
import ComposeProviders from "@/components/Providers/ComposeProviders";
import Routes from "@/routes";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={persistOptions}
      >
        <ComposeProviders components={[RecoilRoot]}>
          <Routes />
        </ComposeProviders>
      </PersistQueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
