# PRIMO EXPLORE REX
The Primo Customization Package for the discovery platform of the Royal Library.

## Installation
- Clone or download this repository into the proper place in your [Primo Development Environment](https://github.com/ExLibrisGroup/primo-explore-devenv).
- Navigate into the repository.
- Run `npm install` to install development dependencies.

## Starting CSS preprocessing
     cd <repository-dir>/css
     sass --watch ./sass:.

## Building the package
     cd <repository-dir>
     gulp run --view NUI --browserify

## Running unit tests
    cd <repository-dir>
    npm test

## License

This software is released under the [MIT License](http://www.opensource.org/licenses/MIT).