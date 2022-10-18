import * as cdk  from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Lambda } from 'aws-cdk-lib/aws-ses-actions';
import { StackBasicProps,LambdaStackProps } from '../interfaces';
import { getCdkPropsFromCustomProps } from "../utils";

export class LambdaStack extends cdk.Stack{
    public readonly createPlayer:lambda.Function;
    public readonly getPlayer:lambda.Function;

    constructor(scope: cdk.App, id:string, props:LambdaStackProps ){
        super(scope ,id, getCdkPropsFromCustomProps(props));

        const dynamo = props.dynamoStack;

        this.createPlayer = new lambda.Function(this,`${id}-create_player`,{
            code: lambda.Code.fromAsset("lambdas/players"),
            handler:"create-player.handler",
            runtime:lambda.Runtime.NODEJS_16_X,
            functionName: `${props.name}_create-player`,
            environment:{
                PLAYER_TABLE_NAME: cdk.Fn.importValue(`alegra-soccer-team-dynamodb-undefined`) 
            }
        });

        this.getPlayer = new lambda.Function(this,`${id}-get_player`,{
            code:lambda.Code.fromAsset('lambdas/players'),
            handler:"get-players.handler",
            runtime:lambda.Runtime.NODEJS_16_X,
            functionName: `${props.name}_get-player`,
            environment:{
                PLAYER_TABLE_NAME: cdk.Fn.importValue(`alegra-soccer-team-dynamodb-undefined`) 
            }
        })

        dynamo.playersTable.grantWriteData(this.createPlayer);
        dynamo.playersTable.grantReadData(this.getPlayer);
    }
}

