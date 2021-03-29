# Magic the Gathering card searching app

## Links:

Live version: [link](https://mtg-card-searching-app.herokuapp.com)\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)\
To generate routes: [react-router](https://reactrouter.com/web/guides/quick-start)\
For data store: [react-redux](https://react-redux.js.org)\
Style guides: [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react) and [Efficient Code Organization in React-Redux](https://medium.com/hazesoft/efficient-code-organization-in-reactjs-416739947b50)\
API: [Magic: The Gathering SDK](https://github.com/MagicTheGathering/mtg-sdk-javascript)

## Logic:

Store data:

-  Search parameters for api calls are stored in redux. Initial states can be data from url or empty strings. If the data from url doesn't match any default values, the stored data will be empty strings.

Dynamic url:

-  Every parameter change generate a dynamic url. For that I mainly use the useHistory hook.

Fetch data:

-  Url changes trigger the api, so it's possible to use it by type the right parameters in the url.

Pagination:

-  For pagination I use "infinite scroll". If you reach the bottom, the api do another call again and again till there are no more cards to call. A "jump to top" button will shown up if the scroll reach a specific position. This will scroll up to the top.

Status messages:

-  Every api call are shown in the top of the screen. Either can be "Loading..." or "No more cards!".

Individual/Simple cards:

-  By clicking any card, it redirect another page with more details and a back button. Clicking the back button will jump back to the previous page. For that I used the useHistory hook `history.goback()` function.

## Usage:

```
git clone "repository url"
cd "repository folder"
npm i
npm start
```
