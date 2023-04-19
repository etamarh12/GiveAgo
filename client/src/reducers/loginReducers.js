const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  loading: false,
  user: storedUser || {},
  error: null,
  isLoggedIn: Boolean(storedUser)
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, loading: false, user: action.payload, isLoggedIn: true };
    case 'FETCH_LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...state, user: {}, isLoggedIn: false };
    default:
      return state;
  }
};