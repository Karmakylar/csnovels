import axios from "axios";
import { apiUrl } from "../../config";
import * as types from "./actionType";
import { toast } from "react-toastify";

export const userLogin = (data, loginSuccess, setError) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, data);

    console.log(response , "responseresponseresponseresponse")

    if (response?.data?.success) {
      getAllBooks(response?.data?.user?._id, response?.data?.user?.token);

      if (response.data.user?.bookmark) {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: response?.data?.user.bookmark,
        });
      }
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response?.data?.user,
      });
      loginSuccess();
      toast.success(`Welcome, ${response?.data?.user?.username || response?.data?.user?.firstName }`);
    }
  } catch (err) {
    setError(err.response.data.msg);
    // toast.error(err.response.data.msg);
  }
};
// export const subscription = async (token, interval, product) => {
//   try {
//     const data = {
//       token: token,
//       interval: interval,
//       product: product,
//     };
//   } catch (err) {
//     toast.error(err.response.data.msg);
//   }
// };
export const getpackagehistory = async (token) => {
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${apiUrl}/subscription/getUserOrder`,
      header
    );
    // console.log("0000",response);
    // console.log("0000",response.data);
    // console.log("0000",response.data.data.reverse());

    return response.data.data.reverse();
  } catch (err) {
    console.log("0001");
    toast.error(err.response.data.msg);
  }
};
export const Presubscription = async (
  token,
  interval,
  product,
  accessToken
) => {
  try {
    const data = {
      token: token,
      interval: interval,
      product: product,
    };
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${apiUrl}/subscription/createPre`,
      data,
      header
    );
    return response;
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};
export const emptychapterTitle = () => async (dispatch) => {
  return dispatch({
    type: types.GET_CHAPTERS_TITLES,
    payload: [],
  });
};
export const emptychaptercontent = () => async (dispatch) => {
  return dispatch({
    type: types.GET_ONE_CHAPTER,
    payload: [],
  });
};
export const Cancelsubs = async (accessToken) => {
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      `${apiUrl}/subscription/cancel`,
      // {},
      header
    );
    return response.data;

    // if (response.data.success) {
    //   toast.success(response.data.msg);
    //   dispatch({
    //     type: types.SUBSCRIPTION,
    //     payload: null,
    //   });
    // } else {
    //   toast.error(response.data.msg);
    // }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};
export const Canceltimesubs = async (accessToken) => {
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.delete(
      `${apiUrl}/subscription/timeTocancel`,

      header
    );
    return response.data;

    // if (response.data.success) {
    //   toast.success(response.data.msg);
    //   dispatch({
    //     type: types.SUBSCRIPTION,
    //     payload: null,
    //   });
    // } else {
    //   toast.error(response.data.msg);
    // }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};
export const customSubscription = async (
  token,
  interval,
  amount,
  accessToken
) => {
  try {
    const data = {
      token: token,
      interval: interval,
      amount: amount,
    };

    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${apiUrl}/subscription/createCustom`,
      data,
      header
    );
    return response;
  } catch (err) {
    toast.err(err.response.data.msg);
  }
};
export const updatecustomSubscription = async (
  token,
  interval,
  amount,
  accessToken
) => {
  try {
    const data = {
      token: token,
      interval: interval,
      amount: amount,
    };

    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${apiUrl}/subscription/updateCustom`,
      data,
      header
    );
    return response;
  } catch (err) {
    toast.err(err.response.data.msg);
  }
};
export const Updatesubscription = async (
  token,
  interval,
  product,
  accessToken
) => {
  try {
    const data = {
      token: token,
      interval: interval,
      product: product,
    };
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${apiUrl}/subscription/updatePre`,
      data,
      header
    );
    return response;
  } catch (err) {
    toast.err(err.response.data.msg);
  }
};

export const getpackage = async (accessToken) => {
  try {
    const header = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      `${apiUrl}/admin/packages/gets`,
      {},
      header
    );
    return response.data.data;
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const userSignUp =
  (data, loginSuccess, setError) => async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}/users/register`, data);

      if (response?.data?.success) {
        dispatch({
          type: types.SIGNUP_REQUEST,
          payload: response?.data?.user,
        });
        loginSuccess(true);

        toast.success(`Welcome, ${response.data.user.username}`);
      } else {
        loginSuccess(false);
        toast.warn(`${response?.data?.msg}`);
      }
    } catch (err) {
      setError(err?.response?.data.msg);
      // toast.error(err?.response?.data.msg);
    }
  };

export const lib_book = (books) => async (dispatch) => {
  dispatch({
    type: types.LIBRARY_BOOKS,
    // payload: {userName: res.data.title},
    payload: books,
  });
};

