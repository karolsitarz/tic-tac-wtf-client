import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const TextInputSpan = styled.span`
  text-transform: uppercase;
  font-size: .75em;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: 50%;
  white-space: nowrap;
  transition: opacity .3s ease, transform .3s ease;
  transform: translate3d(-50%,-50%,0);
  opacity: .5;
  color: ${props => props.theme.main};
  
  &::before {
    content: "";
    background: ${props => props.theme.inputPlate};
    position: absolute;
    width: calc(100% + 2em);
    height: calc(100% + .5em);
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    border-radius: 100px;
    transition: opacity .3s ease;
    opacity: 0;
  }
`;
const StyledTextInput = styled.input`
  border-radius: 3em;
  overflow: hidden;
  padding: .75em 2em;
  display: inline-block;
  background-color: ${props => props.theme.input};
  border: 0;
  text-align: center;
  font-weight: 700;
  font-size: .8em;
  width: 100%;
  max-width: 300px;
  margin: .5em 0;
  pointer-events: auto;

  &:focus + span,
  &:not(:placeholder-shown) + span {
    transform: translate3d(-50%,-2em,0) scale(.75);
    opacity: 1;
  }
  &:focus + span::before,
  &:not(:placeholder-shown) + span::before {
    opacity: 1;
  }
`;

//

export default class TextInput extends Component {
  constructor (props) {
    super(props);
    const { initial, maxLength } = this.props;

    this.state = {
      value:
        (initial && maxLength && initial.length <= maxLength) ||
        (initial && !maxLength)
          ? initial
          : ''
    };
  }
  updateText (value) {
    if ((this.props.maxLength && value.length <= this.props.maxLength) ||
      this.props.maxLength == null) {
      this.setState({ value: this.props.uppercase ? value.toUpperCase() : value });
    }
  }
  render () {
    if (this.props.sendValue) this.props.sendValue(this.state.value);

    return (
      <label>
        <StyledTextInput
          type='text'
          onChange={e => this.updateText(e.target.value)}
          value={this.state.value}
          maxLength={this.props.maxLength}
          placeholder=' ' />
        <TextInputSpan>
          {this.props.placeholder}
        </TextInputSpan>
      </label>
    );
  }
}

//

const StyledButton = styled.div`
  border-radius: 100vmax;
  overflow: hidden;
  padding: ${props => typeof (props.children) === 'object' ? '.7em 1.5em' : '.7em 3.85em .7em 4em'};
  text-transform: uppercase;
  font-weight: 700;
  font-size: .75em;
  letter-spacing: .15em;
  cursor: pointer;
  border: 0;
  display: inline-flex;
  text-align: center;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 0.5em 1em 0 ${props => props.theme.lightShadow},
    0 0 0 1px #00000005;
  margin: .5em 0;
  background-size: cover;
  background-position: center;
  background-color: ${props => props.theme.secondaryButton};
  pointer-events: ${props => (props.hidden || props.disabled) ? 'none' : 'auto'};
  opacity: ${props => props.hidden ? 0 : props.disabled ? 0.3 : 1};
  transition: opacity .3s ease;

  ${props => props.primary && css`
    background-image: linear-gradient(to right, ${props => props.theme.gradient});
    /* box-shadow: 0 0.5em 1em 0 #00000022; */
  `}

  color: ${props => props.primary ? props.theme.primaryButtonText : props.theme.buttonText};
  fill: ${props => props.primary ? props.theme.primaryButtonText : props.theme.buttonText};

  & svg {
    height: 1em;
    pointer-events: none;
  }
`;

export const Button = props => (
  <StyledButton
    onClick={props.onClick}
    primary={props.primary}
    disabled={props.disabled}
    hidden={props.hidden} >
    {props.children}
  </StyledButton>
);

//

const StyledOr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.75em;
  width: 50%;

  &::after, &::before {
    content: "";
    flex-grow: 1;
    background: ${props => props.theme.inputPlate};
    height: 0.2em;
  }
  > span {
    font-weight: bold;
    color: #aaa;
    margin: .5em;
  }
`;

export const Or = props => (
  <StyledOr><span>{props.text ? props.text : 'or'}</span></StyledOr>
);
