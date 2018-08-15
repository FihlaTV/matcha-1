import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { injectIntl } from 'react-intl';
import { COLORS, MARGINS, FONT_SIZES } from 'app/constants/design';
import { login } from 'app/pages/Auth/actions';
import Layout from 'app/components/Layout/Basic';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderColor: COLORS.GREY,
    margin: MARGINS.SMALL2,
    width: 300,
  },
  title: {
    fontSize: FONT_SIZES.BIG,
    marginBottom: MARGINS.BIG,
  },
});

type Props = {
  intl: any,
  login: Function,
};

type State = {
  password: string,
  username: string,
}

class Login extends Component<Props, State> {
  state = {
    email: '',
    token: '',
  }

  render() {
    return (
      <Layout noTabs>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.intl.formatMessage({ id: 'ConfirmationPage.title' })}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={this.props.intl.formatMessage({ id: 'ConfirmationPage.email' })}
            value={this.state.email}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={this.props.intl.formatMessage({ id: 'ConfirmationPage.token' })}
            value={this.state.token}
            autoCapitalize="none"
            onChangeText={(token) => this.setState({ token })}
          />
          <Button
            title={this.props.intl.formatMessage({ id: 'ConfirmationPage.button' })}
            onPress={() => this.props.login(this.state.username, this.state.password)}
          />
          <View style={{ marginTop: MARGINS.SMALL }}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
                {this.props.intl.formatMessage({ id: 'ConfirmationPage.resend' })}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: MARGINS.SMALL }}>
            <TouchableOpacity onPress={() => Actions.signup()}>
              <Text style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
                {this.props.intl.formatMessage({ id: 'ConfirmationPage.signup' })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(injectIntl(Login));
