import { ADD_USER } from "redux/types";

const initialState = {
    userData: {
        user_id: '',
        area_id: '',
        email: '',
        name: '',
        role: '',
        auth: null
    }
}

export const userReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case ADD_USER:
            return state = {
                ...state,
                userData: { ...state.userData, ...actions.payload }
            }

        // case ADD_COMPANY_DATA:
        //     return state = {
        //         ...state,
        //         companyData: actions.payload
        //     }

        // case LOGOUT_USER:
        //     return state = {
        //         ...state,
        //         userData: {
        //             first_name: '',
        //             middle_name: '',
        //             last_name: '',
        //             mobile_no: '',
        //             email: ''
        //         },
        //         companyData: {
        //             company_name: '',
        //             street_1: '',
        //             street_2: '',
        //             city: '',
        //             state: '',
        //             zip: '',
        //             dot_no: '',
        //             mc_no: ''
        //         },
        //         subscriptionData: {},
        //         paypalSubscriptionStatus: undefined,
        //         paypalSubscriptionData: null,
        //         userLoggedIn: actions.payload,
        //         showFirstLoginModal: false
        //     }
        default:
            return state;
    }
}