# Visualize Trump's Tweets
(Just learning some stuff. Tech stuff. Not Trump stuff.)

- [x] Write script for initializing database
- [ ] Implement elastic search
- [ ] visualise data (display the most used words). For start they will be predefined. In the future it would be great to allow user to choose
which words he wants to be displayed.

## How to use this app

Application is using MySql for data storage. Create database with corresponding name
(see [config.json](https://github.com/vukoviciv/trumpTweetsVisualisation/blob/master/config/config.json "JSON config file"))
using `create database <database_name> character set utf8mb4 COLLATE utf8mb4_unicode_ci;`. This will ensure we can store any
potentially weird characters (ex. emoji). After you have created your database, run seed script using command
`npm run initialize-db`. This will fetch all tweets posted by Trump after Inauguration day, starting with
> ![alt text](https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg "Profile picture") My Administration will follow two simple rules: BUY AMERICAN and HIRE AMERICAN! #USA

Currently max number of fetched tweets is 10 000. You can change it in [options](https://github.com/vukoviciv/trumpTweetsVisualisation/blob/master/lib/options.js#L2 "maxNumberOfTweets").
This is tested for the amount of ~1500 tweets.

After this, run `npm start` and start playing with the app.

 **Nota bene:** From this point, you are entering in :construction: work in progress :construction: area.
