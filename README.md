# York Recycling


[![CircleCI](https://circleci.com/gh/aldreth/york-recycling.svg?style=svg)](https://circleci.com/gh/aldreth/york-recycling)

Display recycling information for York households, remembering the previously input location.

## Motivation

The [York Refuse/Recycling Collection Lookup website](https://bincollections.azurewebsites.net/) doesn't remember your previously selected location, which annoys me.

Thanks to the city council for leaving the apis open though, so I could use them.

## Development

### Requirements:
* node (version 14)

This is a react project. It uses redux to manage global state.

To run the project locally, clone and cd into its directory.

```
npm install
npm start
```

To run tests

```
npm test
```

## Deployment

The project is automatically deployed to netlify when pull requests are merged.
