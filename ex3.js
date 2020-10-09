const aws = require('aws-sdk');

const cloudwatchlogs = new aws.CloudWatchLogs({
  region: 'eu-west-1',
});

const logGroupName = '/a/workshop';
const logStreamName = '/logging/emf';
const message = {
  PageType: 'player',
  id: 'some-sha256-id',
  log: 'Hey there, this is a log message',
  _aws: {
    Timestamp: Date.now(),
    LogGroupName: logGroupName,
    LogStreamName: logStreamName,
    CloudWatchMetrics: [
      {
        Dimensions: [
          [
            'PageType'
          ]
        ],
        Metrics: [
          {
            Name: 'ResponseTime',
            Unit: 'Milliseconds'
          }
        ],
        Namespace: logGroupName
      }
    ]
  },
  ResponseTime: 200
};
const params = {
  logEvents: [
    {
      message: JSON.stringify(message),
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

      cloudwatchlogs
        .putLogEvents(params)
        .on('build', (request) => {
          request.httpRequest.headers['x-amzn-logs-format'] = 'json/emf';
        })
        .on('success', (response) => {
          console.log('success');
          console.log(response);
        })
        .on('error', () => {
          console.log('error');
        })
        .send((error3, data) => {
          if (error3) {
            console.log(error3.message);
          } else {
            console.log(data);
          }
        });
    });
  });
})();
