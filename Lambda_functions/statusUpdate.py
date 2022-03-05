import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('HelloWorldDatabase')
    
    table.update_item(
        Key={
                'ID': event ['id'],
            },
        UpdateExpression="set Stage = :Status",
        ExpressionAttributeValues={
                ':Status': event ['stageUpdate']
            },
        ReturnValues="UPDATED_NEW"
        )
        
    return {
    'statusCode': 200,
    'body': "Task has been updated"

    }