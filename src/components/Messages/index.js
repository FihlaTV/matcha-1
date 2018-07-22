import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import type { MessageType } from 'app/types/Message';
import { MARGINS, COLORS } from 'app/constants/design';
import moment from 'moment';
import { injectIntl } from 'react-intl';

const styles = StyleSheet.create({
  leftBubble: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: MARGINS.TINY,
  },
  leftBubbleText: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.GREY_LIGHTEST,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: MARGINS.SMALL,
    paddingVertical: MARGINS.TINY,
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    padding: MARGINS.SMALL,
  },
  messageProfile: {
    backgroundColor: COLORS.GREY_DARK,
    borderRadius: 20,
    height: 40,
    marginRight: MARGINS.SMALL,
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  photoProfile: {
    backgroundColor: COLORS.GREY_DARK,
    borderRadius: 10,
    height: 20,
    marginRight: MARGINS.SMALL,
    marginTop: MARGINS.TINY,
    width: 20,
  },
  rightBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.BLUE_LIGHT,
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: MARGINS.TINY,
    paddingHorizontal: MARGINS.SMALL,
    paddingVertical: MARGINS.TINY,
  },
  timeText: {
    color: COLORS.GREY_DARK,
    fontSize: 12,
  },
});

type MessageProps = {
  message: MessageType,
};

const Message = (props: MessageProps) => (
  <View style={styles.messageContainer}>
    <Text style={styles.timeText}>
      {
        moment(Date.now()).diff(moment(props.message.createdAt), 'days') > 5 // eslint-disable-line
          ? moment(props.message.createdAt).format('dddd, MMM Do YYYY, h:mm:ss')
          : moment(props.message.createdAt).fromNow()
      }
    </Text>
    {
      props.message.from.username === 'admin' ?
        <View style={styles.rightBubble}>
          <Text style={{ color: COLORS.WHITE }}>{props.message.message}</Text>
        </View> :
        <View style={styles.leftBubble}>
          <Image style={styles.photoProfile} source={{ uri: props.message.from.picture }} />
          <View style={styles.leftBubbleText}>
            <Text style={{ flexWrap: 'wrap', maxWidth: 325 }}>{props.message.message}</Text>
          </View>
        </View>
    }
  </View>
);

type MessagesProps = {
  messages: Array<MessageType>,
};

const Messages = (props: MessagesProps) => (
  <View style={styles.messagesContainer}>
    {props.messages.length > 0 &&
      <View style={styles.messageContainer}>
        <Text style={styles.timeText}>
          {moment(props.messages[0].createdAt).format('dddd, MMM Do YYYY, h:mm:ss')}
        </Text>
        <Text style={{ color: COLORS.GREY_DARK, marginTop: MARGINS.TINY, textAlign: 'center' }}>
          {props.intl.formatMessage({ id: 'Messages.match' })}
        </Text>
      </View>}
    {props.messages.map((message) =>
      (
        !message.match.data[0]
          ? <Message key={message.id} message={message} />
          : null
      ))
    }
  </View>
);

export default injectIntl(Messages);
export { Messages, Message };
