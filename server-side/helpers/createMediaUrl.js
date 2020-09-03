const db = require("../models");

let urlArray = [];
async function getUrls(){
    let urls = await db.Post.find({}).select("postMediaUrl -_id");
    let urlArray = [];
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].postMediaUrl.length !== 0) {
        for (let j = 0; j < urls[i].postMediaUrl.length; j++) {
          urlArray.push(urls[i].postMediaUrl[j]);
        }
      }
    }
}
getUrls();

function createMediaUrl(mediaExtension, hostName) { 
  let randomNumber = Math.floor(Math.random() * 100000000 + 1);
  let mediaName = `${randomNumber}${mediaExtension}`;
  let mediaUrl = `${hostName}/posts/${mediaName}`;
  if (urlArray.length !== 0) {
    for (let i = 0; i < urlArray.length; i++) {
      if (urlArray[i].toLowerCase() === mediaUrl.toLowerCase()) {
        createMediaUrl(urlArray, mediaExtension, hostName);
      }
    }
  }

  return [mediaUrl, mediaName];
}

exports.createMediaUrl = createMediaUrl;
