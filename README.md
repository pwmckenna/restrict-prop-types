# restrict-prop-types

PropType warnings for extraneous props passed to the underlying component.

### Usage

```js
import restrict from 'restrict-prop-types';

class DumbComponent extends Component {
  static propTypes = {
  
  };
  ...
}

export default restrict(DumbComponent);
```

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
