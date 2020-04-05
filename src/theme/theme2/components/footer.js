import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Divider, Grid, IconButton, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../../../component/link";
import styles from "./index.module.css";

class FooterPage extends Component {
  renderUrl = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="2x" />;
    } else {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="2x" />;
    }
  };

  renderInstagram = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="2x" />;
    } else {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="2x" />;
    }
  };

  renderYoutube = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="2x" />;
    } else {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="2x" />;
    }
  };

  renderWhatsapp = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="2x" />;
    } else {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="2x" />;
    }
  };

  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteEdit,
      siteView,
      youtube,
      instagram,
      whatsapp
    } = this.props;
    return (
      <Grid container direction="row" className={styles.footer}>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography
            variant="h5"
            style={isEdit ? titleEdit : titleView}
            color="primary"
          >
            ABOUT
          </Typography>
          <Typography component="div"
            style={{
              fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
              fontWeight: 400,
              color: "#fefbfc",
              textAlign: "left",
              fontSize: 16,
            }}>
            {isEdit
              ? siteEdit && siteEdit.about
                ? siteEdit.about
                : "Welcome to our website! Take a look around and feel free to contact us for more information."
              : siteView && siteView.about
                ? siteView.about
                : "Welcome to our website! Take a look around and feel free to contact us for more information."}
          </Typography>
          <Divider className="divider" variant="fullWidth" />
          <Grid
            container
            item
            justify="flex-start"
            xs={12}
            style={{ marginTop: "4rem" }}
          >
            {(siteEdit && siteEdit.url) || (siteView && siteView.url) ? (
              <Grid item>
                <IconButton
                  aria-label=""
                  color="primary"
                  href={
                    isEdit ? siteEdit && siteEdit.url : siteView && siteView.url
                  }
                >
                  {this.renderUrl()}
                </IconButton>
              </Grid>
            ) : null}
            {(instagram && instagram) || (siteView && siteView.instagram) ? (
              <Grid
                item
                style={
                  isEdit
                    ? instagram
                      ? null
                      : { display: "none" }
                    : siteView.instagram
                      ? null
                      : { display: "none" }
                }>
                <IconButton
                  aria-label=""
                  color="primary"
                  href={`https://instagram.com/${
                    isEdit ? instagram : siteView.instagram
                    }`}
                >
                  {this.renderInstagram()}
                </IconButton>
              </Grid>
            ) : null}
            {(siteView && siteView.youtube) || (youtube && youtube) ? (
              <Grid
                item
                style={
                  isEdit
                    ? youtube
                      ? null
                      : { display: "none" }
                    : siteView.youtube
                      ? null
                      : { display: "none" }
                }>
                <IconButton
                  aria-label=""
                  color="primary"
                  href={isEdit ? youtube : siteView.youtube}
                >
                  {this.renderYoutube()}
                </IconButton>
              </Grid>
            ) : null}
            {(siteView && siteView.whatsapp) || (whatsapp && whatsapp) ? (
              <Grid
                item
                style={
                  isEdit
                    ? whatsapp
                      ? null
                      : { display: "none" }
                    : siteView.whatsapp
                      ? null
                      : { display: "none" }
                }>
                <IconButton
                  aria-label=""
                  color="primary"
                  href={`https://wa.me/${
                    isEdit ? whatsapp : siteView.whatsapp
                    }`}
                >
                  {this.renderWhatsapp()}
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography
            variant="h5"
            style={isEdit ? titleEdit : titleView}
            color="primary"
          >
            QUICK LINKS
          </Typography>
          <Grid container justify="flex-start" direction="column">
            {isEdit
              ? siteEdit.navItems.map((item, index) => (
                <Grid
                  item
                  xs={4}
                  sm={8}
                  key={index}
                  style={{ paddingBottom: "0.7rem" }}
                >
                  <Box
                    style={{
                      ...bodyEdit,
                      color: "#fefbfc"
                    }}
                  >
                    {item.name}
                  </Box>
                </Grid>
              ))
              : siteView.navItems.map((item, index) => (
                <Grid
                  item
                  xs={4}
                  sm={8}
                  key={index}
                  style={{ paddingBottom: "0.7rem" }}
                >
                  <Link
                    style={{
                      ...bodyView,
                      color: "#fefbfc"
                    }}
                    to={`/${siteView.sitePath}/${item.original}`}
                  >
                    {item.name}
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12} className={styles.content}>
          {/* <Typography
            variant="h5"
            style={isEdit ? titleEdit : titleView}
            color="primary"
            className={styles.footerTitle}
          >
            SIGN UP FOR OUR NEWSLETTER
          </Typography>
          <Typography variant="body1" style={isEdit ? bodyEdit : bodyView}>
            Get exclusive updates and promotions straight to your email.
          </Typography> */}
        </Grid>
        <Divider className={styles.bot_divider} variant="fullWidth" />
        <Grid item sm={12} xs={12} container className={styles.bot_footer}>
          <Grid item sm={9} container justify="flex-start">
            <Typography
              style={{
                fontWeight: 400,
                color: "#7c7c7c",
                textAlign: "left",
                fontSize: 16,
              }}>
              © {isEdit ? siteEdit.title : siteView.title}
            </Typography>
          </Grid>
          <Grid item sm={3} container justify="center">
            <Typography
              style={{
                fontFamily: "pv-common",
                fontWeight: 400,
                color: "#fefbfc",
                textAlign: "right",
                fontSize: 24,
              }}>POWERED BY FPWG</Typography>
          </Grid>
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
  bodyView: state.site.bodyView,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp
});

export default connect(mapStateToProps, null)(FooterPage);
