import {
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  UPDATE_FEATURES,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_INFORMATIONS,
  SUBSCRIPTION,
} from "../actions/actionType";

const initialData = {
  isLogin: false,
  accessToken: "",
  userData: null,
};

export const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:

      return {
        ...state,
        isLogin: true,
        accessToken: action?.payload?.token,
        userData: action?.payload,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isLogin: true,
        accessToken: action?.payload?.token,
        userData: action?.payload,
      };

    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        userData: { ...state.userData, profile_img: action?.payload },
      };

    case UPLOAD_PROFILE_INFORMATIONS:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };

    case UPDATE_FEATURES:
      return {
        ...state,
        userData: {
          ...state.userData,
          feature: action.payload,
        },
      };
    case LOGOUT_REQUEST:
      return {
        isLogin: false,
        userData: null,
        accessToken: "",
      };
    case SUBSCRIPTION:

      return {
        ...state,
        userData: {
          ...state.userData,
          package: action?.payload,
          subscription: action?.payload?.subscription ? action?.payload?.subscription : null,
        }
      };

    case "CANCEL_SUBSCRIPTION":

      return {
        ...state,
        userData: {
          ...state.userData,
          package: null,
          subscription: null,
          feature: {
            ...state.userData.feature,
            readingStyle: false,
            ads: true,
          }
        }
      };

    case "READING_STYLE":
      return {
        ...state,
        userData: {
          ...state.userData,
          feature: {
            ...state.userData.feature,
            readingStyle: action.payload,
          }
        }
      };


    default:
      return state;
  }
};
