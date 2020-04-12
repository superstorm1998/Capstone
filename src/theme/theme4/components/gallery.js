import {
  CardActionArea,
  CardMedia,
  Dialog,
  Grid,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import {
  getDataByPageNumber,
  setGalleriesToSiteView,
  updateNavItemValue,
} from "../../../actions";

const useStyles = (theme) => ({
  gridItems: {
    // maxHeight: 250
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  media: {
    paddingTop: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "100%",
  },
  dialogMedia: {
    height: "600px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  // paginationItemRoot: {
  //   color: "#fff",
  // },
  paginationItemSelected: {
    backgroundColor: "#fff !important",
    color: "#000 !important",
  },
  showMore: {
    marginTop: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

class Gallery extends React.Component {
  state = {
    img: "",
    open: false,
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitGallery
      : this.props.siteView.limitGallery,
    page: 1,
    count: this.props.isEdit
      ? this.props.siteEdit.limitGallery
      : this.props.siteView.limitGallery,
  };

  handlePageViewClick = async (event, newValue) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setGalleriesToSiteView,
    } = this.props;
    if (!isEdit) {
      this.setState({ pageView: newValue });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "gallery",
        pageNumber: newValue,
      });
      data && setGalleriesToSiteView(data);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenDialog = (image) => {
    this.setState({ img: image, open: true });
  };

  handleShowMore = () => {
    this.setState({ itemPerPage: this.state.itemPerPage + this.state.count });
  };

  render() {
    const {
      classes,
      galleries,
      isEdit,
      pageCount,
      titleEdit,
      titleView,
      pageCountView,
    } = this.props;
    const { offset, itemPerPage, page } = this.state;
    const useStyles = () => ({
      showMore: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: "#E8634E",
        textAlign: "center",
        fontSize: 20,
        lineHeight: "1.4em",
        textAlign: "center",
        textDecoration: "underline",
      },
    });
    const showMore = useStyles();
    return (
      <React.Fragment>
        <Grid container justify="center" xs={12}>
          <Grid container item xs={12} justify="center">
            {isEdit
              ? galleries
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 5
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .map((item, index) => (
                    <Grid
                      item
                      key={index}
                      xs={10}
                      sm={4}
                      className={classes.gridItems}
                    >
                      <CardActionArea style={{ height: "100%" }}>
                        <CardMedia
                          className={classes.media}
                          image={item && item.url}
                          title="Gallery image"
                          onClick={() =>
                            this.handleOpenDialog(item && item.url)
                          }
                        />
                      </CardActionArea>
                    </Grid>
                  ))
              : galleries.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={4}
                    className={classes.gridItems}
                  >
                    <CardActionArea style={{ height: "100%" }}>
                      <CardMedia
                        className={classes.media}
                        image={item && item._id && item._id.url}
                        onClick={() =>
                          this.handleOpenDialog(
                            item && item._id && item._id.url
                          )
                        }
                      />
                    </CardActionArea>
                  </Grid>
                ))}
          </Grid>
          {isEdit
            ? pageCount > 1 &&
              itemPerPage < galleries.length && (
                <Grid
                  container
                  item
                  xs={6}
                  justify="center"
                  className={classes.showMore}
                  style={showMore.showMore}
                >
                  <p onClick={() => this.handleShowMore()}>Show More</p>
                </Grid>
              )
            : galleries.length > itemPerPage && (
                <Grid
                  container
                  item
                  xs={6}
                  justify="center"
                  style={showMore.showMore}
                >
                  Show More
                </Grid>
              )}
        </Grid>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            elevation: 0,
            style: {
              backgroundColor: "unset",
              overflow: "hidden",
            },
          }}
        >
          <CardMedia
            className={classes.dialogMedia}
            image={this.state.img}
            title="Gallery image"
            style={{ backgroundSize: "contain" }}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  pageCountView: state.post.pageCountGalleriesView,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setGalleriesToSiteView: (galleries) =>
    dispatch(setGalleriesToSiteView(galleries)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Gallery));
