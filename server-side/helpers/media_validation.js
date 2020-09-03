module.exports.validate= function (file) {
    let mediaResult = {};
    if (file[0] === undefined) {
      mediaResult = imageFilter(file.mimetype);
      if (!mediaResult.status) {
        mediaResult = videoFilter(file.mimetype);   
      }
  
      return mediaResult;
    } else {
      for (let i = 0; i < file.length; i++) {
        mediaResult = imageFilter(file[i].mimetype);
        if (!mediaResult.status) {
          return mediaResult;
        }
      }
      return mediaResult;
    }
  };


 function imageFilter (file) {
  // Accept images only
  if (!file.match(/\/(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return {
      status: false,
      message: "Only image files are allowed!",
    };
  }
  return {
    status: true,
    message: "Image file found",
  };
};

function videoFilter (file) {
  if (!file.toUpperCase().match(/\/(WEBm|MPG|MP2|MPEG|MPE|MPV|OGG|MP4|AVI)$/)) {
    return {
      status: false,
      message: "Select a valid media file",
    };
  }
  return {
    status: true,
    message: "Video file found",
  };
};

exports.imageFilter = imageFilter;