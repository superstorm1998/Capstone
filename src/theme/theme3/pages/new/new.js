import { Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import PostTypeComponent from "../../../component/postsType";
import styles from "./new.module.css";

class NewPage extends Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteView,
      siteEdit,
      bodyEdit,
      bodyView,
      fromHome,
      homeList,
      homeTitle,
      postView,
    } = this.props;
    return (
      <Grid container justify="center" className={styles.news}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom
            className={styles.title}
            style={{
              color: "white",
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
            }}
          >
            {fromHome ? homeTitle : "News"}
          </Typography>
        </Grid>
        <Grid item container sm={12} xs={12} container justify="center">
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container justify="center">
                <PostTypeComponent
                  key={siteEdit.limitNews}
                  fromHome={fromHome}
                  posts={(fromHome && homeList
                    ? homeList
                    : siteEdit.posts
                  ).filter(function (pos) {
                    return pos.isActive === true;
                  })}
                  pageCount={Math.ceil(
                    (fromHome && homeList ? homeList : siteEdit.posts).filter(
                      function (pos) {
                        return pos.isActive === true;
                      }
                    ).length / siteEdit.limitNews
                  )}
                  bgWhite={true}
                  dark
                />
              </Grid>
            ) : (
              <Grid item container sm={12} xs={12} container justify="center">
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: bodyEdit.fontFamily,
                    color: "white",
                    padding: "5rem 0",
                  }}
                >
                  Currently there are no news.
                </Typography>
              </Grid>
            )
          ) : (siteView && siteView.posts) || (fromHome && homeList) ? (
            <Grid item container sm={12} xs={12} container justify="center">
              <PostTypeComponent
                fromHome={fromHome}
                posts={fromHome && homeList ? homeList : siteView.posts}
                siteInfo={{
                  logo: siteView.logo,
                  title: siteView.title,
                  sitePath: siteView.sitePath,
                }}
                postView={postView}
                dark
              />
            </Grid>
          ) : (
            <Grid item container sm={12} xs={12} container justify="center">
              <Typography
                variant="body1"
                style={{
                  fontFamily: bodyView.fontFamily,
                  color: "white",
                  padding: "5rem 0",
                }}
              >
                Currently there are no news.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(NewPage);
