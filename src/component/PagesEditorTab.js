import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  Button,
  Table,
  TableCell,
  TableRow,
  Avatar,
  Divider,
  TableHead,
  TableBody,
  TableContainer,
  Checkbox,
  DialogContent,
  DialogTitle,
  InputBase,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import moment from "moment";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/DragHandle";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { connect } from "react-redux";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import {
  changeNavItemName,
  changeNavItems,
  savePosts,
  setActiveNavItems,
  setActivePost,
  updateNavItemValue,
  setEventCustomize,
  setLimit,
  setAboutCustomize,
  setPostMode,
  changeSiteStoryTitle,
  changeSiteStory,
  changeSiteAbout,
} from "../actions";
import ReactPaginate from "react-paginate";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

const useStyles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90,
  },
  title: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "600",
    color: "#555d66",
    fontSize: 14,
  },
  title2: {
    fontSize: "12px",
    marginTop: "0.25rem",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#555d66",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b4c0cf",
    padding: "1rem",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important",
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important",
  },
  pickerButton: {
    margin: 0,
    backgroundColor: "white",
    marginBottom: "0.2rem",
  },
  customButton: {
    border: "1px solid #0071a1",
    borderRadius: 5,
    color: "#0071a1",
    fontSize: 11,
  },
  logoButton: {
    marginTop: 5,
    border: "1px solid #555d66",
    borderRadius: 5,
    color: "#555d66",
    borderStyle: "dashed",
    fontSize: 13,
    height: 40,
    width: "100%",
    "&:hover": {
      backgroundColor: "white",
    },
    fontFamily: "Roboto, sans-serif",
  },
  fontPickerRoot: {
    width: "100% !important",
  },
  inputTitle: {
    fontFamily: "Roboto, sans-serif !important",
    fontSize: 13,
    color: "#555d66",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  gridItem: {
    marginTop: "1rem",
    zIndex: "999999",
    border: "1px solid #dddddd",
    width: "100%",
    backgroundColor: "#f0eded",
    "&:hover": {
      transitionDuration: "0.5s",
      // border: "1px solid #0074aa",
      color: "#0074aa",
      // borderLeft: "4px solid #0074aa",
    },
  },
});

const gridContainer = {};

const viewButton = {
  color: "black",
};

const gridItem = {
  padding: "0.2rem 0.5rem",
  zIndex: "999999",
  backgroundColor: "white",
  border: "1px solid #dddddd",
};

const DragHandle = sortableHandle(() => (
  <MenuIcon style={{ color: "#555d66", cursor: "move" }} />
));

function handleChangeActive(id, site, setActiveNavItems, updateNavItemValue) {
  const index =
    site && site.navItems && site.navItems.find((e) => e._id === id);
  if (index.isActive) {
    index.isActive = false;
    updateNavItemValue(0);
  } else {
    index.isActive = true;
  }
  setActiveNavItems(site);
}

function handleChangeNavName(id, site, newName, changeNavItemName) {
  const index =
    site && site.navItems && site.navItems.find((e) => e._id === id);
  index.name = newName;
  changeNavItemName(index);
}

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const columns = ["", "Title", "Message", "Created At", "Show"];