export const getAllBooks = (id, token) => async (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  };
  try {
    // const URL = `${apiUrl}/book/getAllBooks?category=all&limit=0&status=all&orderBy=popular&userId=${id}&page=1`;
    const response = await axios.get(`${apiUrl}/book/gets?id=${id}`, header);
    // const response = await axios.get(URL, header);
    console.log('response ',response);
    if (response.data.success) {
      dispatch({
        type: types.GET_ALL_BOOKS,
        payload: response?.data?.data,
      });
    }
  } catch (err) {
    console.log('err ',err);
  }
};

export const logout = () => (dispatch) => {
  try {
    getAllBooks(undefined, undefined);
    dispatch({
      type: types.LOGOUT_REQUEST,
    });
  } catch (err) {}
};

export const getFilteredBooks =
  (data, token, setHasMoreData) => async (dispatch) => {
    const header = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    const URL = `${apiUrl}/book/searchBooks?searchValue=&category=${data.cat}&limit=10&status=${data.status}&orderBy=${data.orderBy}&page=${data.pageNo}&userId=${data?.userId}`;

    try {
      const response = await axios.get(URL, header);
      if (response.data.success) {
        if (response?.data.data.length === 0) {
          setHasMoreData(false);
        } else {
          setHasMoreData(true);
        }
        dispatch({
          type: types.GET_FILTERED_BOOKS,
          payload: response?.data?.data,
        });
      }
    } catch (err) {}
  };

export const emptyFilteredBooks = () => async (dispatch) => {
  dispatch({
    type: types.EMPTY_FILTERED_BOOKS,
    payload: [],
  });
};

export const getFavoriteBooks = (token) => async (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  };
  try {
    const response = await axios.get(
      `${apiUrl}/favoriteBook/userFavoriteBook`,
      header
    );
    if (response.data.success) {
      dispatch({
        type: types.GET_FAVORITE_BOOKS,
        payload: response?.data?.data,
      });
    }
  } catch (err) {}
};

export const favoriteThisBook =
  (data, token, bookArrayName) => async (dispatch) => {
    const header = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${apiUrl}/favoriteBook/favoritOrunfavorite`,
        data,
        header
      );

      if (response?.data?.success) {
        toast.success(response.data.msg);
        dispatch({
          type: types.FAVORITE_THIS_BOOK,
          payload: { data: data, bookArrayName: bookArrayName },
        });
      }
    } catch (err) {
      console.log(err)
    }
  };

export const getBookChapterContents =
  (bookId, chapterId, token) => async (dispatch) => {
    const header = {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${apiUrl}/book/getSingleBookByBookId/${bookId}/${chapterId}`,
        header
      );

      if (response.data.success) {
        // dispatch({
        //   type: types.GET_BOOK_CHAPTER_CONTENT,
        //   payload: response?.data?.data,
        // });
      }
    } catch (err) {}
  };

export const getChapterTitles = (id, token) => async (dispatch) => {
  const URL = `${apiUrl}/chapter/get/${id}`;

  const authHeader = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.get(URL, authHeader);

    if (response?.data?.success) {
      dispatch({
        type: types.GET_CHAPTERS_TITLES,
        payload: response.data.data,
      });
      return response.data.data;
    }
  } catch (err) {}
};

export const getChapterContent =
  (chapterId, bookId, userId, token) => async (dispatch) => {
    if (chapterId && bookId) {
      const URL = `${apiUrl}/book/getSingleBookByBookId/${bookId}/${chapterId}?user=${
        userId ? userId : null
      }`;
      const authHeader = {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      };

      try {
        const response = await axios.get(URL, authHeader);

        if (response?.data?.success) {
          if (response?.data?.data.length > 0) {
            dispatch({
              type: types.GET_ONE_CHAPTER,
              payload: response.data.data,
            });
            return response.data.data;
          } else {
            dispatch({
              type: types.GET_ONE_CHAPTER,
              payload: [
                {
                  content: "This chapter has no content.",
                },
              ],
            });
            toast.info("This chapter has no content.");
            return response.data.data;
          }
        } else {
          dispatch({
            type: types.GET_ONE_CHAPTER,
            payload: [
              {
                content: response?.data?.msg,
              },
            ],
          });
        }
      } catch (err) {}
    }
  };

