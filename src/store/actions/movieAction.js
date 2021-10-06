import createAction from ".";
import { request } from "../../api/request";
import { DOMAIN, GROUP_ID } from "../../utils/config";
import actionTypes from "../types";

export const fetchMovies = async (dispatch) => {
  try {
    const res = await request({
      method: "GET",
      url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachPhim`,
      params: { MaNhom: GROUP_ID },
    });

    dispatch(createAction(actionTypes.SET_MOVIE_LIST, res.data.content));
  } catch (err) {
    console.log(err);
  }
};
