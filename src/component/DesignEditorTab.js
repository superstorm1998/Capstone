import GoogleFontPicker from "@bit/take2.components.google-font-picker";
import {
  Button,
  Divider,
  Grid,
  Input,
  TextField,
  Typography,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add, Cancel } from "@material-ui/icons";
import ColorThief from "color-thief";
import onecolor from "onecolor";
import React from "react";
import { ChromePicker, CirclePicker } from "react-color";
import { connect } from "react-redux";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeSiteTitle,
  changeTheme,
  setColorPallete,
  setNewCover,
  setNewLogo,
  setShowCustomColor,
  removeCover
} from "../actions";
import DialogThemes from "./DialogThemes";
import toastr from "./Toastr";

const useStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    fontFamily: "Segoe UI Semibold",
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    color: "#555d66",
    fontSize: 14
  },
  title2: {
    fontFamily: "Segoe UI Semibold",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontWeight: "bold",
    fontSize: 12,
    color: "#555d66"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
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
    borderColor: "#b4c0cf",
    color: "#434d58 !important"
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#0087be",
    color: "#434d58 !important"
  },
  pickerButton: {
    margin: 0,
    width: 200,
    backgroundColor: "white"
  },
  customButton:
  {
    border: "1px solid #0071a1",
    borderRadius: 5,
    color: "#0071a1",
    fontSize: 11
  },
  logoButton:
  {
    marginTop: 5,
    border: "1px solid #555d66",
    borderRadius: 5,
    color: "#555d66",
    borderStyle: "dashed",
    fontSize: 13,
    height: 40,
    width: "100%",

    "&:hover": {
      backgroundColor: "white"
    }
  },
});

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "6rem",
  height: "6rem"
};

class DesignEditorTab extends React.Component {
  state = {
    file: null,
    pallete: [],
    covers: [],
    logo: ""
  };

  async componentDidMount() {
    const { setColorPallete, site } = this.props;
    const colorThief = new ColorThief();
    const img = document.getElementById("preview");
    img.crossOrigin = "Anonymous";
    img.src = site.logo;
    this.setState({
      logo: site.logo
    });
    img.addEventListener("load", async function () {
      const color = await colorThief.getPalette(img, 11);
      const colors = await color.map(rgb =>
        onecolor("rgb( " + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")").hex()
      );
      setColorPallete(colors);
    });
  }

  handleSetColors = colors => {
    this.setState({
      pallete: colors
    });
  };

  handleChangeTheme = event => {
    const { changeTheme, themes, site } = this.props;
    const theme = themes.find(e => e.id === event.target.value);
    site.theme = theme;
    this.setState({ changeTheme: true });
    changeTheme(site);
  };

  handleChangeFontTitle = font => {
    const { site, changeFontTitle } = this.props;
    site.fontTitle = font.family;
    changeFontTitle(site);
  };

  handleChangeColor = color => {
    const { site, changeColor } = this.props;
    site.color = color.hex;
    changeColor(site);
  };

  handleChangeFontBody = font => {
    const { site, changeFontBody } = this.props;
    site.fontBody = font.family;
    changeFontBody(site);
  };

