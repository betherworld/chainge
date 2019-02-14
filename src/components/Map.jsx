import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import {
  FaSearchPlus as ZoomIn,
  FaSearchMinus as ZoomOut
} from "react-icons/fa";
import styled from "styled-components";

const ZoomButtons = styled.div`
  display: flex;
  justify-content: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    padding: 0.25rem 0.5rem;
  }
`;

const RelativeDiv = styled.div`
  position: relative;
`;

const markers = [];

/**
 * Map
 * @returns {void}
 */
class Map extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      zoom: 5
    };
  }

  handleZoomIn = () => {
    this.setState({
      zoom: this.state.zoom * 2
    });
  };
  handleZoomOut = () => {
    this.setState({
      zoom: this.state.zoom / 2
    });
  };

  render = () => {
    return (
      <RelativeDiv>
        <ComposableMap
          projectionConfig={{ scale: 1000 }}
          width={1000}
          height={500}
          style={{
            width: "500px",
            height: "250px"
          }}
        >
          <ZoomableGroup center={[12, 24]} zoom={this.state.zoom}>
            <Geographies geography="/maps/romania.json">
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "#FFC674",
                        stroke: "#A15F00",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      hover: {
                        fill: "#FFB64B",
                        stroke: "#A15F00",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      pressed: {
                        fill: "#333",
                        stroke: "#A15F00",
                        strokeWidth: 0.75,
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
            <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                  style={{
                    default: { fill: "#FF5722" },
                    hover: { fill: "#FFFFFF" },
                    pressed: { fill: "#FF5722" }
                  }}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={10}
                    style={{
                      stroke: "#FF5722",
                      strokeWidth: 3,
                      opacity: 0.9
                    }}
                  />
                  <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fill: "#607D8B"
                    }}
                  >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <ZoomButtons>
          <button onClick={this.handleZoomIn}>
            <ZoomIn />
          </button>
          <button onClick={this.handleZoomOut}>
            <ZoomOut />
          </button>
        </ZoomButtons>
      </RelativeDiv>
    );
  };
}

export default Map;
