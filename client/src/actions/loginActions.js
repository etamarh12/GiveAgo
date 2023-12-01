export const fetchLogin = (userName, password) => async (dispatch) => {
  dispatch({ type: 'FETCH_LOGIN_REQUEST' });
  try {
    const data = { UserName: userName, Password: password };
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      setTimeout(() => {
        dispatch({ type: 'FETCH_LOGIN_SUCCESS', payload: responseData });
      }, 2000);
    } else {
      const responseData = await response.json();
      setTimeout(() => {
        dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: responseData.error });
      }, 2000);
      console.log(responseData.error);
    }
  } catch (error) {
    if (error.status === 401) {
      dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: 'Invalid credentials' });
    } else {
      console.log("5");
      dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: error.message });
    }
  }
};
export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  };
};