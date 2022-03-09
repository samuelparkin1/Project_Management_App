{
    /**
     * Populates a data table with some data.
     * 
     * @param {HTMLDivElement} root 
     */
    var updateAPI = (newStage, ID, ) =>{
        console.log(newStage , ID)
        // instantiate a headers object
        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({
            'id': ID,
            'stageUpdate': newStage
        });
        // create a JSON object with parameters for API call and store in a variable
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // make API call with parameters and use promises to get response
        fetch("https://4iqr0o9sdg.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));

        

    };

     var deleteAPI = (ID)=>{
        console.log(ID)
            // instantiate a headers object
            var myHeaders = new Headers();
            // add content type header to object
            myHeaders.append("Content-Type", "application/json");
            // using built in JSON utility package turn object to string and store in a variable
            var raw = JSON.stringify({"ID":ID,});
            // create a JSON object with parameters for API call and store in a variable
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            // make API call with parameters and use promises to get response
            fetch("https://4iqr0o9sdg.execute-api.ap-southeast-2.amazonaws.com/dev/", requestOptions)
            .then(response => response.text())
            .then(result => alert(JSON.parse(result).body))
            .catch(error => console.log('error', error));

            
        }

    async function updateTable(root){
        root.querySelector(".table-refresh__button").classList.add(".table-refresh__button--refreshing");
        
        const table = root.querySelector(".table,table-striped,table-bordered");
        // change this fetch data to the API link

        var postAPI = ()=>{
            // instantiate a headers object
            var myHeaders = new Headers();
            // add content type header to object
            myHeaders.append("Content-Type", "application/json");
            // using built in JSON utility package turn object to string and store in a variable
            var raw = JSON.stringify({"firstName":"firstName","lastName":"lastName"});
            // create a JSON object with parameters for API call and store in a variable
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            console.log(requestOptions)
            return requestOptions

        }
        var requestOptions= postAPI()

        const response = await fetch("https://4iqr0o9sdg.execute-api.ap-southeast-2.amazonaws.com/dev", requestOptions) 
        const data = await response.json();

        const data2 = JSON.parse(data.data)

        const json_row_data = Object.entries(data2).map(([key, value]) => {
        return Object.values(value);
        });


        // clear table
        table.querySelector("thead tr").innerHTML = "";
        table.querySelector("tbody").innerHTML = "";

        //Populate headers
        for (const header of Object.keys(data2[0])){
    
        table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${(header) } </th>`);
        }
        //Populate rows
        for (const row of json_row_data) {
            table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${ row.map(col => `<td>${ col }</td>`).join("")}
                    <td><select onchange='updateAPI(document.getElementById("option[${row[5]}]").value,"${row[5]}" )' id="option[${row[5]}]" name="option">
	                    <option>Update status</option>
	                    <option>Approved</option>
	                    <option>In progress</option>
	                    <option>Completed</option>
                        <option>Rejected</option>
                    </select></td>

                    <td><button class="btn btn-danger" type="button" onclick='deleteAPI("${row[5]}")'>Delete</button></td>
                </th>
                `);
        }
    }
    for (const root of document.querySelectorAll(".table-refresh[data-url]")){
        const table = document.createElement("table");
        const options = document.createElement("div");

        table.classList.add("table","table-striped","table-bordered");
        options.classList.add("table-refresh__options");

        table.innerHTML = `

            <thead>
                <tr></tr>
            </thead>
            <tbody>
                <tr>
                    <td>Loading</td>
                </tr>
            </tbody>

        `;
        options.innerHTML = `
            <div class="d-block text-right card-footer">
                <span class="table-fresh__label">Last update: never</span>
                <button type="button" class="table-refresh__button btn btn-primary">
                    <i class="material-icons">refresh</i>
            </div>
        `

        root.append(table, options);

        options.querySelector(".table-refresh__button").addEventListener("click", () => {
            updateTable(root);
        });

        updateTable(root);


    }
}