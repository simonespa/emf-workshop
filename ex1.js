const aws = require('aws-sdk');

const cloudwatchlogs = new aws.CloudWatchLogs({
  region: 'eu-west-1',
});

const logGroupName = '/a/workshop';
const logStreamName = '/logging/plain-text';
const message = 'Hey there, this is a log message'
const params = {
  logEvents: [
    {
      message,
      timestamp: Date.now(),
    },
  ],
  logGroupName,
  logStreamName
};

(async () => {
  cloudwatchlogs.createLogGroup({ logGroupName }, (error1, data) => {
    if (error1) {
      console.log(error1.message);
    }

    cloudwatchlogs.createLogStream({ logGroupName, logStreamName }, (error2, data) => {
      if (error2) {
        console.log(error2.message);
      }

      cloudwatchlogs.putLogEvents(params, (error3, data) => {
        if (error3) {
          console.log(error3.message);
        } else {
          console.log(data);
        }
      });
    });
  });
})();
