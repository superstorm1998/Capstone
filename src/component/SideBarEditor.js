import React from "react";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Tabs,
  Tab,
  Grid,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateTabValue, saveDesignSite } from "../actions";
import DesignTab from "./DesignEditorTab";
import PagesEditorTab from "./PagesEditorTab";
import SettingEditorTab from "./SettingEditorTab";

const useStyles = theme => ({
  root: {
    height: "100vh"
  },
  drawer: {
    flexShrink: 0,
    height: "100%"
  },
  drawerPaper: {
    padding: "0.5rem",
    position: "relative",
    height: "100%"
  }
});

const tabStyles = {
  textTransform: "none",
  minWidth: "5vh",
  "&:hover": {
    color: "#40a9ff",
    opacity: 1
  },
  "&$selected": {
    color: "#1890ff"
  },
  "&:focus": {
    color: "#40a9ff"
  }
};

class ClippedDrawer extends React.Component {
  render() {
    const {
      classes,
      tabValue,
      updateTabValue,
      saveDesignSite,
      site
    } = this.props;

    return (
      <AppBar className={classes.root} position="sticky">
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Tabs
            value={tabValue}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            centered
            onChange={(e, newValue) => updateTabValue(newValue)}
          >
            <Tab style={tabStyles} label="Design" />
            <Tab style={tabStyles} label="Page" />
            <Tab style={tabStyles} label="Setting" />
          </Tabs>
          {tabValue === 0 && <DesignTab />}
          {tabValue === 1 && <PagesEditorTab />}
          {tabValue === 2 && <SettingEditorTab />}
          <Grid container justify="center">
            <Button
              style={{ marginTop: "1rem" }}
              variant="contained"
              size="large"
              color="primary"
              onClick={() => saveDesignSite(site)}
              fullWidth
            >
              Save
            </Button>
          </Grid>
        </Drawer>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  tabValue: state.tab.value,
  site: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({
  saveDesignSite: site => dispatch(saveDesignSite(site)),
  updateTabValue: value => dispatch(updateTabValue(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ClippedDrawer));
