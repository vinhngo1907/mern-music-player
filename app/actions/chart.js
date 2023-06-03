import axios from "axios";
import * as types from "../constant/action_constant";

const popTypes = {
    pop: "IWZ9Z0BW",
    kpop: "IWZ9Z0BO",
    vpop: "IWZ9Z08I",
};

export function getChart(popType) {
    return dispatch => {
        axios.get(`/api/media/chart/${popTypes[popType]}`)
            .then(({ data: res }) => {
                if (res.msg === "Success") {
                    switch (popType) {
                        case "pop":
                            dispatch({ type: types.FETCH_POP_CHART, pop: res.data });
                            break;
                        case 'kpop':
                            dispatch({ type: types.FETCH_KPOP_CHART, pop: res.data });
                            break;

                        case 'vpop':
                            dispatch({ type: types.FETCH_VPOP_CHART, pop: res.data });
                            break;

                        default:
                            break;
                    }
                }
            })
            .catch(err => {
                console.log("fail haha ");
                throw err;
            })
    }
}

export function changeActiveChart(popType) {

}