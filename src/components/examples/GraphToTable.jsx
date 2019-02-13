import React from "react";
import { Flex, Box } from "grid-styled";
import { Sigma } from "react-sigma";
import styled from "styled-components";

import { mapEdges } from "./GraphColoring";

const Table = styled.table`
  border-collapse: collapse;
  text-align: center;

  td {
    border: #000 1px solid;
    padding: 0.125rem 0.25rem;
  }
`;

/**
 * Graph Input, Table Output
 * @returns {Component} The component
 */
class GraphToTable extends React.PureComponent {
  render = () => {
    const {
      arguments: args,
      functionName,
      code,
      verticesArgumentIndex,
      edgeInputType = "adjacencyList",
      edgeInputArgumentIndex,
      directed = false
    } = this.props;

    const vertices = JSON.parse(args[verticesArgumentIndex].argument);
    const edges = JSON.parse(args[edgeInputArgumentIndex].argument);

    const inputGraph = {
      nodes: vertices.map((vertex, index) => ({ ...vertex, id: index })),
      edges: mapEdges(edges, edgeInputType, directed)
      //[{ id: "e1", source: "n1", target: "n2", label: "SEES" }]
    };

    const compiledArguments = args.map(arg => JSON.parse(arg.argument));
    const fn = eval(code + functionName + ";"); //get a reference to the function
    const output = fn.apply(this, [...compiledArguments]);

    return (
      <Flex wrap>
        <Box width={[1 / 2, 1 / 2, 1 / 2, 1 / 2]} pr={2}>
          <h2>Input</h2>
          <Sigma
            style={{ width: "100%", height: "150px" }}
            renderer="canvas"
            graph={inputGraph}
            settings={{
              drawEdges: true,
              drawEdgeLabels: true,
              clone: false,
              scalingMode: "inside",
              sideMargin: 0.2,
              zoomMin: 1,
              zoomMax: 1
            }}
          />
        </Box>
        <Box width={[1 / 2, 1 / 2, 1 / 2, 1 / 2]} pr={2}>
          <h2>Output</h2>
          <Table>
            <tbody>
              <tr>
                <td />
                {output[0].map((_e, index) => (
                  <td key={index}>{vertices[index].label}</td>
                ))}
              </tr>
              {output.map((row, index) => (
                <tr key={index}>
                  <td>{vertices[index].label}</td>
                  {row.map((el, index) => (
                    <td key={index}>
                      {el !== Infinity ? JSON.stringify(el, null, 2) : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Flex>
    );
  };
}

export default GraphToTable;
