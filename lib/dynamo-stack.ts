import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb as dynamoDB }  from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { StackBasicProps } from '../interfaces';
import { getCdkPropsFromCustomProps } from '../utils';

export class DynamoStack extends cdk.Stack {
  public readonly playersTable : dynamoDB.Table;
  
  constructor(scope: Construct, id: string, props: StackBasicProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));
    
    this.playersTable= new dynamoDB.Table( this ,"PlayersTable",{
      partitionKey:{
        name:"id",
        type:dynamoDB.AttributeType.NUMBER
      },
      tableName: props.name
    });
    
    //exportamos el nombre de la tabla para capturarlo en la lambda
    new cdk.CfnOutput(this,"OutputTableName-Player",{
      exportName: props.name,
      value: this.playersTable.tableName
    })

  }
}


