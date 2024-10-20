import axios from "axios";
import {
    createTextStart,
    createTextSuccess,
    createTextFailed,
    deleteTextStart,
    deleteTextSuccess,
    deleteTextFailed,
    getTextStart,
    getTextSuccess,
    getTextFailed,
} from "./textSlice";
axios.defaults.baseURL = 'https://random-app-iqjz.onrender.com';


//TẠO MỚI MỘT CÂU HỎI
export const createText = async (dispatch, newText) => {
    dispatch(createTextStart());
    try {
        await axios.post("/api/text", newText);
        dispatch(createTextSuccess());
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(createTextFailed(error));
        }
    }
};
//XÓA MỘT CÂU HỎI
export const deleteText = async (id, dispatch) => {
    dispatch(deleteTextStart());
    try {
        await axios.delete(`/api/text/${id}`);
        dispatch(deleteTextSuccess());
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(deleteTextFailed(error));
        }
    }
};
//LẤY CÁC CÂU HỎI TRONG MỘT CHUYÊN ĐỀ
export const getText = async (dispatch) => {
    dispatch(getTextStart());
    try {
        const res = await axios.get(`/api/text`);
        await dispatch(getTextSuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(getTextFailed());
        }
    }
}