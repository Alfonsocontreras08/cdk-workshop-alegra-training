const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.PLAYER_TABLE_NAME;
 
exports.handler = async (event)=>{
    const player = JSON.parse(event.body);

    await savePlayer(player);
    return {
        statusCode: 200,
        body:JSON.stringify({
            message: "mi Primer Lambda CDK",
            event
        })
    }
}

const savePlayer = async (player)=>{
    try {
        await dynamo.put({
            TableName: TABLE_NAME,
            Item:player
        }).promise();    
    } catch (error) {
        console.log(error);
        throw Error('Error de sistema');
    }
    
}