import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  withStyles
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import moment from "moment";
import React from "react";
import ReactPaginate from "react-paginate";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Truncate from "react-truncate";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "28rem",
    border: style => "0.5px solid" + style.color
    // "&:hover": {
    //   border: style => "1.5px solid" + style.color
    // }
  },
  message: {
    paddingLeft: "0.5rem"
  },
  title: {
    overflow: "hidden",
    paddingLeft: "1rem"
  },
  cardMediaAlbum: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain"
  },
  cardMedia: {
    height: "50vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden"
  },
  album: {
    height: "50vh",
    background: "rgba(24, 20, 20, 0.5)"
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingBottom: 0,
    overflow: "hidden"
  },
  cardHeader: {
    padding: "0.5rem"
  },
  avatar: {
    width: "2rem",
    height: "2rem"
  },
  gridItems: {
    maxHeight: 350
  },
  btnReadMore: {
    border: style => "0.5px solid" + style.color,
    color: style => style.color,
    "&:hover": {
      border: style => "1.5px solid" + style.color,
      color: "white",
      background: style => style.color
    }
  }
}));

const gridStyle = theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3)
  },

  images: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "-webkit-fill-available",
    maxHeight: "100%",
    maxWidth: "100%"
  }
});

const cardTitle = {
  fontSize: "11px",
  fontFamily: "Segoe UI"
};

function TypeAlbum({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );

  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily
  };
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          <CardActionArea>
            <CardMedia
              onClick={() => openDialog(post)}
              className={classes.cardMediaAlbum}
              image={post.attachments.images[0]}
            >
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.album}
              >
                <Typography variant="h3" style={{ color: "white" }}>
                  {post.attachments.images.length} +
                </Typography>
              </Grid>
            </CardMedia>
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <div style={{ padding: "0.5rem" }}>
              <Truncate
                style={{ ...txtStyle }}
                lines={1}
                ellipsis={<span> ...</span>}
              >
                {post.message}
              </Truncate>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypePhoto({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily
  };
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          <CardActionArea>
            <CardMedia
              onClick={() => openDialog(post)}
              className={classes.cardMedia}
              image={post.attachments.images[0]}
            />
          </CardActionArea>

          <CardContent
            className={classes.cardContent}
            style={{ paddingBottom: "0.5rem" }}
          >
            {post.message && (
              <div style={{ padding: "0.5rem" }}>
                <Truncate
                  style={{ ...txtStyle }}
                  lines={1}
                  ellipsis={<span> ...</span>}
                >
                  {post.message}
                </Truncate>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypeVideo({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily
  };
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          <CardActionArea>
            <ReactPlayer
              onClick={() => openDialog(post)}
              url={post && post.attachments && post.attachments.video}
              controls={true}
              width="100%"
              height="50vh"
            />
          </CardActionArea>

          <CardContent className={classes.cardContent}>
            {post.message && (
              <div style={{ padding: "0.5rem" }}>
                <Truncate
                  style={{ ...txtStyle }}
                  lines={1}
                  ellipsis={<span> ...</span>}
                >
                  {post.message}
                </Truncate>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

class PostTypeComponent extends React.Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 6, // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
    open: false,
    postOpen: null,
    openVideo: false
  };

  setListData = listData => {
    this.setState({
      filteredData: listData
    });
  };

  setPageCount = listData => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage)
    });
  };

  getPosts = async () => {
    const { posts } = this.props;
    this.setState({
      filteredData: posts.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      ),
      pageCount: Math.ceil(posts.length / this.state.itemPerPage)
    });
  };

  componentDidMount() {
    const { posts } = this.props;
    if (posts && posts.length > 0) {
      this.getPosts();
    }
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.posts.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  handleOpen = post => {
    this.setState({
      open: true,
      postOpen: post
    });
  };

  handleOpenVideo = post => {
    this.setState({
      openVideo: true,
      postOpen: post
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      postOpen: null,
      openVideo: false
    });
  };

  render() {
    const {
      classes,
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteInfo
    } = this.props;
    const post = this.state.postOpen;
    const style = {
      isEdit: isEdit,
      titleEdit: titleEdit,
      titleView: titleView,
      bodyEdit: bodyEdit,
      bodyView: bodyView
    };
    return (
      <Container>
        <Grid
          container
          spacing={5}
          justify="center"
          style={{ marginTop: "5rem" }}
        >
          {this.state.filteredData.map(
            (post, index) =>
              (post.attachments.media_type === "photo" && post.isActive && (
                <TypePhoto
                  key={index}
                  post={post}
                  style={style}
                  dark={this.props.darkMode}
                  openDialog={this.handleOpen}
                  siteInfo={siteInfo}
                />
              )) ||
              (post.attachments.media_type === "album" && post.isActive && (
                <TypeAlbum
                  key={index}
                  post={post}
                  style={style}
                  dark={this.props.darkMode}
                  openDialog={this.handleOpen}
                  siteInfo={siteInfo}
                />
              )) ||
              (post.attachments.media_type === "video" && post.isActive && (
                <TypeVideo
                  key={index}
                  post={post}
                  style={style}
                  dark={this.props.darkMode}
                  openDialog={this.handleOpenVideo}
                  siteInfo={siteInfo}
                />
              ))
          )}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth={
              this.state.postOpen &&
              this.state.postOpen.attachments.media_type === "album"
                ? "md"
                : "sm"
            }
          >
            <Container className={classes.root}>
              <Grid container spacing={3} justify="center">
                {post &&
                  post.attachments.images &&
                  post.attachments.images.map((img, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={10}
                      md={8}
                      className={classes.girdItems}
                    >
                      <img src={img} alt="" className={classes.images} />
                    </Grid>
                  ))}
              </Grid>
              <Grid container className={classes.root} justify="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    style={isEdit ? bodyEdit : bodyView}
                  >
                    {post && post.message}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Dialog>
          {/* dialogue for video type */}
          <Dialog
            open={this.state.openVideo}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
          >
            <Container className={classes.root}>
              <Grid container spacing={3} justify="center">
                <ReactPlayer
                  url={post && post.attachments && post.attachments.video}
                  controls={true}
                  width="100%"
                  height="50%"
                />
              </Grid>
              <Grid container className={classes.root} justify="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    style={isEdit ? bodyEdit : bodyView}
                  >
                    {post && post.message}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Dialog>
        </Grid>
        {this.state.pageCount > 1 && (
          <Grid container justify="center" style={{ marginTop: "5rem" }}>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Grid>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView
});

export default connect(
  mapStateToProps,
  null
)(withStyles(gridStyle)(PostTypeComponent));
