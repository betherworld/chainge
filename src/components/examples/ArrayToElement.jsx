import React from "react";
import { Flex, Box } from "grid-styled";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist as syntaxStyle } from "react-syntax-highlighter/dist/styles/hljs";

/**
 * Array Input, Element Output
 * @returns {Component} The component
 */
class ArrayToElement extends React.PureComponent {
  render = () => {
    const { arguments: args, functionName, code } = this.props;

    const compiledArguments = args.map(arg => JSON.parse(arg.argument));
    const originalArguments = args.map(arg => JSON.parse(arg.argument));
    const fn = eval(code + functionName + ";"); //get a reference to the function
    const output = fn.apply(this, [...compiledArguments]) || 0;

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
      </Flex>
    );
  };
}

export default ArrayToElement;
