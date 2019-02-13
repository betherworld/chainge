import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist as syntaxStyle } from "react-syntax-highlighter/dist/styles/hljs";

import GraphColoring from "./examples/GraphColoring";
import ArrayToArray from "./examples/ArrayToArray";
import ArrayToElement from "./examples/ArrayToElement";
import GraphToArray from "./examples/GraphToArray";
import GraphToTable from "./examples/GraphToTable";

/**
 * An algorithm example
 * @returns {Component} The component
 */
class Example extends React.PureComponent {
  constructor() {
    super();
    this.state = { error: null };
  }
  /**
   * Catches a potential error
   * @param {Object} info Additional information about the eror
   * @param {Object} error The actual error
   * @returns {void}
   */
  componentDidCatch = (info, error) => {
    this.setState({ error });
  };

  render = () => {
    const { visualization } = this.props;
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <h2>{error.name}</h2>
          <p>{error.message}</p>
          <SyntaxHighlighter language="javascript" style={syntaxStyle}>
            {JSON.stringify(error.stack, null, 2)}
          </SyntaxHighlighter>
        </div>
      );
    }

    switch (visualization) {
      case "graph-to-graph":
        return <GraphColoring {...this.props} />;
      case "graph-to-array":
        return <GraphToArray {...this.props} />;
      case "graph-to-table":
        return <GraphToTable {...this.props} />;
      case "array-to-array":
        return <ArrayToArray {...this.props} />;
      case "array-to-element":
      case "element-to-element":
        return <ArrayToElement {...this.props} />;
      default:
        return null;
    }
  };
}

export default Example;
