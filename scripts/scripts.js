const form = document.getElementById('countrysearch');

/* To help inject my html in the submit event listenr */
const countryDisplayRow = document.querySelector('#countrydisplay .row');

/* Event listener for submit and api call to fetch the user input country information */

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const country = formData.get("countrytosearch")

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const countryData = await response.json();

        /* Get the country information from the API array */
        const countryName = countryData[0].name.common;
        const countryFlag = countryData[0].flags.svg;
        const countryFlagAlt = countryData[0].flags.alt
        const currencyCode = Object.keys(countryData[0].currencies)[0];
        const currencySymbol = countryData[0].currencies[currencyCode].symbol;
        const currencyName = countryData[0].currencies[currencyCode].name;
        const continent = countryData[0].continents;
        const countryPopulation = countryData[0].population;
        const capital = countryData[0].capital;

        console.log('Full API Response:', countryData);

        countryDisplayRow.innerHTML = '';

        const countryHtml = `
        <div class="country-wrapper">

            <h2>${countryName}</h2>

            <div class="country-display-card">
                <div>
                <img src="${countryFlag}" alt="${countryFlagAlt}" class="img-fluid mb-3 mt-3">
                </div>
                <div class="country-info-wrapper">
                <p><strong>Population:</strong> ${countryPopulation}</p>
                <p><strong>Currency:</strong> ${currencyName} (${currencySymbol})</p>
                <p><strong>Capital City:</strong> ${capital}</p>
                <p><strong>Continent:</strong> ${continent}</p>
                </div>
            </div>

        </div>
    `;

        countryDisplayRow.innerHTML = countryHtml;

    } catch (error) {
        console.error("There was a problem in retrieving the data", error);
    }
});