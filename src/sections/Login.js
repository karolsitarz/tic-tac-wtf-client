import React, { Component } from 'react';

import Section from '../components/Section';
import Input, { Button } from '../components/Input';
import socket from '../util/socketSetup';
import Consumer from '../util/Context';

export default class Login extends Component {
  render () {
    return (
      <Section>
        <Input
          sendValue={v => (this.input = v)}
          maxLength={20}
          placeholder='nickname' />
        <Button
          onClick={e => socket.comm('USER_LOGIN_PROMPT', { username: this.input })}
          primary>
          jump in!
        </Button>
        <Consumer>{context => <TransparentEvent context={context} />}</Consumer>
      </Section>
    );
  }
}
class TransparentEvent extends Component {
  constructor (props) {
    super(props);
    socket.receive('USER_LOGIN_SUCCESS', e => this.props.context.changeSection('RoomJoin'));
  }
  render () {
    return <React.Fragment />;
  }
}