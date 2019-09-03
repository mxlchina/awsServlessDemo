'use strict';
console.log('begin read data');
var AWS = require('aws-sdk');
AWS.config.region='us-east-2';
var docClient = new AWS.DynamoDB.DocumentClient();
exports.handler=function(event,context,callback){
    let classification = event.classification;
   
    if(!classification){
        let error = {
            code: "ParameterError",
            message: "classification can't be null! "
        };
        context.done(JSON.stringify(error));
    }
   
   let queryParams = {
        TableName : "catalog",
        Limit:100,
        KeyConditionExpression: "classification = :queryKey",
        ExpressionAttributeValues: {
        ":queryKey": classification
        }
    };
   docClient.query(queryParams,function(error,data){
       if(error){
           console.log('faill to read data');
           callback(error,null)
       }else{
            console.log('success');
            callback(null,data);
       }
   });
};