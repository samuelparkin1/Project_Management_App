import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.client('dynamodb')


def multi_part_scan():
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('HelloWorldDatabase')

    response = table.scan()
    result = response['Items']

    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        result.extend(response['Items'])
      
    return result

def lambda_handler(event, context):
  data = client.scan(
    TableName='HelloWorldDatabase'
  )

  response = {
      'statusCode': 200,
      'data': json.dumps(multi_part_scan()),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }
  
  return response