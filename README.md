# restrict-prop-types

PropType warnings for extraneous props passed to the underlying component.

### Usage

```js
import React, { Component, PropTypes } from 'react';
import restrict from 'restrict-prop-types';

class DumbComponent extends Component {
  static displayName = 'Dumb';
  static propTypes = {
    b: PropTypes.number
  };
  ...
}

render(<DumbComponent a={1} b={2} c={3}/>)
```

> 'Warning: Failed propType: Invalid additional prop(s): ['a', 'c'] supplied to restrict(Dumb).'

#### Usage as a transform

Alternatively, just put all your dumb components in the same directory, and have a .babelrc file that uses `react-transform-hoc` to apply `restrict-prop-types` to all the components.

> .babelrc
```json
{
  "presets": [
    "react"
  ],
  "plugins": [
    ["react-transform", {
      "transforms": [{
        "transform": "react-transform-hoc",
        "imports": [
          "restrict-prop-types"
        ]
      }]
    }]
  ]
}
```
