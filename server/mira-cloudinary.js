
var cloudinary = Meteor.npmRequire('cloudinary');

Cloudinary = {
  config: function(config) {
    cloudinary.config(config);
  }
};

var Fiber = Meteor.npmRequire('fibers');
var Future = Meteor.npmRequire('fibers/future');


Meteor.methods({
  'cloudinaryUpload': function(file, options) {

    var future = new Future();

    cloudinary.uploader.upload(file, function(result) {
      future.return(result);
    }, options);

    return future.wait();
  }
});

