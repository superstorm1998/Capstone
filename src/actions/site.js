import toastr from "toastr";
import axios from "../utils/axios";
import { firebase } from "../utils/firebase";

export function getAllSites({ id, accessToken }) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/site/findAll",
        params: {
          id: id,
          access_token: accessToken
        }
      });
      // dispatch({
      //   type: "CLOSE_LOADING" để đây bị loading bất tận??
      // });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_SITES",
          payload: data.data
        });
      } else {
        toastr.error(`Unable to retrieve sites`, "Error");
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to retrieve sites`, "Error");
    }
  };
}

export function getUserSites(userId, accessToken) {
  return async dispatch => {
    const req = await axios({
      url: "/site/findAllByUser",
      params: {
        userId: userId,
        accessToken: accessToken
      }
    });
    if (req.status === 200) {
      dispatch({
        type: "SET_USER_SITES",
        payload: req.data.sites
      });
    }
  };
}

export const updateSiteId = currentId => {
  return dispatch => {
    dispatch({
      type: "UPDATE_SITE_ID",
      payload: currentId
    });
  };
};

export const unPublishSite = ({ siteId, siteName }) => {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/publish",
      data: {
        id: siteId,
        isPublish: false
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "UNPUBLISH_SITE",
        payload: siteId
      });
      toastr.success(`Unpublish site ${siteName} success`, "Sucess");
    } else {
      toastr.error(
        "There are something wrong when unpublish your site",
        "Error"
      );
    }
  };
};

export const publishSite = ({ siteId, siteName }) => {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/publish",
      data: {
        id: siteId,
        isPublish: true
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "PUBLISH_SITE",
        payload: siteId
      });
      toastr.success(`Publish site ${siteName} sucess`, "Success");
    } else {
      toastr.error("There are something wrong when publish your site", "Error");
    }
  };
};

export function changeColor(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_COLOR",
      payload: site
    });
  };
}

export function changeFontTitle(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_TITLE",
      payload: site
    });
  };
}

export function changeFontBody(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_BODY",
      payload: site
    });
  };
}

export function changeNavItems(items) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEMS",
      payload: items
    });
  };
}

export function saveDesignSite(site) {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/saveDesign",
      data: {
        logo: site.logo,
        fontBody: site.fontBody,
        fontTitle: site.fontTitle,
        navItems: site.navItems,
        theme: site.theme.id,
        pageId: site.id,
        name: site.title,
        color: site.color
      }
    });
    if (data.status === 200) {
      toastr.success(`Save site ${site.title} sucess`, "Success");
    } else {
      toastr.error("There are something wrong when save your site", "Error");
    }
  };
}

export function changeTheme(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_THEME",
      payload: site
    });
  };
}

export function getSiteById(id) {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: "/site/find/" + id
    });
    if (data.status === 200) {
      return data.data;
    }
  };
}

export function setSiteEdit(data, titleStyle, bodyStyle) {
  return async dispatch => {
    dispatch({
      type: "SET_SITE_EDIT",
      payload: {
        data: data,
        titleEdit: titleStyle,
        bodyEdit: bodyStyle
      }
    });
  };
}

export function setSiteView(data, titleStyle, bodyStyle) {
  return async dispatch => {
    dispatch({
      type: "SET_SITE_VIEW",
      payload: {
        data: data,
        titleView: titleStyle,
        bodyView: bodyStyle
      }
    });
  };
}

export function setCurrentEditId(id) {
  return dispatch => {
    dispatch({
      type: "SET_CURRENT_EDIT_ID",
      payload: id
    });
  };
}

export function setActiveNavItems(site) {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_NAV_ITEMS",
      payload: site
    });
  };
}

export function uploadLogo(path, siteId) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      firebase
        .storage()
        .ref()
        .child(`${siteId}`)
        .put(path, {
          contentType: "image/jpeg"
        })
        .then(async () => {
          await firebase
            .storage()
            .ref()
            .child(`${siteId}`)
            .getDownloadURL()
            .then(async url => {
              await axios({
                method: "PATCH",
                url: "/site/logo",
                data: {
                  logo: url,
                  id: siteId
                }
              });
            });
          toastr.success("Upload new logo successful", "Success");
        })
        .catch(error => {
          toastr.error(`Upload new logo failed`, "Error");
        })
        .finally(() => {
          dispatch({
            type: "CLOSE_LOADING"
          });
        });
    } catch (error) {
      toastr.error(`Upload new logo failed`, "Error");
      dispatch({
        type: "CLOSE_LOADING"
      });
    }
  };
}

export function changeSiteTitle(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_TITLE",
      payload: site
    });
  };
}

export function syncDataFromFB(pageId, access_token) {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/syncData",
      data: {
        pageId: pageId,
        accessToken: access_token
      }
    });
    if (data.status === 200) {
      toastr.success("You fetch data from FB success.", "Success");
    } else {
      toastr.error(
        "There are something wrong when fetch data from your FB",
        "Error"
      );
    }
  };
}
