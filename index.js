const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const handlerFunction = async (event, context, callback) => {
  const { userId } = event.pathParameters;

  try {
    const options = {
      TableName: 'User',
      Key: { userId },
      UpdateExpression: 'set #active = :active',
      ExpressionAttributeValues: {
        ':active': false,
        ':unsuscribeTimestamp': '123456'
      },
      ExpressionAttributeNames: {
        '#active': 'active',
        '#unsuscribeTimestamp' : 'unsuscribeTimestamp'
      },
      ReturnValues: 'UPDATED_NEW'
    };
    await docClient.update(options).promise();
    const result = {
      statusCode: 200,
      body: JSON.stringify({}),
      headers: { 'content-type': 'application/json' }
    };
    callback(null, result);
  } catch (e) {
    return context.fail(e);
  }
};
exports.handler = handlerFunction;
