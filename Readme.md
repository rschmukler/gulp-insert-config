# gulp-insert-config

## Installation

```
npm i gulp-insert-config
```

## Usage

config.json
```js
{
  "AWS_BUCKET": "my-bucket",
  "development": {
    "AWS_KEY": "abc"
  },
  "production": {
    "AWS_KEY": "efg"
  },
  "test": {
    "AWS_KEY": "hij"
  }
```

gulpfile.js

```js
var insertConfig = require('gulp-insert-config');
var config = require('./config.json');

gulp.src('app.js')
  .pipe(insertConfig(config, 'MY_CFG'));
```

app.js

```js
var config = JSON.parse("{{ MY_CFG }}");
console.log(config);

// If compiled w/ process.env.NODE_ENV == 'production'
// { AWS_BUCKET: 'my-bucket', AWS_KEY: 'efg' }
// If compiled w/ process.env.NODE_ENV == 'test'
// { AWS_BUCKET: 'my-bucket', AWS_KEY: 'hij' }
// Else
// { AWS_BUCKET: 'my-bucket', AWS_KEY: 'abc' }
```
