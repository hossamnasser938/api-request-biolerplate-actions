import mapRequestUrlToConfigObject from '../mapRequestUrlToConfigObject';

test('test mapRequestUrlToConfigObject', () => {
  const postsActionConfig = {
    requestUrl: 'posts',
    baseActionType: 'FETCH_POSTS',
    errorMessage: 'Error while fetching posts. Please, try again later',
    noStart: false,
    noStop: false,
    noSuccess: false,
    noError: false,
  };

  const BaseActionsConfigurations = [postsActionConfig];

  expect( mapRequestUrlToConfigObject('posts', BaseActionsConfigurations) ).toBe( postsActionConfig );
});