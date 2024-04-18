const container = createElement('div', 'class', 'container');
const h1 = createElement('h1', 'class', 'text-center')
h1.setAttribute('id', 'title');
h1.innerText = "Rest Countries Weather Informations"
// container.classList.add('mt-5', 'mb-5');
const row = createElement('div', 'class', 'row');
container.append(h1, row);
document.body.appendChild(container);


//Getting the countries from restcountries   api
fetch('https://restcountries.com/v3.1/all').then(d => d.json()).then(result => {

    result.forEach(d => {
        
        const countryName = d.name.official;
        const lat = d.latlng[0];
        const lon = d.latlng[1];

        //Column
        const col = createElement('div', 'class', 'col-sm-6');
        col.classList.add('col-md-4', 'col-lg-4', 'col-xl-4')

        //Card
        const card = createElement('div', 'class', 'card');
        card.classList.add('h-100')

        //CardHeader
        const cardHeader = createElement('div', 'class', 'card-header');
        cardHeader.classList.add('text-center')

        //CardBody
        const cardBody = createElement('div', 'class', 'card-body');
        cardBody.classList.add('d-flex', 'flex-column', 'gap-2', 'align-items-center', 'justify-content-center');

        //Appending
        card.append(cardHeader, cardBody);
        col.appendChild(card);
        row.appendChild(col);



        cardHeader.innerHTML = d.name.official;
        cardBody.innerHTML = `<img src="${d.flags.png}" class="card-img-top" alt="Country Flag" /><div>Capital: ${d.capital}</div><div class="card-text">Region: ${d.region}</div><div>Latitude: ${d.latlng[0]}</div><div>Longitude: ${d.latlng[1]}</div><div>Country Code: ${d.region}</div>`;

        //Creating the button and appending it to cardBody
        const button = createElement('button', 'class', 'btn btn-primary btn-design');
        button.innerText = "Click for weather";
        button.setAttribute('data-bs-toggle', "modal");
        button.setAttribute('data-bs-target', '#weatherModal')
        cardBody.appendChild(button)


        //Getting the weather details from weather api
        button.addEventListener('click', function () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=52f812ea56ec2fe08c59e8fde59cd31a`)
            .then(data => data.json())
            .then(result => {
                const tbody = document.getElementById('tbody');
                const tr = document.createElement('tr');
                const elem = `<td>${countryName}</td><td>${result.main.temp}</td><td>${result.main.humidity}</td><td>${result.main.pressure}</td><td>${result.main.sea_level ? result.main.sea_level : "-"}</td><td>${result.main.grnd_level ? result.main.grnd_level : "-"}</td><td>${result.main.feels_like}</td><td>${result.main.temp_min}</td><td>${result.main.temp_max}</td>` ;
                tr.innerHTML = elem;
                tbody.innerHTML = "";
                tbody.appendChild(tr);
            })
        })
    })
})


//function to create element
function createElement(tagName, attributeName, attributeValue) {
    const element = document.createElement(tagName);
    element.setAttribute(attributeName, attributeValue);
    return element;
}
