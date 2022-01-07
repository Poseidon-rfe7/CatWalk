# CatWalk
> frontend redesign for a web based clothing store

Project Catwalk was designed with the user experience in mind to make shopping for your favorite style simple, fun, and interactive while maintaining providing enough information about the products to allow users to make reasonable decisions about what they will buy.

### Initial Configuration
With the project cloned down to your local machine, you must run npm i to install all dependencies.
To make api calls you need a github authenticated token stored in a .env file in the root of the project, inside the .env you will need to store the token as the value of GITHUB_API_KEY="token here"

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/Poseidon-rfe7/CatWalk
cd into root of project
load into your favorite ide
```

### Building
```
after any changes you must run `npm run react-dev`
```
this will compile and build the code

## Features
Menu and home button: We include a menubar at the top with quick links to the specific modules as well as a button at the bottom right present at all times that will bring you back to the top of the app.

Product overview component: where you can view your currently selected item of choice, see all of its optional styles, photos of each style, information on the product as well as a quick rating and the price as well as a selection for sizes and the ability to add the selected item with your configuration to the cart.

Related Items component: See all the items that are related to the currently viewed product in a carousel of cards containing a picture of the item and some information. Each card also includes an action button that a user can click in order to compare the current item to the particular related item which will prompt a modal to come into focus listing shared or non-shared features and comparing the price.

YourOutfits: A similar component to Related items. This section is in carousel format containing a single card by default which will allow you to click on it at any time to add the currently selected product into a list called Your Outfits, to store choices and build up a wardrobe or wish list. These cards can also be removed by clicking the action buttons on the top right of the card.

Questions and Answers:

Ratings and Reviews:


## Links

https://github.com/Poseidon-rfe7/CatWalk

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/productoverview.png?raw=true

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/relateditems1.png?raw=true

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/relateditems2.png?raw=true

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/qa1.png?raw=true

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/qa2.png?raw=true

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/review1.png?raw=true

https://github.com/Poseidon-rfe7/CatWalk/blob/main/ScreenShots/review2.png?raw=true