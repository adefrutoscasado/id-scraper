# ID Scraper

A web scraper app to track elements of a webpage given a HTML attribute. Including:
- Email notifications when new changes appear. Also daily notification when no changes were found.
- Webpage to check the status and retrospective report of found elements.

## Getting Started

At ./CONSTANTS/CATALOG.js, the HTML attribute to track should be specified:

![HTML attribute sample](https://gitlab.com/adefrutoscasado/id-scraper/raw/assets/config-sample.png)

The retrospective report of tracked elements can be found at the root link of the web app:

![HTML attribute sample](https://gitlab.com/adefrutoscasado/id-scraper/raw/assets/report-sample.png)


### Prerequisites

This app uses a number of open source projects to work properly:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Puppeteer](https://github.com/GoogleChrome/puppeteer)

### Installing

Install Node modules:

```
npm install
```
Start the MongoDB server:

```
service mongod start
```
Start the app:

```
npm start
```


## Deployment

It is possible to deploy on [Heroku](https://heroku.com/) easily. The recommended addons are:
- [mLab MongoDB](https://elements.heroku.com/addons/mongolab): Data found is saved at MongoDB, in order to be able to compare between samples and send notifications when changes appear.
- [Heroku Scheduler](https://elements.heroku.com/addons/scheduler): A scheduler is needed in order to track the web in a given period of time.

## Demo

Please note following live demo is not maintained. Since web scraping needs high maintenance frequency I dont assure that the demo will work.

http://amazon-scrap.herokuapp.com/

## License

This project is licensed under the MIT License