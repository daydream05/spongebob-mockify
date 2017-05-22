# spongebob-mockify
A twitter bot that replies with a Sponge Bob mock meme 

![Mocking Bob](/src/img/spongebob.jpg?raw=true "Sponge Bob Mocking Meme")

A tWittEr BoT tHat RePlieS wiTh a SpOnge BoB mOck meMe
## Installation

Make sure you have node installed. Clone or download the repository and initialized the directory.

On your terminal run ```npm install```

Inside the config.js replace the empty strings with your Twitter API credentials

```
module.exports = {
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  ''
}
```

Inside bot.js replace spongemockinbot with your bot's twitter handle.

```const myUsername = "spongemockinbot";```

Run ```npm start``` to try it locally

## HEROKU Hosting (TODO)
