import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { colors } from "../utilities/style";
import Container from "../components/Container";
//import HeaderImage from "../components/HeaderImage";
//import HeaderImage from "../../img/header.svg";
import MediaQuery from "../components/MediaQuery";
import BisonCompressed from "../../img/bison-compressed.jpg";

const SliderWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 300px;
  /*max-height: 25vh;*/
  overflow: hidden;

  background-color: ${colors.primary};
  background-image: url(${BisonCompressed});
  background-size: 100% auto;
  background-position: center 70%;
  background-repeat: no-repeat;

  img{
    width: 100%;
    height: auto;
    display: block;
  }
`;
/**
 * The slider component
 * @returns {Component} The component
 */
class Slider extends React.PureComponent {
  render = () => {
    return (
      <SliderWrapper>
      </SliderWrapper>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Slider);
