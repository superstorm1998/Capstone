import axios from "../utils/axios";
import toastr from "toastr";

function revertSaveData(modDat) {

  if (!modDat.posts) {
    modDat.posts = [];
  }
  if (!modDat.galleries) {
    modDat.galleries = [];
  }
  if (!modDat.events) {
    modDat.events = [];
  }

  for (let i = 0; i < modDat.homepage.length; i++) {
    if (!modDat.homepage[i].filter.items)
      modDat.homepage[i].filter.items = [];
    let type = modDat.homepage[i].original;

    for (
      let index = 0;
      index < modDat.homepage[i].filter.items.length;
      index++
    ) {
      if (type === "news") {
        modDat.homepage[i].filter.items[index] = modDat.posts.filter(
          function (pos) {
            return pos._id === modDat.homepage[i].filter.items[index];
          }
        )[0];
      }
      if (type === "event") {
        modDat.homepage[i].filter.items[index] = modDat.events.filter(
          function (pos) {
            return pos._id === modDat.homepage[i].filter.items[index];
          }
        )[0];
      }
      if (type === "gallery") {
        modDat.homepage[i].filter.items[index] = modDat.galleries.filter(
          function (pos) {
            return pos._id === modDat.homepage[i].filter.items[index];
          }
        )[0];
      }
    }
    if (modDat.homepage[i].filter.items.length === 0)
      modDat.homepage[i].filter.items = null;
  }

  return modDat;

}

export function syncDataFromFB(pageId, dateFrom, dateTo) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/syncData",
        data: {
          pageId: pageId,
          dateFrom: dateFrom,
          dateTo: dateTo
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        const site = data.data;
        const titleStyle = {
          fontFamily: site.fontTitle,
          color: site.color
        };
        const bodyStyle = {
          fontFamily: site.fontBody
        };
        dispatch({
          type: "SET_SITE_EDIT",
          payload: {
            data: revertSaveData(site),
            titleEdit: titleStyle,
            bodyEdit: bodyStyle
          }
        });
        toastr.success("You fetch data from FB success.", "Success");
      } else {
        toastr.error(
          "There are something wrong when fetch data from your FB",
          "Error"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(
        "There are something wrong when fetch data from your FB",
        "Error"
      );
    }
  };
}

export function syncPostFromFB(pageId, dateFrom, dateTo) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/syncPost",
        data: {
          pageId: pageId,
          dateFrom: dateFrom,
          dateTo: dateTo
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        const site = data.data;
        const titleStyle = {
          fontFamily: site.fontTitle,
          color: site.color
        };
        const bodyStyle = {
          fontFamily: site.fontBody
        };
        dispatch({
          type: "SET_SITE_EDIT",
          payload: {
            data: revertSaveData(site),
            titleEdit: titleStyle,
            bodyEdit: bodyStyle
          }
        });
        toastr.success("You fetch data from FB success.", "Success");
      } else {
        toastr.error(
          "There are something wrong when fetch data from your FB",
          "Error"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(
        "There are something wrong when fetch data from your FB",
        "Error"
      );
    }
  };
}

export function syncEventFromFB(pageId, dateFrom, dateTo) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/syncEvent",
        data: {
          pageId: pageId,
          dateFrom: dateFrom,
          dateTo: dateTo
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        const site = data.data;
        const titleStyle = {
          fontFamily: site.fontTitle,
          color: site.color
        };
        const bodyStyle = {
          fontFamily: site.fontBody
        };
        dispatch({
          type: "SET_SITE_EDIT",
          payload: {
            data: revertSaveData(site),
            titleEdit: titleStyle,
            bodyEdit: bodyStyle
          }
        });
        toastr.success("You fetch data from FB success.", "Success");
      } else {
        toastr.error(
          "There are something wrong when fetch data from your FB",
          "Error"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(
        "There are something wrong when fetch data from your FB",
        "Error"
      );
    }
  };
}

export function syncGalleryFromFB(pageId, dateFrom, dateTo) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/syncGallery",
        data: {
          pageId: pageId,
          dateFrom: dateFrom,
          dateTo: dateTo
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        const site = data.data;
        const titleStyle = {
          fontFamily: site.fontTitle,
          color: site.color
        };
        const bodyStyle = {
          fontFamily: site.fontBody
        };
        dispatch({
          type: "SET_SITE_EDIT",
          payload: {
            data: revertSaveData(site),
            titleEdit: titleStyle,
            bodyEdit: bodyStyle
          }
        });
        toastr.success("You fetch data from FB success.", "Success");
      } else {
        toastr.error(
          "There are something wrong when fetch data from your FB",
          "Error"
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(
        "There are something wrong when fetch data from your FB",
        "Error"
      );
    }
  };
}

export function setAutoSync(autoSync) {
  return dispatch => {
    dispatch({
      type: "SET_AUTO_SYNC",
      payload: {
        dataType: autoSync.dataType,
        minute: autoSync.minute
          ? autoSync.minute
          : !autoSync.minute && !autoSync.hour && !autoSync.day
            ? 2
            : null,
        hour: autoSync.hour ? autoSync.hour : null,
        day: autoSync.day ? autoSync.day : null
      }
    });
  };
}

export function applyAutoSync(id, autoSync) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/autoSync",
        data: {
          id,
          autoSync
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        toastr.success("Apply auto sync success.", "Success");
      } else {
        toastr.error("Apply auto sync failed", "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Apply auto sync failed", "Error");
    }
  };
}
