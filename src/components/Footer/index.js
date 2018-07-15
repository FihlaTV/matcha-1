import React from 'react';
import { View, Text } from 'react-native';
import { MARGINS, COLORS, FONT_SIZES, HEADER_HEIGHT } from 'app/constants/design';
import { injectIntl } from 'react-intl';

const styles = {
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: MARGINS.SMALL,
  },
  title: {
    color: COLORS.BLUE_DARKER,
    fontSize: FONT_SIZES.BIG,
    textAlign: 'center',
  },
};

type Props = {
  intl: any,
};

const Footer = (props: Props) => (
  <View style={styles.footer}>
    <View style={styles.body}>
      <Text style={styles.title}>{props.intl.formatMessage({ id: 'Footer.home' })}</Text>
    </View>
    <View style={styles.body}>
      <Text style={styles.title}>{props.intl.formatMessage({ id: 'Footer.messages' })}</Text>
    </View>
    <View style={styles.body}>
      <Text style={styles.title}>{props.intl.formatMessage({ id: 'Footer.profile' })}</Text>
    </View>
  </View>
);
export default injectIntl(Footer);
export { Footer };

