//THIS THUNK MIDDLEWARE IS TO RUN ASYNC FUNCTIONS AND CALL A DISPATCH

import AxiosClient from '../../core/helpers/axiosClient'
import { loading, success, error } from '../actions/async_action'
const http = new AxiosClient();
export const apiData = async (dispatch) => {
    dispatch(loading)
    try {
        const res = await http.axiosGet("https://api.kanye.rest/");
        const data = res.json();
        dispatch(success(data));

    } catch (err) {
        dispatch(error(err));
    }
}