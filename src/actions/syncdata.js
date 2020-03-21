import axios from "../utils/axios";
import toastr from "toastr";

export function syncDataFromFB(pageId) {
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
          lastSync: new Date()
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
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
