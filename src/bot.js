
console.log('The replier bot is starting');

const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const fs = require('fs');

// Setting up a user stream
const stream = T.stream('user');
const myUsername = "spongemockinbot";
// Anytime someone tweets me.
stream.on('tweet', tweetEvent);

function tweetEvent(eventMSG) {
    const json = JSON.stringify(eventMSG, null, 2);
    fs.writeFile("tweet.json", json);

    const replyto = eventMSG.in_reply_to_screen_name;
    console.log(replyto);

    // Remove my username;
    const text = eventMSG.text;
    const from = eventMSG.user.screen_name;

    if (replyto === myUsername) {
        const tweetOnly = text.slice(16);
        const newTeet = '@' + from + mockifyTweet(tweetOnly);
        console.log(newTeet);
        tweetIt(newTeet);
    }
    if (replyto === null && from !== myUsername) {
        const newTeet = '@' + from + ' ' + mockifyTweet(text);
        tweetIt(newTeet);
    }
}

function mockifyTweet(tweet) {
    // remove my username.

   const textArray = tweet.toLowerCase().split('');

   function capitalizeEven(char, index) {
       if (index % 2 === 0) {
           return char.toUpperCase();
       } else {
           return char;
       }
   }

   return textArray.map(capitalizeEven).join('');

}


function tweetIt(text) {

    function processing() {
        const filename = 'src/img/spongebob.jpg';
        const params = {
            encoding: 'base64'
        };

        var b64 = fs.readFileSync(filename, params);

        T.post('media/upload', { media_data: b64}, uploaded);

        function uploaded(err, data, response) {

            if (err) {
                console.log(err)
            }
            const id = data.media_id_string;
            const tweet = {
                status: text,
                media_ids: [id]
            };

            T.post('statuses/update', tweet, tweeted);

        }

        function tweeted(err, data, response) {
            if (err) {
                console.log("Something went wrong!");
            } else {
                console.log("it worked!");
            }
        }
    }

    processing();
}