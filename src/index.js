import React from 'react';
import {
  compose,
  getDisplayName,
  hoistStatics,
  setDisplayName,
  setPropTypes,
  wrapDisplayName
} from 'recompose';

export default hoistStatics(C => {
  const Restrict = props => <C {...props} />;
  const propTypes = C.propTypes || {};
  return compose(
    setDisplayName(wrapDisplayName(getDisplayName(C), 'restrict')),
    setPropTypes({
      ...propTypes,
      __restrict__: (props, propName, componentName) => {
        const extras = Object.keys(props).reduce((memo, key) => {
          if (!propTypes.hasOwnProperty(key)) {
            memo.push(key);
          }
          return memo;
        }, []);
        if (extras.length) {
          return new TypeError(`Invalid additional prop(s): [${extras.map(extra => `'${extra}'`).join(', ')}] supplied to ${componentName}.`);
        }
      }
    })
  )(Restrict);
});
