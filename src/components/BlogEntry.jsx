import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import Wrapper from "../components/Wrapper";
import Link from "../components/Link";
import Page from "../components/Page";
import Container from "../components/Container";
import Thumbnail from "../containers/Thumbnail";
import { colors, shadows } from "../utilities/style";

const EntryWrapper = styled(Container)`
  margin: 1rem auto;
  padding: 0;

  color: ${colors.primary};
  background-color: ${colors.backgroundContrast};

  word-break: break-word;

  & > div {
    box-shadow: ${shadows.y};
    padding: 1rem;
  }

  h2 {
    margin: 0.5rem 0 0 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const SmallDate = styled.time`
  margin: 0.5rem 0;
  display: block;
`;

/**
 * A blog entry
 * @returns {Component} The component
 */
class BlogEntry extends React.PureComponent {
  render = () => {
    const {
      title,
      slug,
      content,
      thumbnailId,
      thumbnailUrl,
      date,
      instagram
    } = this.props;

    const linkProps = instagram
      ? {
          onClick: () => {
            window.open("https://www.instagram.com/p/" + slug, "_blank");
          }
        }
      : { to: `/post/${slug}` };

    return (
      <Container>
        <EntryWrapper>
          <Link {...linkProps}>
            {thumbnailId ? <Thumbnail id={thumbnailId} /> : null}
            {thumbnailUrl ? <img src={thumbnailUrl} /> : null}
            <h2>{title}</h2>
            <SmallDate>
              {date
                .getDate()
                .toString()
                .padStart(2, "0")}
              .{(date.getMonth() + 1).toString().padStart(2, "0")}.
              {date.getFullYear()}
            </SmallDate>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Link>
        </EntryWrapper>
      </Container>
    );
  };
}

BlogEntry.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnailId: PropTypes.number.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  instagram: PropTypes.bool
};

export default BlogEntry;
