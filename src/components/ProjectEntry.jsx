import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaLink, FaUsers } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

import Link from "./Link";
import Container from "./Container";
import { colors, borders } from "../utilities/style";
import Thumbnail from "../containers/Thumbnail";

const ProjectWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 2rem;

  background-color: ${({ color }) => color};
  color: #fff;
  border-radius: ${borders.radius};

  hyphens: auto;
  word-break: break-all;

  h2,
  img {
    margin: 0.5rem 0 0 0;
    font-size: 1.75rem;
  }

  img {
    height: 3rem;
    width: auto;
    display: block;

    max-width: 100%;
  }
`;

const ProjectProps = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  hyphens: manual;

  li {
    display: flex;
    align-items: center;

    & > *:first-child {
      margin-right: 1rem;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > *:first-child {
    margin-right: 1rem;
  }
`;

/**
 * An project entry
 * @returns {Component} The component
 */
class ProjectEntry extends React.PureComponent {
  render = () => {
    const {
      title,
      showTitleWithLogo,
      slug,
      thumbnailId = false,
      content,
      url,
      customColor,
      collaborators
    } = this.props;

    return (
      <ProjectWrapper color={customColor}>
        <Container>
          {thumbnailId ? (
            <Logo>
              <Thumbnail id={thumbnailId} />
              {showTitleWithLogo ? <h2>{title}</h2> : ""}
            </Logo>
          ) : (
            <h2>{title}</h2>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <br />
          <ProjectProps>
            {url && (
              <li>
                <FaLink data-tip data-for="project-url" />{" "}
                <ReactTooltip id="project-url" place="top" type="dark">
                  <span>URL</span>
                </ReactTooltip>
                <Link color="#fff" href={url} target="_blank">
                  {url}
                </Link>
              </li>
            )}
            {collaborators.length > 0 && (
              <li>
                <FaUsers data-tip data-for="project-collaborators" />{" "}
                {collaborators.join(", ")}
                <ReactTooltip
                  id="project-collaborators"
                  place="top"
                  type="dark"
                >
                  <span>Collaborators</span>
                </ReactTooltip>
              </li>
            )}
          </ProjectProps>
        </Container>
      </ProjectWrapper>
    );
  };
}

ProjectEntry.propTypes = {
  title: PropTypes.string.isRequired,
  showTitleWithLogo: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  thumbnailId: PropTypes.number,
  customColor: PropTypes.string,
  year: PropTypes.number,
  url: PropTypes.string,
  client: PropTypes.string,
  clientUrl: PropTypes.string,
  license: PropTypes.string,
  collaborators: PropTypes.array.isRequired
};

export default ProjectEntry;
