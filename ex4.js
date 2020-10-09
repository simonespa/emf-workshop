const { metricScope, Unit, Configuration } = require('aws-embedded-metrics');

const logGroupName = '/a/workshop';

Configuration.logGroupName = logGroupName;
Configuration.logStreamName = '/logging/emf/aws-embedded-metrics-library';

(async () => {
  const logEvent = metricScope(metrics =>
    async (event) => {
      const { id, log, pageType, responseTime } = event;
      metrics.setNamespace(logGroupName);

      metrics.setProperty('id', id);
      metrics.setProperty('log', log);

      metrics.setDimensions({ PageType: pageType });

      metrics.putMetric('ResponseTime', responseTime, Unit.Milliseconds);
    });

  await logEvent({
    id: 'some-sha256-id',
    log: 'Hey there, this is a log message',
    pageType: 'player',
    responseTime: 123
  });
})();
