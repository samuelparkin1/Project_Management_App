# import the AWS SDK (for Python the package name is boto3)
import boto3

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    """This function is used in a lambda function.
     When the api is called with a PUT method the function will call upon the database to update a task by the task ID.
    Args:
        param1 (str): takes in the task ID.
        param2 (str): takes updates status of the task.

    Returns:
        status code of 200.
        str notifying the user that task has been updated.
    """

    #Create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')
    
    # Use the DynamoDB object to select the table 'HelloWorldDatabase'
    table = dynamodb.Table('HelloWorldDatabase')

    # Updates item from data base using its Key value and new status
    table.update_item(
        Key={
                'ID': event ['id'],
            },
        UpdateExpression="set Stage = :Status",
        ExpressionAttributeValues={
                ':Status': event ['stageUpdate']
            },
        )

    # returns confirmation that the task has been updated to the user as a formatted JSON object    
    return {
    'statusCode': 200,
    'body': "Task has been updated"
    }