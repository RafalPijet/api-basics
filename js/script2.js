"use strict";
(function () {
    const url = "https://restcountries.eu/rest/v2/name/";
    const countriesList = document.getElementById("countries");
    const searchButton = document.getElementById("search");
    const countryInput = document.getElementById("country-name");

    function generateTemplate(name, data, basicElement) {
        const template = document.getElementById(name).innerHTML;
        const element = document.createElement(basicElement || "div");
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
        return element;
    }

    function CountryLabel(data) {
        this.name = data.name;
        this.flag = data.flag;
        this.capital = data.capital;
        this.area = data.area;
        this.population = data.population;
        this.region = data.region;
        this.subregion = data.subregion;
        this.languages = data.languages;
        this.currencies = data.currencies;
        this.borders = data.borders;
        let languagesList = "";
        let currenciesList = "";
        let bordersList = "";

        for (let i = 0; i < this.languages.length; i++) {
            languagesList += this.languages[i].name + ", ";
        }
        languagesList = languagesList.substring(0, languagesList.length - 2);

        for (let i = 0; i < this.currencies.length; i++) {
            currenciesList += this.currencies[i].name + ", ";
        }
        currenciesList = currenciesList.substring(0, currenciesList.length - 2);

        for (let i = 0; i < this.borders.length; i++) {
            bordersList += this.borders[i] + ", ";
        }
        bordersList = bordersList.substring(0, bordersList.length - 2);

        this.element = generateTemplate("country-box", {
            name: this.name,
            flag: this.flag,
            capital: this.capital,
            area: this.area,
            population: (this.population * 0.000001).toFixed(3),
            region: this.region,
            subregion: this.subregion,
            languages: languagesList,
            currencies: currenciesList,
            borders: bordersList
        }, "li");
    }

    CountryLabel.prototype.addCountry = function () {
        countriesList.appendChild(this.element);
    };

    function showCountriesList(listOfContries) {
        countriesList.innerHTML = "";
        listOfContries.forEach(function (item) {
            let label = new CountryLabel(item);
            label.addCountry();
        })
    }

    function searchCountries() {
        let name = countryInput.value;
        searchButton.disabled = true;
        searchButton.classList.add("progress-cursor");

        if (!name.length) {
            name = "Poland";
        }

        fetch(url + name)
            .then(function (response) {

                if (response.status === 200) {
                    searchButton.disabled = false;
                    searchButton.classList.remove("progress-cursor");
                }
                return response.json()
            })
            .then(showCountriesList)
    }
    searchButton.addEventListener("click", searchCountries);
    searchCountries();
})();
