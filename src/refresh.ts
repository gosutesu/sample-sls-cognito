import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import 'source-map-support/register';

AWS.config.update({
  region: 'ap-northeast-1',
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const refresh: APIGatewayProxyHandler = async (event, _context) => {
  const request = JSON.parse(event.body);

  // token get
  const result = await cognito.initiateAuth({
    ClientId: process.env.USERPOOL_CLIENTID,
    AuthFlow: "REFRESH_TOKEN_AUTH",
    AuthParameters: {
      "REFRESH_TOKEN": request.refresh,
    }
  }).promise();
  
  console.log(result);
  
  return {
    statusCode: 200,
    body: JSON.stringify(
    result.AuthenticationResult , null, 2),
  };
}
