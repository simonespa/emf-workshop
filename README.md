# EMF Workshop

## References
* https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format_Specification.html
* https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatchLogs.html#putLogEvents-property

## Snippets

```js
sequenceToken: ''
```

```js
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
  ResponseTime: 123
}
```