export const forgetPassword = (email, onSuccess) => async (dispatch) => {
  const data = {
    email: email,
  };
  const header = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${apiUrl}/users/forgetPassword`,
      data,
      header
    );
    if (response?.data?.success) {
      onSuccess();
      toast.success(
        "Reset password link sent. Please check your email address."
      );
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const uploadImage = (data, token) => async (dispatch) => {
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `${apiUrl}/users/uploadImage`,
      data,
      header
    );
    if (response?.data?.success) {
      toast.success("Profile Picture Changed Successfully.");
      dispatch({
        type: types.UPLOAD_PROFILE_IMAGE,
        payload: response.data.data,
      });
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const profileChanges = (data, token) => async (dispatch) => {
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.put(`${apiUrl}/users/update`, data, header);
    if (response?.data?.success) {
      toast.success("Profile Informations Updated!");
      dispatch({
        type: types.UPLOAD_PROFILE_INFORMATIONS,
        payload: data,
      });
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (err) {
    toast.error(err.response.data.msg);
  }
};

export const updatePassword = (data, token) => async (dispatch) => {
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.put(
      `${apiUrl}/users/changePassword`,
      data,
      header
    );
    if (response?.data?.success) {
      toast.success(response?.data?.msg);
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (err) {
    toast.error("Server Error");
  }
};

export const updateFeatures = (data, token) => async (dispatch) => {
  const header = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.put(
      `${apiUrl}/users/featureUpdate`,
      data,
      header
    );
    if (response?.data?.success) {
      toast.success(response?.data?.msg);
      dispatch({
        type: types.UPDATE_FEATURES,
        payload: response.data.data,
      });
    } else {
      toast.error("Account Features Updated!");
    }
  } catch (err) {
    toast.error("Server Error");
  }
};

export const getBookmarks = (token) => async (dispatch) => {
  const URL = `${apiUrl}/bookmark/getUserBookmark`;

  const authHeader = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.get(URL, authHeader);
    if (response?.data?.success) {
      dispatch({
        type: types.GET_BOOKMARKS,
        payload: response.data.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteBookMark = (id, token) => async (dispatch) => {
  const URL = `${apiUrl}/bookmark/delete/${id}`;

  const authHeader = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.delete(URL, authHeader);
    if (response?.data?.success) {
      toast.success(response?.data?.msg);
    }
  } catch (err) {}
};
export const createBookmarks = (book, chapter, token) => async (dispatch) => {
  const URL = `${apiUrl}/bookmark/create`;

  const authHeader = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  };
  const data = { book, chapter };
  try {
    const response = await axios.post(URL, data, authHeader);
    if (response?.data?.success) {
      toast.success(response?.data?.msg);
      // if(response?.data.msg=="BookMark successfully"){
      //   return true
      // }
    }
  } catch (err) {}
};

export const getBook = (book) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_BOOK,
      payload: book,
    });
  } catch (err) {}
};

export const googleLogin =
  (data, onLoginFailed, onLoginSuccess) => async (dispatch) => {
    const URL = `${apiUrl}/social/googleLogin`;

    try {
      const response = await axios.post(URL, data);
      if (response.data.success) {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: response?.data.data,
        });
        toast.success(
          `Welcome, ${response.data.data.firstName} ${response.data.data.lastName}`
        );
        onLoginSuccess();
      } else {
        onLoginFailed();
      }
    } catch (err) {
      onLoginFailed();
    }
  };

export const postReview =
  (data, token, onSuccessPostReview) => async (dispatch) => {
    const URL = `${apiUrl}/comments/create`;
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.post(URL, data, header);
      if (response.data.success) {
        toast.success(`Review Posted!`);
        onSuccessPostReview();
        // dispatch (({
          //   type:types.POST_REVIEW,
          //   payload:data
          // }))
        } else {
        toast.error(`Something went wrong in posting review.`);
      }
    } catch (err) {
      console.log('errerr ',err);
      toast.error(`Something went wrong in posting review.`);
    }
  };
  
export const getsBook = async (bookId, userId) => {
  const URL = `${apiUrl}/book/getSingleBook?book=${bookId}&user=${userId}`;
  try {
    const response = await axios.get(URL);
    if (response.data.success) {
      return { data: response.data.data };
      // dispatch (({
      //   type:types.POST_REVIEW,
      //   payload:data
      // }))
    } else {
      toast.error(`Something went wrong in getting review.`);
      // toast.error(`Something went wrong in posting review.`);
    }
  } catch (err) {
    // toast.error(`Something went wrong in posting review.`);
    toast.error(`Something went wrong in getting review.`);
  }
};
export const getSearchedBooks = (keyword, userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${apiUrl}/book/searchBooks?searchValue=${keyword}&userId=${userId}`
    );

    if (response.data.success) {
      dispatch({
        type: types.GET_SEARCHED_BOOKS,
        payload: response.data.data,
      });
    } else {
      toast.error(`Something went wrong in searching.`);
    }
  } catch (err) {
    toast.error(`Something went wrong in searching.`);
  }
};
export const getRecentChapter = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/chapter/recentChapters`);

    if (response.data.success) {
      dispatch({
        type: types.GET_RECENT_CHAPTERS,
        payload: response.data.data,
      });
    } else {
      toast.error(`Something went wrong in searching.`);
    }
  } catch (err) {
    toast.error(`Something went wrong in searching.`);
  }
};

export const emptySearchedBooks = () =>{
  return {
    type : types.EMPTY_SEARCHED_BOOKS
  }
}
