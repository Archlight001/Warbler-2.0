exports.imageFilter = function(req,file) {
    // Accept images only
    if (!file.match(/\/(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return {
            status:false,
            message:"Only image files are allowed!"
        };
    }
    return{
        status:true,
        message:"Image file found"
    }
};