  handleBrowseLogo = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    //check if the image size is larger than 1MB
    if (file.size > 1048576) {
      toastr.error("Image size must be less than 1MB!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      var output = document.getElementById("preview");
      output.src = URL.createObjectURL(e.target.files[0]);
      this.setState({
        logo: e.target.files[0].name
      });
      this.props.setNewLogo(file);
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleUploadCover = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    //check if the image size is larger than 1MB
    if (file.size > 1048576) {
      toastr.error("Image size must be less than 1MB!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      this.props.setNewCover(file);
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleChangeSiteTitle = e => {
    const { site, changeSiteTitle } = this.props;
    site.title = e.target.value;
    changeSiteTitle(site);
  };

  renderNewCovers = () => {
    const { newCover, removeCover } = this.props;
    if (newCover && newCover.length > 0) {
      return newCover.map((cover, i) => {
        if (cover && typeof cover === "object" && cover.size > 0) {
          return (
            <Grid
              item
              key={i}
              md={4}
              sm={6}
              xs={6}
              style={{
                ...imgStyles,
                backgroundImage: `url(${URL.createObjectURL(cover)})`
              }}
            >
              <IconButton onClick={() => removeCover(cover)}>
                <Cancel color={"error"} />
              </IconButton>
            </Grid>
          );
        } else
          return (
            <Grid
              item
              key={i}
              md={4}
              sm={6}
              xs={6}
              style={{ ...imgStyles, backgroundImage: `url(${cover})` }}
            >
              <IconButton onClick={() => removeCover(cover)}>
                <Cancel color={"error"} />
              </IconButton>
            </Grid>
          );
      });
    }
  };

  render() {
    const drawerWidth = 280;
    const {
      isShow,
      setShowCustomColor,
      classes,
      site,
      colorPallete,
      isChanged
    } = this.props;

    return (
      <div style={{ padding: 10 }}>
        <Typography className={classes.title}>Logo</Typography>
        <Grid
          container
          justify={"center"}
          direction={"column"}
        >
          <Grid item style={{ color: "#555d66", textAlign: "left", fontStyle: "italic", fontFamily: "Segoe UI" }}>
            Add a logo to display on your site. Choose a file from your computer below.
            </Grid>
          <Grid item>
            <Input
              type="file"
              id="selectedFile"
              onChange={e => this.handleBrowseLogo(e)}
              style={{ display: "none" }}
            />
            <img
              style={{ ...imgStyles, width: "auto", display: "none" }}
              alt=""
              id={"preview"}
              src={site.logo}
            />
          </Grid>
          <Grid container justify={"center"}>
            <button
              className={classes.logoButton}
              color={"default"}
              onClick={() => document.getElementById("selectedFile").click()}
            >
              Browse
            </button>
          </Grid>
        </Grid>
        <Divider
          style={{ height: 10, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Font</Typography>
        <Grid container className={classes.sideBarBox} justify={"space-evenly"}>
          <Grid item xs={12}>
            <Typography className={classes.title2}>Title</Typography>
            <Grid item container justify="center">
              <GoogleFontPicker
                searchable
                buttonColor={"default"}
                buttonVariant={"outlined"}
                defaultFont={isChanged ? site.theme.fontTitle : site.fontTitle}
                onFontSelected={this.handleChangeFontTitle}
                classes={{
                  pickerButton: classes.pickerButton
                }}
                placement={"bottom"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title2}>Body</Typography>
            <Grid container justify="center">
              <GoogleFontPicker
                searchable
                buttonColor={""}
                buttonVariant={"outlined"}
                defaultFont={isChanged ? site.theme.fontBody : site.fontBody}
                onFontSelected={this.handleChangeFontBody}
                classes={{
                  pickerButton: classes.pickerButton
                }}
                placement={"bottom"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider
          style={{ height: 10, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Site Title</Typography>
        <TextField
          variant={"outlined"}
          fullWidth
          size="small"
          InputLabelProps={{
            classes: {
              focused: classes.focused
            }
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
          style={{ backgroundColor: "white" }}
          value={site.title}
          onChange={e => this.handleChangeSiteTitle(e)}
        />
        <Divider
          style={{ height: 10, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Color</Typography>
        <Grid className={classes.sideBarBox}>
          {colorPallete && (
            <>
              <Typography className={classes.title2}>
                Suggested Color
              </Typography>
              <CirclePicker
                width={"fit-content"}
                color={isChanged ? site.theme.mainColor : site.color}
                colors={colorPallete}
                onChangeComplete={this.handleChangeColor}
              />
            </>
          )}
          <Typography className={classes.title2}>Custom Color</Typography>
          <Button
            className={classes.customButton}
            variant="contained"
            color="default"
            onClick={() => setShowCustomColor(!isShow)}
          >
            Select custom color
          </Button>
          <Divider
            style={{ height: 10, width: "100%", backgroundColor: "#ffffff00" }}
          />
          {isShow === true ? (
            <Grid
              style={{
                left: drawerWidth - 30,
                width: 220,
                color: "white",
                borderRadius: 3,
                zIndex: 1000,
                top: "50%"
              }}
            >
              <ChromePicker
                color={site.color}
                onChangeComplete={this.handleChangeColor}
              />
            </Grid>
          ) : null}
        </Grid>
        <Divider
          style={{ height: 10, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Homepage Images</Typography>
        <Grid container className={classes.sideBarBox}>
          {this.renderNewCovers()}
          <Grid
            item
            container
            justify={"center"}
            alignItems="center"
            md={4}
            sm={6}
            xs={6}
            style={{
              ...imgStyles,
              backgroundColor: "#F3ECEC",
              cursor: "pointer"
            }}
            onClick={() => document.getElementById("addCover").click()}
          >
            <Input
              type="file"
              id="addCover"
              onChange={e => this.handleUploadCover(e)}
              style={{ display: "none" }}
            />
            <Add />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  isShow: state.theme.isShow,
  site: state.site.siteEdit,
  colorPallete: state.site.colorPallete,
  newCover: state.site.newCover,
  isChanged: state.site.isChanged
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site)),
  changeColor: site => dispatch(changeColor(site)),
  changeFontTitle: site => dispatch(changeFontTitle(site)),
  changeFontBody: site => dispatch(changeFontBody(site)),
  setShowCustomColor: isShow => dispatch(setShowCustomColor(isShow)),
  changeSiteTitle: site => dispatch(changeSiteTitle(site)),
  setColorPallete: pallete => dispatch(setColorPallete(pallete)),
  setNewLogo: file => dispatch(setNewLogo(file)),
  setNewCover: file => dispatch(setNewCover(file)),
  removeCover: cover => dispatch(removeCover(cover))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DesignEditorTab));
