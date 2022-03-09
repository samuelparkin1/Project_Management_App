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
    """This function is used in a lambda function.
     When the api is called with a post method the function will call upon the database to post a task by the task ID as a key.
    Args:
        param1 (str): Task: Title of the task to be added to the database.
        param2 (str): Department: Department that the task is associated to. 
        param3 (str): Priority: What is the priority of the task.
        param1 (str): LongDescription: A long description of the task. 
        param1 (str): Stage: the stage to task is currently at.

    Returns:
        status code of 200.
        str notifying the user that task has been created.
    """

# write name and time to the DynamoDB table using the object we instantiated and save response in a variable
    table.put_item(
        Item={
            'ID': strftime("%a, %d %b %Y %H:%M:%S", gmtime()),
            'Task': event ['task'],
            'Department':event['department'],
            'Priority':event['priority'],
            'LongDescription':event['longDescription'],
            'Stage': event['status'],
            })

# Returns confirmation to the user as a formatted JSON object
    return {
        'statusCode': 200,
        'body': "Task has been submitted"
    
    }
print (now)