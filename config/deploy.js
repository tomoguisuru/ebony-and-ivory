/* jshint node: true */

module.exports = function(deployTarget) {
  var deploy_config = {};
  var ENV = {
    build: {},
    s3: {
      accessKeyId:      process.env.S3_KEY,
      secretAccessKey:  process.env.S3_SECRET,
      bucket:           'Mr-Bucket',
      region:           'us-east-1',
      cacheControl:     'max-age=315360000, no-transform, public',
    },
    's3-index': {
      accessKeyId:      process.env.S3_KEY,
      secretAccessKey:  process.env.S3_SECRET,
      bucket:           'Mr-Bucket',
      region:           'us-east-1',
      allowOverwrite:   true,
    },
    slack: {
      webhookURL: 'https://hooks.slack.com/services/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',
      channel: '#smoldering-embers',
      username: 'Bernie',
      iconEmoji: ':say-what-bernie:',
      didDeploy(context) {
        var git_info = context.revisionData.scm;

        return function(slack) {
          return slack.notify({
            text: 'Code has been deployed!',
            attachments: [{
              title: 'See What Changed on GitHub',
              title_link: `https://github.com/tomoguisuru/ebony-and-ivory/commit/${git_info.sha}`,
              color: 'good',
              fields: [
                { title: 'Project',     value: 'Ebony & Ivory',                 short: true },
                { title: 'Environment', value: deployTarget,                    short: true },
                { title: 'Branch',      value: git_info.branch,                 short: false },
                { title: 'User',        value: git_info.name || git_info.email, short: false },
              ]
            }]
          });
        };
      }
    },
  };

  ENV.pipeline = {
    activateOnDeploy: true,
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    ENV['s3'].bucket = ENV['s3-index'].bucket = process.env.S3_BUCKET;

    process.env.STATIC_ROOT = deploy_config.assetHost;

    process.env.SEGMENT_ENV = 'production';
    process.env.SEGMENT_KEY = 'adsfjhjsdahjkashjdfjhaksd';

    process.env.NEWRELIC_ID = '831124244127363628';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
