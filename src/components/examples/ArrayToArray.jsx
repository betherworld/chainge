import React from "react";
import { Flex, Box } from "grid-styled";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist as syntaxStyle } from "react-syntax-highlighter/dist/styles/hljs";

/**
 * Renders the component
 * @returns {Component} The component
 */
class ArrayToArray extends React.PureComponent {
  render = () => {
    const { arguments: args, functionName, code } = this.props;
    const snapshots = [];
    /**
     * Creates a snapshot of the current state of the array
     * @param {Array} array The array to snapshot
     * @returns {void}
     */
    const snapshot = array => snapshots.push([...array]); //can be used inside 'eval'

    const compiledArguments = args.map(arg => JSON.parse(arg.argument));
    const originalArguments = args.map(arg => JSON.parse(arg.argument));
    const fn = eval(code + functionName + ";"); //get a reference to the function
    const output = fn.apply(this, compiledArguments) || [];

    return (
      <Flex wrap>
        <Box width={[1 / 2, 1 / 2, 1 / 2, 1 / 2]} pr={2}>
          <h2>Input</h2>
          {originalArguments.map((arg, index) => (
            <div key={index}>
              <h5>Argument {index}</h5>
              <SyntaxHighlighter language="javascript" style={syntaxStyle}>
                {JSON.stringify(arg, null, 2)}
              </SyntaxHighlighter>
            </div>
          ))}
        </Box>
        <Box width={[1 / 2, 1 / 2, 1 / 2, 1 / 2]} pr={2}>
          <h2>Output</h2>
          <SyntaxHighlighter language="javascript" style={syntaxStyle}>
            {JSON.stringify(output, null, 2)}
          </SyntaxHighlighter>
        </Box>
        <Box width={[1, 1, 1, 1]} style={{ columnCount: 2 }}>
          {snapshots.map((snapshot, index) => (
            <div key={index} style={{ breakInside: "avoid-column" }}>
              <h5>Snapshot {index}</h5>
              <SyntaxHighlighter language="javascript" style={syntaxStyle}>
                {JSON.stringify(snapshot)}
              </SyntaxHighlighter>
            </div>
          ))}
        </Box>
      </Flex>
    );
  };
}

export default ArrayToArray;
