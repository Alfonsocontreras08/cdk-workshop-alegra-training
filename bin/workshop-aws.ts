#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DynamoStack } from '../lib/dynamo-stack';
import { ApiStack } from '../lib/api-stack';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
const appName = "alegra-soccer-team";

//const env = "training"; // o tambien
const env = app.node.tryGetContext("env"); //optiene del contexto de node
const account = app.node.tryGetContext("account-id");

if(env === undefined || account === undefined){
  throw new Error("Invalid Env or account-id");
}

const propsDefaultStack = {
  name:appName,
  account,
  region:"us-east-1",
  environment:env
}

const dynamoStack = new DynamoStack(app, 'DynamoStack', {
  ...propsDefaultStack  
});


const lambdaStack = new LambdaStack(app,"LambdaStack",{
  ...propsDefaultStack,
  dynamoStack
});


new ApiStack(app,"ApiStack",{
  ...propsDefaultStack,
  lambdaStack
});

