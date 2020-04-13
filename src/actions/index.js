import {
  loginAdmin,
  setLogoutAdmin,
  getAllCategoriesAdmin,
  updateCategory,
  insertCategory,
  insertTheme,
  updateTheme,
  deleteCategory,
  deleteTheme,
} from "./admin";
import { updateAdminTabIndex } from "./adminTab";
import { getAllPaths, updateSitepath } from "./path";
import {
  getAllPost,
  setActivePost,
  savePosts,
  getDataByPageNumber,
  setPostsToSiteView,
  setEventsToSiteView,
  setGalleriesToSiteView,
  setHomepageToSiteView,
  setPostView,
} from "./post";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeNavItems,
  changeSiteTitle,
  changeTheme,
  getAllSites,
  getSiteById,
  getUserSites,
  publishSite,
  publishSiteAdmin,
  saveDesignSite,
  setActiveNavItems,
  setCurrentEditId,
  setSiteEdit,
  setSiteView,
  unPublishSite,
  unPublishSiteAdmin,
  updateSiteId,
  uploadLogo,
  setEditOff,
  setEditOn,
  clearSiteView,
  getSiteBySitepath,
  setNavItemActive,
  setNavItemInActive,
  setNewCover,
  setNewLogo,
  setPreviewMode,
  removeCover,
  changeNavItemName,
  uploadFavicon,
  changeSiteEmail,
  changeSiteInstagram,
  changeSitePhone,
  changeSiteSitepath,
  changeSiteWhatsapp,
  changeSiteYoutube,
  getAbout,
  getPosts,
  getEvents,
  getGalleries,
  changeHomeItems,
  changeHomeItemName,
  changeSiteAbout,
  setIsChanged,
  changeSiteAddress,
  setFramePreview,
  setEventCustomize,
  setLimit,
  setAboutCustomize,
} from "./site";
import { closeLoading, showLoading } from "./spinner";
import {
  updateNavItemValue,
  updateTabValue,
  updateSelectNavItemValue,
} from "./tab";
import {
  getAllThemes,
  getAllThemesAdmin,
  getNavItems,
  setShowCustomColor,
  // updateTheme
} from "./theme";
import {
  activateUser,
  confirmPage,
  deactivateUser,
  getAllUsers,
  getUserPages,
  login,
  setLogout,
} from "./user";
import { closeDialog, openDialog } from "./dialog";
import { setColorPallete } from "./color";
import {
  syncDataFromFB,
  syncGalleryFromFB,
  syncEventFromFB,
  syncPostFromFB,
  setAutoSync,
  applyAutoSync,
} from "./syncdata";

export {
  getUserPages,
  updateSiteId,
  changeTheme,
  changeColor,
  changeFontTitle,
  changeFontBody,
  setShowCustomColor,
  setLogout,
  updateTabValue,
  updateNavItemValue,
  showLoading,
  closeLoading,
  login,
  //dialog
  closeDialog,
  openDialog,
  changeNavItems,
  getNavItems,
  unPublishSite,
  publishSite,
  confirmPage,
  getAllThemes,
  getUserSites,
  saveDesignSite,
  getSiteById,
  setSiteEdit,
  setSiteView,
  setCurrentEditId,
  setActiveNavItems,
  updateAdminTabIndex,
  getAllUsers,
  getAllSites,
  uploadLogo,
  activateUser,
  deactivateUser,
  changeSiteTitle,
  getAllThemesAdmin,
  publishSiteAdmin,
  unPublishSiteAdmin,
  loginAdmin,
  setLogoutAdmin,
  getAllPaths,
  getAllPost,
  setActivePost,
  setEditOn,
  setEditOff,
  clearSiteView,
  updateSitepath,
  getSiteBySitepath,
  setColorPallete,
  setNavItemActive,
  setNavItemInActive,
  setNewCover,
  setNewLogo,
  setPreviewMode,
  savePosts,
  removeCover,
  changeNavItemName,
  uploadFavicon,
  changeSiteEmail,
  changeSiteInstagram,
  changeSitePhone,
  changeSiteSitepath,
  changeSiteWhatsapp,
  changeSiteYoutube,
  getAbout,
  getPosts,
  getEvents,
  getGalleries,
  syncDataFromFB,
  syncEventFromFB,
  syncGalleryFromFB,
  syncPostFromFB,
  setAutoSync,
  applyAutoSync,
  changeHomeItems,
  changeHomeItemName,
  getDataByPageNumber,
  setPostsToSiteView,
  changeSiteAbout,
  setEventsToSiteView,
  setGalleriesToSiteView,
  setHomepageToSiteView,
  setIsChanged,
  changeSiteAddress,
  updateSelectNavItemValue,
  setFramePreview,
  setEventCustomize,
  getAllCategoriesAdmin,
  updateCategory,
  insertCategory,
  insertTheme,
  updateTheme,
  setPostView,
  setLimit,
  setAboutCustomize,
  deleteCategory,
  deleteTheme,
};
