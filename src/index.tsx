import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { configureStore, history } from "redux/configureStore";
// import TagManager, { TagManagerArgs } from "react-gtm-module";

// import { rootSaga } from "redux/sagas";
import "i18n";
import "index.css";
import "asset/css/line-awesome.min.css";
import App from "App";
import { PersistGate } from "redux-persist/integration/react";
import "./firebase-init";

// import { Helmet } from "react-helmet";

const { store, persistor } = configureStore();

ReactDOM.render(
  <>
    {/* <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Helmet> */}
    <AppContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App history={history} dispatch={store.dispatch} />
        </PersistGate>
      </Provider>
    </AppContainer>
  </>,
  document.getElementById("root")
);
