import * as cdk  from 'aws-cdk-lib';

import { aws_apigateway as apiGW }  from 'aws-cdk-lib';

import { ApiStackProps } from '../interfaces';
import { getCdkPropsFromCustomProps, getDefaultResourceName } from "../utils";

export class ApiStack extends cdk.Stack{
    constructor(scope: cdk.App, id:string, props:ApiStackProps ){
        super(scope ,id, getCdkPropsFromCustomProps(props));
        
        const lambdaStack = props.lambdaStack;

        const apiRest = new apiGW.RestApi(this,"APIGW",{
            restApiName: getDefaultResourceName(props,"ApiGW-LambdaFunction-players"),
            deployOptions:{
                stageName:getDefaultResourceName(props,"ApiGW-LambdaFunction-players"),
            },
        });



        apiRest.root
        .resourceForPath('player')
        .addMethod('POST', new apiGW.LambdaIntegration(lambdaStack.createPlayer));

        apiRest.root
        .resourceForPath('player')
        .addMethod('GET', new apiGW.LambdaIntegration(lambdaStack.getPlayer));
    }
}

