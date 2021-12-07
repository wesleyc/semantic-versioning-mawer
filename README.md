# semantic-versioning-mawer

semantic-versioning-mawer is a javascript library for comparing two semantic versions and returns the one with higher precedence.

## Installation

Use git and node package manager to install semantic-versioning-mawer.

```bash
git clone https://github.com/wesleyc/semantic-versioning-mawer.git

npm install
```

## Usage

```javascript
const compareVersions = require("./index");

# return '1.0.0' 
compareVersions('1.0.0', '1.0.0')

# returns '2.0.0'
compareVersions('1.0.0', '2.0.0')

# returns '2.1.0'
compareVersions('2.1.0', '2.0.0')

# returns '1.0.0'
compareVersions('1.0.0', '1.0.0-rc')
```

## Unit Tests

Use the command below to run unit tests.

```bash
npm run test
```