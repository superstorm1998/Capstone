import { Grid, CardMedia, Typography, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
class Theme1About extends React.Component {
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };

  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      fromHome,
      homeTitle,
    } = this.props;
    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: "#E8634E",
        textAlign: "center",
        fontSize: 36,
        lineHeight: "1.4em",
        fontWeight: "600",
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#E8634E",
        textAlign: "left",
        fontSize: 20,
        lineHeight: "normal",
        letterSpacing: "normal",
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#E8634E",
        textAlign: "center",
        fontSize: 20,
        lineHeight: "normal",
        letterSpacing: "normal",
      },
      changableBody5: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#E8634E",
        textAlign: "center",
        fontSize: 24,
        lineHeight: "normal",
        letterSpacing: "normal",
        fontWeight: "bold",
        paddingBottom: "2rem",
      },
    });
    const classes = useStyles();
    return (
      <Grid container justify="center">
        {homeTitle && (
          <Grid
            container
            alignItems="center"
            item
            sm={10}
            xs={12}
            style={{ padding: "2rem 0" }}
          >
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: "rgba(198, 196, 173, 1)",
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
            <Grid item xs={6} sm={4} style={classes.changableTitle}>
              {fromHome
                ? homeTitle
                : isEdit
                ? siteEdit &&
                  siteEdit.navItems &&
                  siteEdit.navItems.find((item) => item.original === "about")
                    .name
                : siteView &&
                  siteView.navItems &&
                  siteView.navItems.find((item) => item.original === "about")
                    .name}
            </Grid>
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: "rgba(198, 196, 173, 1)",
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
          </Grid>
        )}

        {fromHome ? (
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignContent="center"
            style={{ padding: "2.5rem 0" }}
          >
            <Grid item xs={11} sm={9}>
              <p style={classes.changableBody4}>
                {isEdit && siteEdit && siteEdit.about}
                {!isEdit && siteView && siteView.about}
                {isEdit && !siteEdit.about && "Welcome to our website!"}
                {!isEdit && !siteView.about && "Welcome to our website!"}
              </p>
            </Grid>

            {isEdit
              ? siteEdit &&
                siteEdit.story &&
                siteEdit.story.composedText && (
                  <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                    style={{ padding: "2rem 0" }}
                  >
                    <Grid item xs={12} style={classes.changableBody5}>
                      Our Story
                    </Grid>
                    <Grid container item xs={8} sm={3}>
                      <CardMedia
                        component="img"
                        style={{ height: "100%" }}
                        image={this.renderImage()}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={10}
                      sm={5}
                      alignItems="center"
                      justify="center"
                      style={{ padding: "1rem" }}
                    >
                      <Typography
                        variant="body1"
                        style={classes.changableBody3}
                      >
                        {siteEdit.story.composedText.map((text) => {
                          const originalText = text.split("\n");
                          return originalText.map((val, index) => (
                            <React.Fragment key={index}>
                              {val}
                              <br />
                            </React.Fragment>
                          ));
                        })}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              : siteView &&
                siteView.story &&
                siteView.story.composedText && (
                  <Grid
                    container
                    item
                    xs={11}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} style={classes.changableBody5}>
                      Our Story
                    </Grid>
                    <Grid container item xs={10} sm={3}>
                      <CardMedia
                        component="img"
                        style={{ height: "100%" }}
                        image={this.renderImage()}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={10}
                      sm={5}
                      style={{ padding: "1rem" }}
                    >
                      <Typography
                        variant="body1"
                        style={classes.changableBody3}
                      >
                        {siteView.story.composedText.map((text) => {
                          const originalText = text.split("\n");
                          return originalText.map((val, index) => (
                            <React.Fragment key={index}>
                              {val}
                              <br />
                            </React.Fragment>
                          ));
                        })}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignContent="center"
            style={{ padding: "2.5rem 0" }}
          >
            <Grid container item xs={12} sm={3}>
              <CardMedia
                component="img"
                style={{ height: "100%" }}
                image={this.renderImage()}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={5}
              alignItems="center"
              justify="center"
            >
              <Grid item xs={10}>
                <p style={classes.changableBody3}>
                  {isEdit && siteEdit && siteEdit.about}
                  {!isEdit && siteView && siteView.about}
                  {isEdit && !siteEdit.about && "Welcome to our website!"}
                  {!isEdit && !siteView.about && "Welcome to our website!"}
                </p>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
});

export default connect(mapStateToProps, null)(Theme1About);
