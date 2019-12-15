import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {GET_REPOS} from './src/ActionTypes';
import {getRepos} from './src/actionCreators';

class App extends React.Component {
  renderRepos = repos => {
    return (
      <View>
        {repos.map((item, index) => (
          <Text key={index.toString()}>Repo {index}</Text>
        ))}
      </View>
    );
  };

  render() {
    const {isLoadingRepos, repos} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {isLoadingRepos ? (
          <ActivityIndicator />
        ) : repos.length ? (
          this.renderRepos(repos)
        ) : (
          <Text onPress={this.props.onGetRepos}>Get Repos</Text>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  repos: state.repos,
  isLoadingRepos: state[GET_REPOS + 'Loading'],
  loadingReposError: state[GET_REPOS + 'Error'],
});

const mapDispatchToProps = dispatch => ({
  onGetRepos: () => dispatch(getRepos('hossamnasser938')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
