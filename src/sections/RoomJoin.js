import React, { Component } from 'react';

import Section from '../components/Section';
import Input, { Button, Or } from '../components/Input';
import socket from '../util/socketSetup';
import { connect, changeSection } from '../util/store';

class RoomJoin extends Component {
  constructor (props) {
    super(props);
    const { dispatch } = this.props;
    socket.receive('ROOM_WAIT', e => dispatch(changeSection('RoomWait')));
    socket.receive('ROOM_ACCEPT', e => dispatch(changeSection('RoomAccept')));
    socket.receive('LEAVE_ROOM', e => dispatch(changeSection('RoomJoin')));
  }
  render () {
    return (
      <Section>
        <Button
          onClick={e => socket.comm('USER_CREATE_ROOM')}
          primary>
          start a new game
        </Button>
        <Or />
        <Input
          sendValue={v => (this.input = v)}
          maxLength={16}
          placeholder='room ID' />
        <Button
          onClick={e => socket.comm('USER_JOIN_ROOM', { id: this.input })}>
          join
        </Button>
      </Section>
    );
  }
}
export default connect(null)(RoomJoin);
