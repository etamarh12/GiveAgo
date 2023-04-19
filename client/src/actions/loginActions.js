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
    const responseData = await response.json();
    dispatch({ type: 'FETCH_LOGIN_SUCCESS', payload: responseData });
  } catch (error) {
    if (error.status === 401) {
      dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: 'Invalid credentials' });
    } else {
      dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: error.message });
    }
  }
};