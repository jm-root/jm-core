# jm-core

core lib for jm-* projects

- install

```javascript
npm install --save jm-core
```

- ES6

```javascript
import JM from 'jm-core';
let jm = new JM();
jm.logger.debug('works.');

```

- node

```javascript
var JM = require('jm-core');
var jm = new JM();
jm.logger.debug('works.');

//也可以采用全局变量jm，不推荐
require('jm-core');
jm.logger.debug('works.');

```

- browser

```
<script src="dist/js/jm-core.js"></script>
<script>
    jm.logger.debug('works.');
</script>
```

### define a module

```
// es6
let moduleErr = ($, name = 'ERR') => {
    enableErr($, name);

    return {
        name: name,
        unuse: function ($) {
            delete $[name];
        },
    };
};
export {moduleErr};
```