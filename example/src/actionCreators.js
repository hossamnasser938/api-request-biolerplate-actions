import axios from 'axios';

export const getRepos = () => (dispatch, getState) => {
  axios.get(`users/hossamnasser938/repos`);
};
