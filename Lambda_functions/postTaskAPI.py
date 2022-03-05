# import the json utility package since we will be working with a JSON object
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('HelloWorldDatabase')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S", gmtime())

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):

# write name and time to the DynamoDB table using the object we instantiated and save response in a variable
    response = table.put_item(
        Item={
            'ID': strftime("%a, %d %b %Y %H:%M:%S", gmtime()),
            'Task': event ['task'],
            'Department':event['department'],
            'Priority':event['priority'],
            'LongDescription':event['longDescription'],
            'Status': event['status'],
            })
# return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': "Task has been submitted"
    
    }
print (now)