import json
import boto3
from boto3.dynamodb.conditions import Key


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('HelloWorldDatabase')
    
    response = table.delete_item(
        Key={
            'ID': event ['ID'] ,
        },
    )

    return {
    'statusCode': 200,
    'body': "Task has been deleted"

    }