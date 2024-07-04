import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
// Notistack
import { SnackbarProvider } from "notistack";
// REDUX
import { store } from "redux/store";
import App from "App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000} preventDuplicate={true} >
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
