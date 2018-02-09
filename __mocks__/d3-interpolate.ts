import * as D3 from 'd3-interpolate';

function interpolateTransformSvg(a: string, b: string) {
  return () => {
    return b;
  };
}

const d3 = {
  ...D3,
  interpolateTransformSvg
};

module.exports = d3;
