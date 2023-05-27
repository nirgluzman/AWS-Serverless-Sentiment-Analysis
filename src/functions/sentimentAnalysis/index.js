// https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-comprehend/
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-comprehend/classes/detectsentimentcommand.html

import {
  ComprehendClient,
  DetectSentimentCommand,
} from '@aws-sdk/client-comprehend';

const client = new ComprehendClient();

export const handler = async (event) => {
  console.log('event', event);

  try {
    const body = JSON.parse(event.body || '{}');
    const { text } = body;
    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'text field is missing in body',
        }),
      };
    }

    const response = await analyseSentiment({ text });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

const analyseSentiment = async ({ text }) => {
  const input = {
    LanguageCode: 'en',
    Text: text,
  };

  const command = new DetectSentimentCommand(input);

  const response = await client.send(command);

  return {
    textAnalysed: text,
    response,
  };
};
