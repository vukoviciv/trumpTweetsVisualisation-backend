
# Visualize Trump's Tweets
(Just learning some stuff. Tech stuff. Not Trump stuff.)

- [x] Script for initializing database
- [x] Pagination
- [x] Endless scroll
- [ ] Elastic search
- [x] Visualize data (display the most used words). For starters, they will be predefined.
- [x] Allow user to choose words

## How to use this app

In order to use Twitter API you will need to create your own Twitter account. After you have an account, create an application so you can get your access tokens.
For more info see: [Twitter access tokens](https://dev.twitter.com/webhooks/access-tokens). You will have to save it in .json file named *twitterAccount.json*, placed in the root folder.
The file should contain this object (don't forget to swap the values with the real ones you get from Twitter) :

 ```javascript
 {
    "consumer_key": "Consumer Key (API Key)",
    "consumer_secret": "Consumer Secret (API Secret)",
    "access_token": "Access Token",
    "access_token_secret": "Access Token Secret"
}

 ```

The application is using MySql for data storage. Create database with corresponding name
(see [config.json](https://github.com/vukoviciv/trumpTweetsVisualisation/blob/master/config/config.json "JSON config file"))
using `create database <database_name> character set utf8mb4 COLLATE utf8mb4_unicode_ci;`. This will ensure we can store any
potentially weird characters (ex. emoji). After you have created your database, run seed script using command
`npm run initialize-db`. This will fetch all tweets posted by Trump after Inauguration day, starting with

> ![First tweet](https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg "Profile picture") My Administration will follow two simple rules: BUY AMERICAN and HIRE AMERICAN! #USA

Currently, max number of fetched tweets is 10 000. You can change it in [options](https://github.com/vukoviciv/trumpTweetsVisualisation/blob/master/lib/options.js#L2 "maxNumberOfTweets").
This is tested for the amount of ~3000 tweets.

After this, run `npm devstart` and start playing with the app. Bundle files will not be buit if `dist` folder doesn't exist in `public` folder.

 **Nota bene:** From this point, you are entering in :construction: work in progress :construction: area.


# Screenshots of the app

The app is contained in two major parts. First is displaying tweets content, second is displaying it in some visual way.

## Tweets list

![Tweets list](https://image.prntscr.com/image/Iy1nXF-bRIWIEHuIuCU-Uw.png "Tweets list")

Using endless scroll it is possible to eventually get to the bottom of his book of wisdom.

![Tweets list](https://image.prntscr.com/image/sjVMXZIxQg_zj_V9655ziQ.png "Tweets list")

## Visualisation of tweets content

This part of the app is built around tweets content analysis. There are currently two different graphs.
<br><br>
The first graph represents a relationship between specific word and counter of that word in tweets list. The radius of the circle (for each word) is proportional to the counter of the same word. The radius of the circle is dynamically calculated depending on the resolution of the screen. <br>
A user is also able to generate its own list of words. Words are cached in local storage and can be removed; in that case, the app will fall back on the default list.

![Words counter](https://image.prntscr.com/image/3ZlGpvP6SkS4L7P_A9wUQg.png "Words counter")

![Custom words list](https://image.prntscr.com/image/2oc7XOsOTYKk68E-YYJbUw.png "Custom words list")

Using the second graph I tried to find some correlation between a number of likes and words used in those tweets. Since I didn't find any significant correlation, I didn't put the link anywhere in the app, but you can access it using the route `/graph/correlation/`<br>

![Correlation graph](https://image.prntscr.com/image/Ic5RaKqKQMauOFEUFF0mkA.png "Correlation graph")
