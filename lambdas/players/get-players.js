const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.PLAYER_TABLE_NAME;

exports.handler = async (event)=>{
    const players = await getall();

    return {
        statusCode:200,
        body: JSON.stringify(players)
    }
}


async function getall(){
    return await dynamo.scan({
        TableName: TABLE_NAME,
    }).promise().catch(e=>{ 
        throw Error("error :"+e.getMessage()) 
    });
}