import { DynamoStack } from "../lib/dynamo-stack";
import { LambdaStack } from "../lib/lambda-stack";

export interface StackBasicProps {
    name: string,
    account:string,
    region:string,
    environment:string
}


export interface ApiStackProps extends StackBasicProps{
    lambdaStack: LambdaStack
}

export interface LambdaStackProps extends StackBasicProps{
    dynamoStack: DynamoStack
}