### Next.js React Native experimenta

Imagine [React Native](https://github.com/facebook/react-native), [Next.js](https://github.com/zeit/next.js/) and [React Navigation](https://github.com/react-navigation/react-navigation) together. This is an experimental project, combining features of these great tools.

## Features
- automatically generated routes from a directory ```/pages``` like with Next.js
- navigating between routes with custom Router with similar API to the Router from Next.js
- top routes components (screens) enriched with static method onFocus (similar to getInitialProps) 

## Simple demo
![Compare branches not merged into master in rails/rails repo - https://github.com/rails/rails/branches](https://imgnextnative-jbkcebaslu.now.sh/initial.gif)

## Installation
1. Clone this repo: ```git clone ```
1. Install dependencies: ```npm install```
1. Run the app in the development mode: ```npm run dev```

## Start using it
Quick way: run ```npm run dev``` - this will start the app in Expo
With more options:
1. Run ```npm run watcher``` to start watching route changes and automatically rebuilding on any change
1. Run (in another terminal window) any command from Create React Native app for your development: 
    - ```npm start``` for running the app in Expo
    - ```npm run ios``` for launching the app in an iPhone simulator
    - ```npm run android``` for launching the app in an Android simulator 

## What to try out
- Explore directory ```/pages```, which works like at Next.js framework - every file is a screen, works also with subfolders. There are some screens for demonstration already prepared.
- You can specify properties of any folder (screen stack) by making a file ```routes.config.js``` (optional) in it. It should export an object with two properties - navigator and navigatorConfig:
  - navigator:
    - "TAB" = TabNavigator from react-navigation will be used for files and folders (screens and stacks) in this folder (default)
    - "STACK" = StackNavigator will be used
  - navigatorConfig:
    - navigatorConfig object used as second parameter for TabNavigator and StackNavigator. You can specify anything here like in normal react-navigation (type of animation, enable swiping...), even import other components (for example Header).
- Routing: No more passing Router through props, just import Router and call one function.
  - When you want to change route, simply call ```Router.push("NAME_OF_FILE")``` (careful: you have to specify an absolute address withing ```/pages``` folder, for example ```subfolder/subScreen1```)
  - You can also go back by ```Router.back()```
  - Don't forget to import Router from this project with ```import { Router } from "../nextnative";``` (careful, as this project is in early phase yet, import it relatively from the ```nextnative``` folder, therefore don't forget to change it when making subfolders)
- Loading data vith static async ```onFocus()``` function. Works like ```getInitialProps()``` in Next.js. Can be specified for any screen component and it's output is accessible in props.initialData. Solves [this problem](https://github.com/react-navigation/react-navigation/issues/51) with React Navigation. 

## Possible enhancements
- adding native navigation from Wix
- tons of other fixes...

## Available Scripts
 -  [npm run dev](#npm-run-dev) for development
-  Since this project is build on top of Create React Native App, also it's other scripts can be used. They can be found in the [CRNA documentation](https://github.com/react-community/create-react-native-app), as well as the rest of functionality.

This project was tested on Android and iOS with Mac development environment.