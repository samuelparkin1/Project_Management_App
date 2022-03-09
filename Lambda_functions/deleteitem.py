# import the AWS SDK (for Python the package name is boto3
import boto3
from boto3.dynamodb.conditions import Key

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    """This function is used in a lambda function.
     When the api is called with a delete method the function will call upon the database to delete a task by the task ID.
    Args:
        param1 (str): takes in the task ID.

    Returns:
        status code of 200.
        str notifying the user that task has been deleted.
    """
    
    # create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')

    # use the DynamoDB object to select the table 'HelloWorldDatabase'
    table = dynamodb.Table('HelloWorldDatabase')

    # Deletes item from data base using its Key value.
    table.delete_item(
        Key={
            'ID': event ['ID'] ,
        },
    )
# returns confirmation to the user as a formatted JSON object
    return {
    'statusCode': 200,
    'body': "Task has been deleted"

    }