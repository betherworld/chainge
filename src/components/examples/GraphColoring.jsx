import React from "react";
import { Flex, Box } from "grid-styled";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";

/**
 * Maps different edge input types to a common format
 * @param {Object} edges The graphs edges
 * @param {string} edgeInputType The edge input type
 * @param {boolean} directed Whether the graph is directed or not
 * @returns {Object} The mapped Edges
 */
export const mapEdges = (edges, edgeInputType, directed) => {
  switch (edgeInputType) {
    case "adjacencyList":
      return [].concat.apply(
        [],
        edges.map((descendants, fromIndex) =>
          descendants.map(({ vertex: toIndex, weight }) => ({
            id: fromIndex + "-" + toIndex,
            source: fromIndex,
            target: toIndex,
            type: directed ? "arrow" : undefined,
            color: "#000",
            label: weight + ""
          }))
        )
      );
    case "adjacencyMatrix":
      const e = [];
      for (let i = 0; i < edges.length; i++) {
        for (let j = 0; j < edges[i].length; j++) {
          if (edges[i][j] !== 0) {
            e.push({
              id: i + "-" + j,
              source: i,
              target: j,
              type: directed ? "arrow" : undefined,
              color: "#000",
              label: edges[i][j] + ""
            });
          }
        }
      }
      return e;
  }
};

/**
 * Graph Input, Graph Output
 * @returns {Component} The component
 */
class GraphColoring extends React.PureComponent {
  render = () => {
    const {
      arguments: args,
      functionName,
      code,
      verticesArgumentIndex,
      edgeInputType = "adjacencyList",
      edgeInputArgumentIndex,
      directed = false,
      outputType = "vertices"
    } = this.props;

    /*console.log(args[verticesArgumentIndex].argument);
    window.vertices = args[verticesArgumentIndex].argument;*/

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

    const outputGraph = {
      ...inputGraph
    };

    switch (outputType) {
      case "vertices":
        outputGraph.nodes = output.map((vertex, index) => ({
          ...vertex,
          id: index
        }));
        break;
      case "edges":
        outputGraph.edges = output.map((edge, index) => ({
          id: index,
          type: directed ? "arrow" : undefined,
          color: "#000",
          label: edge.weight ? edge.weight + "" : undefined,
          ...edge
        }));
        break;
      case "graph":
        outputGraph.nodes = output.vertices.map((vertex, index) => ({
          ...vertex,
          id: index
        }));
        outputGraph.edges = output.edges.map((edge, index) => ({
          ...edge,
          id: index
        }));
        break;
      default:
        break;
    }

    return (
      <Flex wrap>
        <Box width={[1 / 2, 1 / 2, 1 / 2, 1 / 2]} pr={2}>
          <h2>Input</h2>
          <Sigma
            style={{ width: "100%", height: "150px" }}
            graph={inputGraph}
            renderer="canvas"
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
          <h2>Output ({outputType})</h2>
          <Sigma
            style={{ width: "100%", height: "150px" }}
            graph={outputGraph}
            renderer="canvas"
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
      </Flex>
    );
  };
}

export default GraphColoring;
