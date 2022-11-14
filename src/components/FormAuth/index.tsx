import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import LoginForm from "./components/FormLogin";
import SignUpForm from "./components/FormSignUp";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
// import TwitterLogin from "react-twitter-login";
import ButtonShadow from "components/ButtonShadow";
import Grid from "@material-ui/core/Grid";
import { SET_MESSAGES_REDUCER } from "redux/reducers/messages/actionTypes";
import { useDispatch } from "react-redux";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface FormProps {
  login: Function;
  openUrl: Function;
  handleChangeTitle: Function;
}

const FormAuth = React.memo((props: FormProps) => {
  const { login, openUrl } = props;
  const classes = styles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    props.handleChangeTitle(
      newValue === 0 ? "SERVICE_PROVIDER_LOGIN" : "SERVICE_PROVIDER_SIGNUP"
    );
    setValue(newValue);
  };

  const translate = useTranslation().t;

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          className={classes.tabContainer}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            className={classes.tab}
            label={translate("SIGN_IN")}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label={translate("SIGN_UP")}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoginForm openUrl={openUrl} login={login} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignUpForm openUrl={openUrl} login={login} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
});
export default FormAuth;
