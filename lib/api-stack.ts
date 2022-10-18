import * as cdk  from 'aws-cdk-lib';

import { aws_apigateway as apiGW }  from 'aws-cdk-lib';

import { ApiStackProps } from '../interfaces';
import { getCdkPropsFromCustomProps } from "../utils";

export class ApiStack extends cdk.Stack{
    constructor(scope: cdk.App, id:string, props:ApiStackProps ){
        super(scope ,id, getCdkPropsFromCustomProps(props));
        
        const lambdaStack = props.lambdaStack;

        const apiRest = new apiGW.RestApi(this,id,{
            restApiName:`api-${props.name}`,
            deployOptions:{
                stageName:props.name,
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

