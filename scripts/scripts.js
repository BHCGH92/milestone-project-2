const form = document.getElementById('countrysearch');

/* To help inject my html in the submit event listenr */
const countryDisplayRow = document.querySelector('#countrydisplay .row');

/* Event listener for submit and api call to fetch the user input country information */

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const country = formData.get("countrytosearch")

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

    const countryData = await response.json();
    
    /* Get the country name from the API */
    const countryName = countryData[0].name.common;
    /* Get the flag image URL from the API */
    const countryFlag = countryData[0].flags.svg;
    /* Get Alt info for Flag */
    const countryFlagAlt = countryData[0].flags.alt
    /* Get the currency code to get the symbol and name from the API  */
    const currencyCode = Object.keys(countryData[0].currencies)[0];
    /* Code above used to get currency symbol here and the name of the currency from the API*/
    const currencySymbol = countryData[0].currencies[currencyCode].symbol;
    const currencyName = countryData[0].currencies[currencyCode].name;
    /* Get the continent from the API*/
    const continent = countryData[0].continents;
    /* Get the population from the API */
    const countryPopulation = countryData[0].population;
    /* Get the country capital */
    const capital = countryData[0].capital;

    countryDisplayRow.innerHTML = '';

    const countryHtml = `
        <div class="col-md-6">
            <img src="${countryFlag}" alt="${countryFlagAlt}" class="img-fluid mb-3">
        </div>
        <div class="col-md-6">
            <h2>${countryName}</h2>
            <p><strong>Population:</strong> ${countryPopulation}</p>
            <p><strong>Currency:</strong> ${currencyName} (${currencySymbol})</p>
            <p><strong>Capital City:</strong> ${capital}</p>
            <p><strong>Continent:</strong> ${continent}</p>
        </div>
    `;

    countryDisplayRow.innerHTML = countryHtml;

    } catch (error) {
        console.error("There was a problem in retrieving the data", error)
    }
});