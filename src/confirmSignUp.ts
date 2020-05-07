import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';

AWS.config.update({
  region: 'ap-northeast-1',
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const confirmSignUp: APIGatewayProxyHandler = async (event, _context) => {
  const request = JSON.parse(event.body);

  const parmas = {
    ClientId: process.env.USERPOOL_CLIENTID,
    Username: request.username,
    ConfirmationCode: request.confirmationCode,
  }

  // confrim code
  await cognito.confirmSignUp(parmas).promise();

  // token get
  const result = await cognito.initiateAuth({
    ClientId: process.env.USERPOOL_CLIENTID,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      "USERNAME": request.username,
      "PASSWORD": "1234567890pP!"
    }
  }).promise();
  
  console.log(result);
  
  return {
    statusCode: 200,
    body: JSON.stringify(
    result.AuthenticationResult , null, 2),
  };
}
