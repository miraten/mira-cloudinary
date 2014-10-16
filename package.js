Package.describe({
  name: 'leesangwon:mira-cloudinary',
  summary: 'Image upload to the Cloudinary',
  version: '0.1.0',
  git: 'https://github.com/miraten/cloudinary'
});

Npm.depends({
  cloudinary: "1.0.12"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.4');

  api.use([
    'meteorhacks:npm',
    'service-configuration',
    'blaze',
    'spacebars',
    'templating'
  ], 'server');

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
