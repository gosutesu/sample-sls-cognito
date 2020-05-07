import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-northeast-1',
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const signUp: APIGatewayProxyHandler = async (event, _context) => {
  const request = JSON.parse(event.body);
  const username = uuid();

  const parmas = {
    ClientId: process.env.USERPOOL_CLIENTID,
    Password: '1234567890pP!',
    Username: username,
    UserAttributes: [{
      Name: 'email',
      Value: request.email
    }]
  }

  const result = await cognito.signUp(parmas).promise();
  console.log(result);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      username
    }, null, 2),
  };
}
