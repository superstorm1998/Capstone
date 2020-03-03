import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./about.module.css";

class AboutPage extends React.Component {
  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteEdit,
      siteView
    } = this.props;
    return (
      <Grid container justify="center" className={styles.about_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
            style={isEdit ? titleEdit : titleView}
          >
            About
          </Typography>
          <Divider className="divider" variant="middle" />
        </Grid>
        <Grid container item sm={10} xs={10} justify="flex-start">
          <Typography
            variant="body1"
            color="textPrimary"
            style={isEdit ? bodyEdit : bodyView}
          >
            {isEdit
              ? siteEdit && siteEdit.length > 0
                ? siteEdit.about
                : "  Welcome to our website! Take a look around and feel free to contact us for more information."
              : siteView && siteView.length > 0
              ? siteView.about
              : "  Welcome to our website! Take a look around and feel free to contact us for more information."}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(AboutPage);
