
var cloudinary = Npm.require('cloudinary');

Cloudinary = {
  config: function(config) {
    cloudinary.config(config);
  }
};

var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');


Meteor.methods({
  'cloudinaryUpload': function(file, options) {

    var future = new Future();

    cloudinary.uploader.upload(file, function(result) {
      future.return(result);
    }, options);

    return future.wait();
  }
});

