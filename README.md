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

```shell
git clone https://github.com/Poseidon-rfe7/CatWalk
cd CatWalk
npm i
npm run react-dev
npm start
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

Ratings and Reviews: This module allows viewing and submission of reviews for the product selected.  The functionality contained within this module can be divided into several pieces:
1. Write new review
2. Reviews List
3. Sorting 
4. Rating Breakdown
5. Product Breakdown

![ratings_reviews](https://user-images.githubusercontent.com/86323698/148602527-c9cddc20-5012-47e3-88ab-6a55d8a7a584.gif)

## Links

https://github.com/Poseidon-rfe7/CatWalk


## Screenshots

![productoverview](https://user-images.githubusercontent.com/89159410/148569194-52928a5b-9f18-4cf4-a068-563d84f9e2cc.png)
![relateditems1](https://user-images.githubusercontent.com/89159410/148569198-e2c67488-d4d7-47a0-8b0d-75a0ed5232ff.png)
![relateditems2](https://user-images.githubusercontent.com/89159410/148569199-eaed03f0-a090-4690-b555-5c5c504519e3.png)
![qa1](https://user-images.githubusercontent.com/89159410/148569202-2cdb08db-c40f-401b-9e95-d34a61c126fa.png)
![qa2](https://user-images.githubusercontent.com/89159410/148569203-6136aecb-7746-4602-9632-38764a0e0407.png)
![review1](https://user-images.githubusercontent.com/89159410/148569205-76245335-848c-4f4d-b81a-f786d57afccb.png)
![review2](https://user-images.githubusercontent.com/89159410/148569208-2036a1f2-3da7-4653-b25f-d4de803e2cae.png)
