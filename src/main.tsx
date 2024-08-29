import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./app/api/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
