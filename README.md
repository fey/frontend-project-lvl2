### Hexlet tests and linter status:
<a href="https://github.com/fey/frontend-project-lvl2/actions"><img src="https://github.com/fey/frontend-project-lvl2/workflows/hexlet-check/badge.svg" alt="Actions Status"></a>

<a href="https://codeclimate.com/github/fey/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/68beae1c23a987a101cf/maintainability" /></a>
<img src="https://github.com/fey/frontend-project-lvl2/workflows/CI/badge.svg" /> <a href="https://codeclimate.com/github/fey/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/68beae1c23a987a101cf/test_coverage" /></a>

### Description

Gendiff - a program defining the difference between two data structures. 

The capabilities of the utility:

* Support for different input formats: yaml, json
* Report generation as plain text, stylish and json

### Requirements

* NodeJS 14+

### Installation

Clone or fork repository

```sh
$ make install # install dependencies
$ make test # run tests
$ make lint # run eslint
```


Usage example:

```sh
$ make setup
# plain
$ gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish
$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

Importing

```js
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2);
console.log(diff);
```

### asciinema

Parse with default output
https://asciinema.org/a/gpZ9rKPFuXQGoJddd3xQ2y2n3

Parse with plain output
https://asciinema.org/a/oLndW0cO8KUM77GxVrpCp8IUK

Parse with json output
https://asciinema.org/a/OISoLtILjt7cUMROL8q6HMs1b
