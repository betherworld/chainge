import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import BlogEntry from "../components/BlogEntry";
import { fetchLatest } from "../actions/post";
import { getPosts } from "../reducers";

/**
 * The blog feed
 * @returns {Component} The component
 */
class Feed extends React.PureComponent {
  componentWillMount = () => {
    const { fetchLatest } = this.props;
    fetchLatest();
  };
  render = () => {
    const { posts } = this.props;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Nico Hauser | Blog</title>
        </Helmet>
        <Page title="Blog" year={new Date().getFullYear().toString()}>
          {posts
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map(
              ({
                id,
                title,
                slug,
                excerpt,
                date,
                thumbnailId,
                thumbnailUrl,
                instagram
              }) => (
                <BlogEntry
                  key={id}
                  date={date}
                  title={title}
                  slug={slug}
                  content={excerpt}
                  thumbnailId={thumbnailId}
                  thumbnailUrl={thumbnailUrl}
                  instagram={instagram}
                />
              )
            )}
        </Page>
      </Wrapper>
    );
  };
}

const mapStateToProps = state => ({ posts: getPosts(state) });
const mapDispatchToProps = dispatch => ({
  /**
   * Fetches the latest posts
   * @returns {Promise} The fetch promise
   */
  fetchLatest() {
    return dispatch(fetchLatest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
