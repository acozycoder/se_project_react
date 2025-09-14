# WTWR - What to Wear : Clothing Suggestion App

## Overview
- Intro
- Technologies & Techniques Utilized
- Link to the Site
- Link to Project Brief


## Intro
WTWR is a clothing suggestion app that provides clothing suggestions based on the current weather. Users have the ability to toggle between fahrenheit and celsius. Future updates will give users to filter suggestions and adjust the location.

## Technologies & Techniques Utilized
The current version of WTWR utilizes basic technologies & techniques to display the starting structure of the app. The following languages were used: React, Javascript, HTML, & CSS.

### In the header

The currrent date is displayed using the Date() object.

The "+Add clothes" button is responsive and allows users to upload their own clothing, creating a personalized experience.

![Screenshot of the clothing modal](./src/images/clothing-modal.png)

The toggle switch allows users to swtich between fahrenheit and celsius.

The current version has a hard coded location, username, and user photo. User customization will be intergrated in later versions. 

### In the weather card

The main section is a wrapper for the main content of the app component.

![Screenshot of the weather card](./src/images/weather-card.png)

The weather card displays the current location's weather along with an image relevant to the time of day and weather conditions. If it is a warm, stormy night in Memphis, TN, expect to see a temperature around 75F with an image of a stormy night.

The weather card works with OpenWeather API to display accurate weather information based.

### In the item card

The item cards are displayed through a filtering system and also uses the OpenWeather API to determine weather conditions. If the weather is warm, expect to see a hoodie.

![Screenshot of the item card](./src/images/item-preview.png)

When an item card is clicked, a preview modal opens up.

### In the profile

Users have the ability to navigate to their profile. The profile contains a sidebar with user information and all the clothes users have available for suggestions.

Users will have the abilty to view all of their clothing and make deletions if they wish to do so.

Item can be deleted on the main page as well.

## Link to the backend of WTWR

[WTWR Backend](https://github.com/acozycoder/se_project_express)

## Link to the Prject Brief

[Project Brief](https://www.figma.com/design/F03bTb81Pw8IDPj5Y9rc5i/Sprint-10-%7C-WTWR)