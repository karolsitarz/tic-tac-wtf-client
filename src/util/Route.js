import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { connect } from 'react-redux';

const StyledDiv = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: transform .4s ease, opacity .4s ease;

  &.section-exit {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  &.section-exit-active {
    pointer-events: none;
    z-index: 100;
    opacity: 0;
    transform: translate3d(0,1em,0);
  }
  &.section-enter {
    opacity: 0;
    transform: translate3d(0,-1em,0);
  }
  &.section-enter-active {
    pointer-events: none;
    opacity: 1;
    transform: translate3d(0,0,0);
  }
`;

const Route = props => (
  <CSSTransition
    in={props.for === props.section}
    timeout={400}
    classNames='section'
    unmountOnExit >
    <StyledDiv key={props.for}>
      {props.target ? <props.target /> : props.children}
    </StyledDiv>
  </CSSTransition>
);

const mapStateToProps = ({ section }) => ({ section });

export default connect(mapStateToProps)(Route);
