import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { fetch as fetchThumbnail } from "../actions/attachment";
import { getAttachmentById } from "../reducers";
import Placeholder from "../components/Placeholder";

const StyledThumbail = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

/**
 * The thumbnail component
 * @returns {Component} The component
 */
class Thumbnail extends React.PureComponent {
  constructor() {
    super();

    this.state = { fetched: false, error: false };
  }

  componentWillMount = () => {
    const { id, fetchThumbnail, thumbnail } = this.props;

    if (id > 0 && !thumbnail) {
      fetchThumbnail();
    }
  };
  /**
   * Called when the image is loaded
   * @param {Object} event The load event
   * @returns {void}
   */
  onImageLoad = event => {
    this.setState({ fetched: true });
  };
  /**
   * Called when the image loading failed
   * @param {Object} event The load event
   * @returns {void}
   */
  onImageError = event => {
    this.setState({ error: true });
  };

  render = () => {
    const { id, thumbnail, size = "medium_large" } = this.props;
    const { fetched, error } = this.state;

    const thumbnailUrl =
      thumbnail && thumbnail.mimeType && thumbnail.mimeType.startsWith("image/")
        ? thumbnail.sizes
          ? thumbnail.sizes[size]
            ? thumbnail.sizes[size].source_url
            : thumbnail.url
          : thumbnail.url
        : "";

    const show = fetched && !error && thumbnail && thumbnailUrl;

    return (
      <StyledThumbail>
        {thumbnail &&
          thumbnailUrl && (
            <img
              onLoad={this.onImageLoad}
              onError={this.onImageError}
              width={thumbnail.width}
              height={thumbnail.height}
              src={thumbnailUrl}
              style={
                show
                  ? {}
                  : { position: "absolute", width: 1, height: 1, zIndex: -1 }
              }
            />
          )}

        {!show && <Placeholder height={8} error={error} />}
      </StyledThumbail>
    );
  };
}

Thumbnail.propTypes = {
  id: PropTypes.number,
  size: PropTypes.string
};

const mapStateToProps = (state, { id }) => ({
  thumbnail: getAttachmentById(state, id)
});
const mapDispatchToProps = (dispatch, { id }) => ({
  /**
   * Fetches a thumbnail
   * @returns {Promise} The fetch promise
   */
  fetchThumbnail() {
    return dispatch(fetchThumbnail(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thumbnail);
