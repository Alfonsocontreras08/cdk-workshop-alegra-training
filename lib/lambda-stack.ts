import * as cdk  from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { LambdaStackProps } from '../interfaces';
import { getCdkPropsFromCustomProps, getDefaultResourceName } from "../utils";

export class LambdaStack extends cdk.Stack{
    public readonly createPlayer:lambda.Function;
    public readonly getPlayer:lambda.Function;

    constructor(scope: cdk.App, id:string, props:LambdaStackProps ){
        super(scope ,id, getCdkPropsFromCustomProps(props));
        
        const dynamo = props.dynamoStack;

        this.createPlayer = new lambda.Function(this,`${getDefaultResourceName(props,"LambdaFuncion_create-player")}-${props.environment}`,{
            code: lambda.Code.fromAsset("lambdas/players"),
            handler:"create-player.handler",
            runtime:lambda.Runtime.NODEJS_16_X,
            functionName: `${getDefaultResourceName(props,"LambdaFuncion_create-player")}-${props.environment}`,
            environment:{
                PLAYER_TABLE_NAME: "alegra-soccer-team-dynamoDBTable-training"//cdk.Fn.importValue("OutputTableName-Player") 
            }
        });

        this.getPlayer = new lambda.Function(this,`${getDefaultResourceName(props,"LambdaFuncion_get-player")}-${props.environment}`,{
            code:lambda.Code.fromAsset('lambdas/players'),
            handler:"get-players.handler",
            runtime:lambda.Runtime.NODEJS_16_X,
            functionName: `${getDefaultResourceName(props,"LambdaFuncion_get-player")}-${props.environment}`,
            environment:{
                PLAYER_TABLE_NAME: "alegra-soccer-team-dynamoDBTable-training"//cdk.Fn.importValue("OutputTableName-Player") 
            }
        })

        dynamo.playersTable.grantWriteData(this.createPlayer);
        dynamo.playersTable.grantReadData(this.getPlayer);
    }
}

