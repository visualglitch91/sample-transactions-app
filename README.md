# Sample Transactions App

A simple web app to manage financial transactions

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn lint`

Check the code for formatting discrepancy, non-adherence to coding standards and conventions and pinpointing possible logical errors in your program.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Tech Stack

- React
- material-ui
- jest
- @testing-library/react

## Implied Decimals

The code handles amounts as integers with two implied decimals, that makes it easier to handle financial calculations without having to worry about floats.

## Testing Mindset

> Write tests. Not too many. Mostly integration.

I like to follow the approach described in this article https://kentcdodds.com/blog/write-tests, focusing on the final output of components as well as their behavior when we simulate events that the real user would trigger and trying to avoid mocking behaviors and testing implementation details.

