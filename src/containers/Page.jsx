import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Helmet } from "react-helmet";

import Wrapper from "../components/Wrapper";
import PageWrapper from "../components/Page";
import { fetch as fetchPage } from "../actions/page";
import { getPageById } from "../reducers";

/**
 * The page component
 * @returns {Component} The page component
 */
class Page extends React.PureComponent {
  componentWillMount = () => {
    const { fetchPage } = this.props;

    fetchPage();
  };
  render = () => {
    const {
      slug,
      page: { title = "", content = "", date = Date.now() }
    } = this.props;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Nico Hauser | {title}</title>
        </Helmet>
        <PageWrapper>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </PageWrapper>
      </Wrapper>
    );
  };
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { pageSlug }
    }
  }
) => ({
  slug: pageSlug,
  page: getPageById(state, pageSlug) || {}
});

const mapDispatchToProps = (
  dispatch,
  {
    match: {
      params: { pageSlug }
    }
  }
) => ({
  fetchPage() {
    return dispatch(fetchPage(pageSlug));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
);
