// https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html

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
      body: JSON.stringify({ response }),
    };
  } catch (error) {
    console.log('error', error);
  }
};

const analyseSentiment = async ({ text }) => {
  return {
    textAnalysed: text,
    result: 'fake',
  };
};
