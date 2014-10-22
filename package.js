Package.describe({
  name: 'leesangwon:mira-cloudinary',
  summary: 'Image upload to the Cloudinary',
  version: '0.4.3',
  git: 'https://github.com/miraten/mira-cloudinary'
});

Npm.depends({
  cloudinary: "1.0.12"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.4');

  api.use([
    'meteorhacks:npm@1.2.0',
    'service-configuration',
    'blaze',
    'spacebars',
    'templating'
  ], 'server');

  api.addFiles([
    'client/0.jquery.ui.widget.js',
    'client/1.jquery.iframe-transport.js',
    'client/2.jquery.fileupload.js',
    'client/3.jquery.cloudinary.js'
  ], 'client');

  api.addFiles(['client/uploader.js'], 'client');
  api.addFiles(['server/mira-cloudinary.js'], 'server');

  api.export('cloudinaryUpload');
  api.export('Cloudinary');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('leesangwon:mira-cloudinary');
  api.addFiles('test/mira-cloudinary-tests.js');
});
