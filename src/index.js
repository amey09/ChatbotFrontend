import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ChakraProvider, theme} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);