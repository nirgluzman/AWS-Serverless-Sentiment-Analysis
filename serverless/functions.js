const functions = {
  sentimentAnalysis: {
    handler: 'src/functions/sentimentAnalysis/index.handler',
    events: [
      {
        http: {
          method: 'POST',
          path: 'sentiment-analysis',
        },
      },
    ],
  },
};

export default functions;
