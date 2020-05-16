import {GET_REPOS} from './ActionTypes';
import {highOrderReducer} from 'api-request-biolerplate-actions';

const initialState = {
  repos: [],
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'SUCCESS_' + GET_REPOS:
      return {
        repos: payload.data,
      };

    default:
      return state;
  }
};

export default highOrderReducer(
  initialState,
  [
    {
      requestEndPoint: 'users/hossamnasser938/repos',
      baseActionType: GET_REPOS,
      errorMessage: 'failed to get repos',
    },
  ],
  reducer,
);
