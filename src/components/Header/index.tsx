import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RoomIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";
import MdSearch from "react-ionicons/lib/MdSearch";
import useStyles from "./styles";
import chatboxImg from "asset/img/chatbox.png";
// import logo from "asset/img/Asset-2.png";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

export interface HeaderBarProps {
  clickOpenMenu: Function;
  menuIsOpen: boolean;
  setIsOpenSearch: Function;
  isOpenSearch: boolean;
}

const HeaderBar = React.memo((props: HeaderBarProps) => {
  const classes = useStyles();
  const { menuIsOpen, isOpenSearch, setIsOpenSearch } = props;
  const [chooseLocate, setChooseLocate] = React.useState(false);
  const dispatch = useDispatch();
  const openUrl = (url) => {
    dispatch(push(url));
  };
  const clickOpenMenu = () => {
    props.clickOpenMenu(!menuIsOpen);
  };
  React.useEffect(() => {
    if (Boolean(JSON.parse(sessionStorage.getItem("@ecyeh_block_location")))) {
      setChooseLocate(true);
    }
  }, []);
  return (
    <div className={classes.root}>
      <AppBar className={classes.toolbar} position="static">
        <Toolbar className={classes.containerHeader}>
          <IconButton
            onClick={() => clickOpenMenu()}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={() => setChooseLocate(true)}
            className={classes.roomBtn}
          >
            <RoomIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Finding Your Way in PA
            {/* <img src={logo} width={100} height={40} alt="chatbox" /> */}
          </Typography>

          <IconButton
            onClick={() => setIsOpenSearch(true)}
            className={classes.pr0}
          >
            <MdSearch color="white" fontSize="24px" />
          </IconButton>
          <IconButton
            onClick={() => openUrl("/chatbot")}
            className={classes.iconphone}
            edge="end"
            color="inherit"
          >
            <img src={chatboxImg} width={24} height={24} alt="chatbox" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
});
export default HeaderBar;
