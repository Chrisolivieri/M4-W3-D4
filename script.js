window.onload = async () => {
    
    let users = localStorage.getItem("utenti");
    if (users) {
        // se ci sono dati nel localStorage, usali per riempire la tabella
        document.getElementById("utenti").innerHTML = users;
    } else {
        // altrimenti effettua la fetch e salva i dati nel localStorage
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const utenti = await response.json();
        
        let users = "";

        utenti.map((user) => {
            users += ` 
                <tr>
                    <th scope="row">${user.id}</th>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                </tr>
            `;
        });

        document.getElementById("utenti").innerHTML = users;
        localStorage.setItem("utenti", users);
    }
};

async function filter() {
    // ottengo i valori del form
    let filterType = document.getElementById("filterType").value
    let filterValue = document.getElementById("filterValue").value.toLowerCase();

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const utenti = await response.json();

    let users = "";

    utenti.forEach((user) => {

        // ottengo il valore da controllare
        let valueToCheck = user[filterType].toLowerCase();

        // se ci sono corrispondenze, aggiungo la riga alla tabella
        if (valueToCheck.includes(filterValue)) {
            users += ` 
                <tr>
                    <th scope="row">${user.id}</th>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                </tr>
            `;
        }
    });

    document.getElementById("utenti").innerHTML = users;
    localStorage.setItem("utenti", users);
}

