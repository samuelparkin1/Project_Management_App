# import the json utility package since we will be working with a JSON object
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.client('dynamodb')

# Define the function to get all data from the database. 
def dataBaseScan():
  # Create a DynamoDB object using the AWS SDK
    dynamodb = boto3.resource('dynamodb')
    
    # Use the DynamoDB object to select our table
    table = dynamodb.Table('HelloWorldDatabase')

    # Variable to save table data yo  
    response = table.scan()
    result = response['Items']

    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        result.extend(response['Items'])
      
    return result

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):

  """This function is used in a lambda function.
  When the api is called with a GET method the function will call upon the database to get all task in data base.
  Args:
    None.

  Returns:
      status code of 200.
      JSON file containing all items in database.
  """

  dynamodb.scan(
    TableName='HelloWorldDatabase'
  )


# Returns all database items to user as JSON
  response = {
      'statusCode': 200,
      'data': json.dumps(dataBaseScan()),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }
  
  return response