function PostsList({ filteredData, setActivePost }) {
  return (
    <>
      <TableContainer style={{ height: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell align="center" key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {(row.attachments &&
                      row.attachments.media_type === "photo" && (
                        <Avatar
                          src={row.attachments && row.attachments.images[0]}
                        />
                      )) ||
                      (row.attachments &&
                        row.attachments.media_type === "video" && (
                          <Avatar
                            src={row.attachments && row.attachments.video}
                          />
                        )) ||
                      (row.attachments &&
                        row.attachments.media_type === "album" && (
                          <Avatar
                            src={row.attachments && row.attachments.images[0]}
                          />
                        ))}
                  </TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">
                    <Grid
                      style={{
                        maxWidth: "20rem",
                        height: "2.5rem",
                        overflow: "hidden",
                      }}
                    >
                      {row.message}
                    </Grid>
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.createdTime).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <GreenCheckbox
                      checked={row.isActive}
                      onChange={() => setActivePost(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const SortableItem = sortableElement(
  ({
    value,
    site,
    item,
    setActiveNavItems,
    updateNavItemValue,
    changeNavItemName,
    classes,
  }) => (
      <Grid container style={gridItem}>
        <Grid
          container
          item
          alignItems="center"
          xs={10}
          sm={12}
          md={10}
          style={{ padding: "0.2rem 0" }}
        >
          <Grid container justify="center" item xs={2} md={2} sm={12}>
            <DragHandle />
          </Grid>
          <Grid item xs={10} md={10} sm={12}>
            <TextField
              // autoFocus={
              //   this.state.currentFocusInput === item._id ? true : false
              // }
              // onClick={(e) => this.setState({ currentFocusInput: item._id })}
              InputLabelProps={{
                classes: {
                  focused: classes.focused,
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.inputTitle,
                },
              }}
              size="small"
              style={{ backgroundColor: "white" }}
              fullWidth
              variant={"outlined"}
              value={value}
              inputProps={{
                maxLength: 15,
              }}
              onChange={(e) => {
                handleChangeNavName(
                  item._id,
                  site,
                  e.target.value,
                  changeNavItemName
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid container item justify="center" xs={2} sm={12} md={2}>
          {item.original === "home" ? (
            <></>
          ) : (
              <IconButton
                style={viewButton}
                onClick={() =>
                  handleChangeActive(
                    item._id,
                    site,
                    setActiveNavItems,
                    updateNavItemValue
                  )
                }
              >
                {item.isActive && item.name !== "Home" ? (
                  <VisibilityOutlinedIcon style={{ color: "#555d66" }} />
                ) : (
                    <VisibilityOffOutlinedIcon style={{ color: "#555d66" }} />
                  )}
              </IconButton>
            )}
        </Grid>
      </Grid>
    )
);

const SortableList = sortableContainer(
  ({
    items,
    site,
    setActiveNavItems,
    updateNavItemValue,
    changeNavItemName,
    classes,
  }) => {
    if (items) {
      return (
        <Grid container style={gridContainer} alignItems="center">
          {items.map((value, index) => (
            <SortableItem
              key={index}
              index={index}
              value={value.name}
              item={value}
              site={site}
              setActiveNavItems={setActiveNavItems}
              updateNavItemValue={updateNavItemValue}
              changeNavItemName={changeNavItemName}
              classes={classes}
            />
          ))}
        </Grid>
      );
    }
    return <></>;
  }
);

class PagesEditorTab extends React.Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 3,
    openDiag: false,
    currentFocusInput: "",
    previousExpandItem: "",
    isExpanding: false,
    currentExpandItem: "",
    hover: {
      expanTab: 1,
      onHover: false,
    },
  };

  setPageCount = (listData) => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage),
    });
  };

  setPosts = () => {
    const { posts } = this.props;
    const slicePosts = posts.slice(
      this.state.offset,
      this.state.itemPerPage + this.state.offset
    );
    this.setState({
      filteredData: slicePosts,
    });
    this.setPageCount(posts);
  };

  componentDidMount() {
    const { posts } = this.props;
    if (posts) {
      this.setPosts();
    }
  }

  setStatePost = (posts) => {
    this.setState({ filteredData: [...posts] });
  };

  handleChangeStory = (e) => {
    this.props.changeSiteStory(e.target.value);
  };

  handleChangeStoryTitle = (e) => {
    this.props.changeSiteStoryTitle(e.target.value);
  };

  handleChangeAbout = (e) => {
    this.props.changeSiteAbout(e.target.value);
  };

  handleSetLimit = (type) => (event) => {
    let val = event.target.value;
    if (val < 1) val = 1;
    // if (val > 10) val = 10;

    if (type === 0) {
      this.props.setLimit(
        val,
        this.props.site.limitEvent,
        this.props.site.limitGallery
      );
    }
    if (type === 1) {
      this.props.setLimit(
        this.props.site.limitNews,
        val,
        this.props.site.limitGallery
      );
    }
    if (type === 2) {
      this.props.setLimit(
        this.props.site.limitNews,
        this.props.site.limitEvent,
        val
      );
    }
  };

  handlePageClick = (data) => {
    const { posts } = this.props;
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);
    this.setState({ offset: offset }, () => {
      const slicePosts = posts.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      );
      this.setState({
        filteredData: slicePosts,
      });
    });
  };

  setListData = (listData) => {
    this.setState({
      filteredData: listData,
    });
  };

  handleSetPostMode = (event) => {
    this.props.setPostMode(parseInt(event.target.value));
  };

  handleSearch = (keyword) => {
    if (this.props.posts) {
      let searchResult = this.props.posts.filter(function (pos) {
        return pos.message.toLowerCase().includes(keyword.toLowerCase());
      });
      this.setListData(searchResult.slice(0, this.state.itemPerPage));
      this.setPageCount(searchResult);
    }
  };

  onChangeItem = ({ oldIndex, newIndex }) => {
    const { site, changeNavItems } = this.props;
    let temp = site.navItems[oldIndex];
    site.navItems[oldIndex] = site.navItems[newIndex];
    site.navItems[newIndex] = temp;
    site.navItems.map((item, index) => (item.order = index + 1));
    changeNavItems(site.navItems);
  };

  setActivePost = (post) => {
    post.isActive = !post.isActive;
    let list = this.props.site.homepage;
    for (let i = 0; i < list.length; i++) {
      if (list[i].original === "news") {
        if (!list[i].filter.items) list[i].filter.items = [];

        list[i].filter.items.filter(function (pos) {
          return pos._id !== post._id;
        });

        if (list[i].filter.items.length === 0) {
          list[i].filter.items = null;
          list[i].filter.type = "latest";
        }
        break;
      }
    }
    this.setState({ filteredData: this.state.filteredData });
  };

  handleSave = async (posts) => {
    // await this.props.savePosts(posts);
    this.props.setActiveNavItems(this.props.site);
    this.handleOpenDialogue(false);
  };

  handleOpenDialogue = (bool) => {
    this.setState({
      openDiag: bool,
    });
    if (bool) {
      this.setPosts(this.props.posts);
    }
  };

  onChangePanel = (item, expand) => {
    if (item !== this.state.previousExpandItem) {
      this.setState({
        previousExpandItem: item,
        isExpanding: true,
        currentExpandItem: item,
      });
    } else {
      this.setState({
        currentExpandItem: item,
        isExpanding: expand,
      });
    }
  };

  setHover = (position, onHover) => {
    this.setState({
      hover: { expanTab: position, onHover: onHover },
    });
  };

  render() {
    const {
      site,
      setActiveNavItems,
      updateNavItemValue,
      classes,
      changeNavItemName,
      setEventCustomize,
      setAboutCustomize,
      about
    } = this.props;
    const { hover } = this.state;
    return (
      <div>
        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t1" && this.state.isExpanding
              ? true
              : false
          }
          className={classes.gridItem}
          onMouseEnter={() => this.setHover(1, true)}
          onMouseLeave={() => this.setHover(1, false)}
        >
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 1 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
            onClick={() => this.onChangePanel("t1", !this.state.isExpanding)}
            aria-controls="panel1a-content"
            style={{ backgroundColor: "white" }}
          >
            <Grid item xs={10} md={10} sm={12}>
              <Typography className={classes.title}>About Design</Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>

              <Grid item container xs={12}>
                <Grid item xs={12} style={{ height: 20 }} />
                <Grid item xs={12}>
                  <Typography className={classes.title2}>Story Title</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      classes: {
                        focused: classes.focused,
                      },
                    }}
                    inputProps={{
                      maxLength: 15,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.inputTitle,
                      },
                    }}
                    size="small"
                    style={{ backgroundColor: "white" }}
                    fullWidth
                    variant={"outlined"}
                    value={site.story ? site.story.title : ""}
                    onChange={(e) => this.handleChangeStoryTitle(e)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={12} style={{ height: 20 }} />
                <Grid item xs={12}>
                  <Typography className={classes.title2}>Story</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      classes: {
                        focused: classes.focused,
                      },
                    }}
                    inputProps={{
                      maxLength: 2000,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.inputTitle,
                      },
                    }}
                    multiline
                    size="small"
                    style={{ backgroundColor: "white" }}
                    fullWidth
                    rows={5}
                    spellCheck={false}
                    variant={"outlined"}
                    value={site.story ? site.story.composedText : ""}
                    onChange={(e) => this.handleChangeStory(e)}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={12} style={{ height: 20 }} />
                <Grid item xs={12}>
                  <Typography className={classes.title2}>Introduction</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      classes: {
                        focused: classes.focused,
                      },
                    }}
                    inputProps={{
                      maxLength: 1000,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.inputTitle,
                      },
                    }}
                    multiline
                    size="small"
                    style={{ backgroundColor: "white" }}
                    fullWidth
                    rows={5}
                    spellCheck={false}
                    variant={"outlined"}
                    value={about ? about : ""}
                    onChange={(e) => this.handleChangeAbout(e)}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!site.showDetailSetting.showAboutLogo}
                      onChange={() =>
                        setAboutCustomize(
                          !site.showDetailSetting.showAboutLogo,
                          site.showDetailSetting.showAboutDescription,
                          site.showDetailSetting.showStory
                        )
                      }
                    />
                  }
                  label={
                    <p style={{ fontSize: 13, color: "#555d66" }}>
                      Hide site logo
                    </p>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!site.showDetailSetting.showAboutDescription}
                      onChange={() =>
                        setAboutCustomize(
                          site.showDetailSetting.showAboutLogo,
                          !site.showDetailSetting.showAboutDescription,
                          site.showDetailSetting.showStory
                        )
                      }
                    />
                  }
                  label={
                    <p style={{ fontSize: 13, color: "#555d66" }}>
                      Hide introduction
                    </p>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!site.showDetailSetting.showStory}
                      onChange={() =>
                        setAboutCustomize(
                          site.showDetailSetting.showAboutLogo,
                          site.showDetailSetting.showAboutDescription,
                          !site.showDetailSetting.showStory
                        )
                      }
                    />
                  }
                  label={
                    <p style={{ fontSize: 13, color: "#555d66" }}>Hide story</p>
                  }
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t2" && this.state.isExpanding
              ? true
              : false
          }
          className={classes.gridItem}
          onMouseEnter={() => this.setHover(2, true)}
          onMouseLeave={() => this.setHover(2, false)}
        >
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 2 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
            onClick={() => this.onChangePanel("t2", !this.state.isExpanding)}
            aria-controls="panel1a-content"
            style={{ backgroundColor: "white" }}
          >
            <Grid item xs={10} md={10} sm={12}>
              <Typography className={classes.title}>Event Design</Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!site.showDetailSetting.showCoverEvent}
                      onChange={() =>
                        setEventCustomize(
                          !site.showDetailSetting.showCoverEvent,
                          site.showDetailSetting.showDesEvent,
                          site.showDetailSetting.showPlaceEvent
                        )
                      }
                    />
                  }
                  label={
                    <p style={{ fontSize: 13, color: "#555d66" }}>
                      Hide event cover
                    </p>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!site.showDetailSetting.showDesEvent}
                      onChange={() =>
                        setEventCustomize(
                          site.showDetailSetting.showCoverEvent,
                          !site.showDetailSetting.showDesEvent,
                          site.showDetailSetting.showPlaceEvent
                        )
                      }
                    />
                  }
                  label={
                    <p style={{ fontSize: 13, color: "#555d66" }}>
                      Hide event description
                    </p>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!site.showDetailSetting.showPlaceEvent}
                      onChange={() =>
                        setEventCustomize(
                          site.showDetailSetting.showCoverEvent,
                          site.showDetailSetting.showDesEvent,
                          !site.showDetailSetting.showPlaceEvent
                        )
                      }
                    />
                  }
                  label={
                    <p style={{ fontSize: 13, color: "#555d66" }}>
                      Hide event place
                    </p>
                  }
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t3" && this.state.isExpanding
              ? true
              : false
          }
          className={classes.gridItem}
          onMouseEnter={() => this.setHover(3, true)}
          onMouseLeave={() => this.setHover(3, false)}
        >
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 3 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
            onClick={() => this.onChangePanel("t3", !this.state.isExpanding)}
            aria-controls="panel1a-content"
            style={{ backgroundColor: "white" }}
          >
            <Grid item xs={10} md={10} sm={12}>
              <Typography className={classes.title}>Facebook Posts</Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container xs={12} justify={"center"}>
                <Grid
                  item
                  xs={12}
                  style={{
                    color: "#555d66",
                    textAlign: "left",
                    fontStyle: "italic",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  Select which post from Facebook you want to see on your site.
                </Grid>

                <Grid item xs={12}>
                  <button
                    className={classes.logoButton}
                    color={"default"}
                    onClick={() => this.handleOpenDialogue(true)}
                  >
                    Select
                  </button>
                </Grid>

                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  open={this.state.openDiag}
                  maxWidth="md"
                  fullWidth
                >
                  <DialogTitle>
                    <Paper component="form" className={classes.root}>
                      <InputBase
                        InputLabelProps={{
                          classes: {
                            focused: classes.focused,
                          },
                        }}
                        maxLength={50}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                            input: classes.inputTitle,
                          },
                        }}
                        id="searchBox"
                        placeholder="Search by message..."
                        autoFocus={this.state.openDiag ? true : false}
                        className={classes.input}
                        onChange={() =>
                          this.handleSearch(
                            document.getElementById("searchBox").value
                          )
                        }
                      />
                      <IconButton
                        className={classes.iconButton}
                        color="primary"
                        aria-label="search"
                        onClick={() =>
                          this.handleSearch(
                            document.getElementById("searchBox").value
                          )
                        }
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </DialogTitle>
                  <DialogContent>
                    <Grid container alignItems="center">
                      <PostsList
                        posts={this.props.posts}
                        filteredData={this.state.filteredData}
                        setActivePost={this.setActivePost}
                      />
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Grid container justify="center">
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
                    <Button
                      autoFocus
                      variant="contained"
                      onClick={() => this.handleOpenDialogue(false)}
                      style={{
                        float: "right",
                        backgroundColor: "#f0eded",
                        width: 70,
                        borderRadius: 5,
                        color: "#555d66",
                        fontSize: 11,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => this.handleSave(this.props.posts)}
                      style={{
                        float: "right",
                        backgroundColor: "#0074aa",
                        width: 70,
                        borderRadius: 5,
                        color: "white",
                        fontSize: 11,
                      }}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>

              <Grid item xs={12} style={{ marginTop: 40 }}>
                <RadioGroup
                  value={site.showDetailSetting.showPostMode}
                  onChange={this.handleSetPostMode}
                  style={{
                    color: "#555d66",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  <FormControlLabel
                    value={0}
                    control={<Radio style={{ color: "#0074aa" }} />}
                    label={<p style={{ fontSize: 13 }}>Show all</p>}
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio style={{ color: "#0074aa" }} />}
                    label={
                      <p style={{ fontSize: 13 }}>
                        Show only posts with photo(s)
                      </p>
                    }
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio style={{ color: "#0074aa" }} />}
                    label={
                      <p style={{ fontSize: 13 }}>Show only posts with video</p>
                    }
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio style={{ color: "#0074aa" }} />}
                    label={<p style={{ fontSize: 13 }}>Show only text posts</p>}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t4" && this.state.isExpanding
              ? true
              : false
          }
          className={classes.gridItem}
          onMouseEnter={() => this.setHover(4, true)}
          onMouseLeave={() => this.setHover(4, false)}
        >
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 4 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
            onClick={() => this.onChangePanel("t4", !this.state.isExpanding)}
            aria-controls="panel1a-content"
            style={{ backgroundColor: "white" }}
          >
            <Grid item xs={10} md={10} sm={12}>
              <Typography className={classes.title}>Paginate</Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid container item xs={12} style={{ marginBottom: 30 }}>
                <Grid item xs={6}>
                  <p style={{ fontSize: 13, color: "#555d66" }}>
                    Set posts per page
                  </p>
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={4}
                  xs={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <InputBase
                    type="number"
                    inputProps={{
                      maxLength: 2,
                      style: {
                        border: "1px solid rgb(0, 116, 170)",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        padding: "6px",
                      },
                    }}
                    style={{ minWidth: 30 }}
                    value={this.props.site.limitNews}
                    onChange={this.handleSetLimit(0)}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} style={{ marginBottom: 30 }}>
                <Grid item xs={6}>
                  <p style={{ fontSize: 13, color: "#555d66" }}>
                    Set events per page
                  </p>
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={4}
                  xs={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <InputBase
                    type="number"
                    inputProps={{
                      maxLength: 2,
                      style: {
                        border: "1px solid rgb(0, 116, 170)",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        padding: "6px",
                      },
                    }}
                    style={{ minWidth: 30 }}
                    value={this.props.site.limitEvent}
                    onChange={this.handleSetLimit(1)}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} style={{ marginBottom: 30 }}>
                <Grid item xs={6}>
                  <p style={{ fontSize: 13, color: "#555d66" }}>
                    Set photos per page
                  </p>
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={4}
                  xs={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <InputBase
                    type="number"
                    inputProps={{
                      maxLength: 2,
                      style: {
                        border: "1px solid rgb(0, 116, 170)",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        padding: "6px",
                      },
                    }}
                    style={{ minWidth: 30 }}
                    value={this.props.site.limitGallery}
                    onChange={this.handleSetLimit(2)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t5" && this.state.isExpanding
              ? true
              : false
          }
          className={classes.gridItem}
          onMouseEnter={() => this.setHover(5, true)}
          onMouseLeave={() => this.setHover(5, false)}
        >
          <ExpansionPanelSummary
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 5 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
            onClick={() => this.onChangePanel("t5", !this.state.isExpanding)}
            aria-controls="panel1a-content"
            style={{ backgroundColor: "white" }}
          >
            <Grid item xs={10} md={10} sm={12}>
              <Typography className={classes.title}>Navigation</Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  color: "#555d66",
                  textAlign: "left",
                  fontStyle: "italic",
                  fontFamily: "Roboto, sans-serif",
                  marginBottom: "0.8rem",
                }}
              >
                Reorder or hide pages of your site.
              </Grid>
              <Grid item xs={12}>
                <SortableList
                  items={site.navItems}
                  onSortEnd={this.onChangeItem}
                  useDragHandle
                  site={site}
                  setActiveNavItems={setActiveNavItems}
                  updateNavItemValue={updateNavItemValue}
                  changeNavItemName={changeNavItemName}
                  classes={classes}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Divider
          style={{
            height: 10,
            width: "100%",
            backgroundColor: "#ffffff00",
            marginTop: 30,
          }}
        />
      </div >
    );
  }
}
const mapStateToProps = (state) => ({
  site: state.site.siteEdit,
  open: state.dialog.open,
  posts: state.post.posts,
  about: state.site.siteEdit.about && state.site.siteEdit.about,
});

const mapDispatchToProps = (dispatch) => ({
  changeNavItems: (value) => dispatch(changeNavItems(value)),
  setActiveNavItems: (site) => dispatch(setActiveNavItems(site)),
  setActivePost: (post, status) => dispatch(setActivePost(post, status)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
  savePosts: (posts) => dispatch(savePosts(posts)),
  changeNavItemName: (item) => dispatch(changeNavItemName(item)),
  setEventCustomize: (cover, description, place) =>
    dispatch(setEventCustomize(cover, description, place)),
  setAboutCustomize: (logo, description, story) =>
    dispatch(setAboutCustomize(logo, description, story)),
  setLimit: (news, event, gallery) => dispatch(setLimit(news, event, gallery)),
  setPostMode: (mode) => dispatch(setPostMode(mode)),
  changeSiteStory: (about) => dispatch(changeSiteStory(about)),
  changeSiteStoryTitle: (about) => dispatch(changeSiteStoryTitle(about)),
  changeSiteAbout: (about) => dispatch(changeSiteAbout(about)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PagesEditorTab));
