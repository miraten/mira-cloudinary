var uploadProc = function(file, options) {
  var loader = $.Deferred(), reader = new FileReader;

  options.upload.filetype = file.type;
  options.upload.fileName = file.name;

  reader.onload = function () {
    Meteor.call("cloudinaryUpload", reader.result, options.upload, function(error, response){
      if (error) {
        console.log(error);
      } else {
        var image = {
          url: response.url,
          surl: response.secure_url,
          size: response.bytes,
          width: response.width,
          height: response.height,
          ext: response.format,
          mime: options.upload.fileType,
          original: options.upload.fileName,
          repoId: response.public_id
        };
        if (response.eager)
          image = _.extend(image, {
            urlFit: response.eager[0].url,
            surlFit: response.eager[0].secure_url,
            widthFit: response.eager[0].width,
            heightFit: response.eager[0].height
          });
        if (options.append)
          image = _.extend(image, options.append);

        Meteor.call(options.method, image, function(error, id) {
          if (error) {
            console.log(error);
          } else {
            image._id = id;
            loader.resolve(image);
          }
        });
      }
    });
  };
  reader.onerror = loader.reject;
  reader.onprogress = loader.notify;
  reader.readAsDataURL(file);

  return loader.promise();
};

/**
 *
 * @param file
 * @param options
 * @param callback
 */
cloudinaryUpload = function(file, options, callback) {
  if (/^image\//.test(file.type)) {
    $.when(uploadProc(file, options)).done(function(image) {
      callback(image);
    }).fail(function (e) {
      this.fileUploadError("file-reader", e);
    });
  } else {
    this.fileUploadError("unsupported-file-type", file.type);
  }
};

