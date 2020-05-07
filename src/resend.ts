import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';

AWS.config.update({
  region: 'ap-northeast-1',
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const resend: APIGatewayProxyHandler = async (event, _context) => {
  const request = JSON.parse(event.body);

  const parmas = {
    ClientId: process.env.USERPOOL_CLIENTID,
    Username: request.username,
  }

  const result = await cognito.resendConfirmationCode(parmas).promise();
  console.log(result);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
    }, null, 2),
  };
}
