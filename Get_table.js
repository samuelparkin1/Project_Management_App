function fetchData(firstName,lastName){
        console.log("fetchData")
        // define the callAPI function that takes a first name and last name as parameters
        var postAPI = ()=>{
            // instantiate a headers object
            var myHeaders = new Headers();
            // add content type header to object
            myHeaders.append("Content-Type", "application/json");
            // using built in JSON utility package turn object to string and store in a variable
            var raw = JSON.stringify({"firstName":firstName,"lastName":lastName});
            // create a JSON object with parameters for API call and store in a variable
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            return requestOptions
        }
        var requestOptions= postAPI()
        
            console.log(requestOptions)
        

        //this is reaching out the API link 
    fetch("https://4iqr0o9sdg.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions)
        // This  getting the response from the API link 
        .then(response => {
            //if the response from the API is not ok it will cause an error 
            if (!response.ok) {
                throw Error ('ERROR');
            }
            // converts response to a Json
            return response.json();
        })
        //then goes save the json file to a variable named 'data
        .then (data => {
            //prints onto the browser inspect console the content within the 'data' key of returned json file 
            console.log(data.data)
            const html = data.data
            // connect to mytable id within the html file 
            var table = document.getElementById('myTable')
            
            //run a for loop over the amount of data key withhin the json file 
            for (var i = 0; i < data.data.length; i++){
                
                //creates a row for the table 
                var row = `<tr>
                                <td>${data.data[i].name}</td>
                                <td>${data.data[i].age}</td>
                                <td>${data.data[i].birthdate}</td>
                            </tr>`
                table.innerHTML += row

            }
        })

        // catches any errors 
        .catch(error => {
            console.log(error);
        });
    }
// called the fetch data function 
// fetchData();