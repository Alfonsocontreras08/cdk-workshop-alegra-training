#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DynamoStack } from '../lib/dynamo-stack';
import { ApiStack } from '../lib/api-stack';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
const account = "159688459304";
const appName = "alegra-soccer-team";

//const env = "training"; // o tambien
const env = app.node.tryGetContext("env"); //optiene del contexto de node

const dynamoStack = new DynamoStack(app, 'DynamoStack', {
  name:`${appName}-dynamodb-${env}`,
  account,
  region:"us-east-1",
});


const lambdaStack = new LambdaStack(app,"LambdaStack",{
  name:`${appName}-lambda-${env}`,
  account,
  region:"us-east-1",
  dynamoStack:dynamoStack
});


new ApiStack(app,"ApiStack",{
  name:`${appName}-apiGateway-${env}`,
  account,
  region:"us-east-1",
  lambdaStack
});

