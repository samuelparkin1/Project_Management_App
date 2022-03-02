{
    /**
     * Populates a data table with some data.
     * 
     * @param {HTMLDivElement} root 
     */

    async function updateTable(root){
        root.querySelector(".table-refresh__button").classList.add(".table-refresh__button--refreshing");
        
        const table = root.querySelector(".table,table-striped,table-bordered");
        // change this fetch data to the API link
        const response = await fetch (root.dataset.url) 
        const data = await response.json();

        obj = data.data

        const result = Object.entries(obj).map(([key, value]) => {
        return Object.values(value);
        });


        // clear table
        table.querySelector("thead tr").innerHTML = "";
        table.querySelector("tbody").innerHTML = "";

        //Populate headers
        for (const header of Object.keys(data.data[0])){
    
        table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${(header) } </th>`);
        }
        //Populate rows
        for (const row of result) {
            table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${ row.map(col => `<td>${ col }</td>`).join("") }
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
                </t>
            </tbody>

        `;
        options.innerHTML = `
            <span class="table-fresh__label">Last update: never</span>
            <button type="button" class="table-refresh__button">
                <i class="material-icons">refresh</i>
        `

        root.append(table, options);

        options.querySelector(".table-refresh__button").addEventListener("click", () => {
            updateTable(root);
        });

        updateTable(root);


    }
}