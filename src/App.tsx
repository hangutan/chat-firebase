import React, { useEffect } from "react";
import { History } from "history";
import styled, { ThemeProvider } from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import Routes from "routers";
import theme from "config/theme";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { reducerType } from "redux/reducers";
import Loading from "components/Loading";
import AlertDialog from "components/Alert";

import { GET_PROVINCE } from "redux/reducers/province/actionTypes";

type AppProps = {
  history: History;
  dispatch: Dispatch;
};

const AppContainer = styled.div`
  background-color: #f4f6f8;
  min-height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 44px;
`;

const App = ({ history, dispatch }: AppProps) => {
  const listProvince = useSelector(
    (state: reducerType) => state.province.listProvince
  );

  const loading = useSelector((state: reducerType) => state.init.loading);

  useEffect(() => {
    if (listProvince.length <= 0) {
      innitGetProvince();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const innitGetProvince = () => {
    dispatch({
      type: GET_PROVINCE,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <AppContainer>
          {loading && <Loading />}
          {/* <AlertDialog open={true} title="Text nha" /> */}
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </AppContainer>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
