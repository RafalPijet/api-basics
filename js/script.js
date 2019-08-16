"use strict";
(function () {
    var url = "https://restcountries.eu/rest/v2/name/";
    var coutrieslist = document.getElementById("countries");
    var buttonSearch = document.getElementById("search");

    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
        return element;
    }

    function CountryLabel(data) {
        this.name = data.name;
        this.flag = data.flag;
        this.capital = data.capital;
        this.area = data.area;
        this.population = (data.population * .000001).toFixed(3);
        this.region = data.region;
        this.subregion = data.subregion;
        this.languages = data.languages;
        this.currencies = data.currencies;
        this.borders = data.borders;
        var namesOfLanguages = "";
        var namesOfCurrency = "";
        var namesOfBorders = "";

        for (var i = 0; i < this.languages.length; i++) {
            namesOfLanguages += this.languages[i].name + ", ";
        }
        namesOfLanguages = namesOfLanguages.substring(0, (namesOfLanguages.length - 2));

        for (var i = 0; i < this.currencies.length; i++) {
            namesOfCurrency += this.currencies[i].name + ", ";
        }
        namesOfCurrency = namesOfCurrency.substring(0, (namesOfCurrency.length - 2));

        for (var i = 0; i < this.borders.length; i++) {
            namesOfBorders += this.borders[i] + ", ";
        }

        if (!namesOfBorders.length) {
            namesOfBorders = "none";
        } else {
            namesOfBorders = namesOfBorders.substring(0, (namesOfBorders.length - 2));
        }

        this.element = generateTemplate("country-box", {
            name: this.name,
            flag: this.flag,
            capital: this.capital,
            area: this.area,
            population: this.population,
            region: this.region,
            subregion: this.subregion,
            languages: namesOfLanguages,
            currencies: namesOfCurrency,
            borders: namesOfBorders
        }, "li");
    }

    CountryLabel.prototype = {

        addCountry: function () {
            document.querySelector("#countries").appendChild(this.element);
        }
    };

    buttonSearch.addEventListener("click", searchCountries);

    function searchCountries() {
        var countryName = document.getElementById("country-name").value;
        buttonSearch.disabled = true;
        buttonSearch.classList.add("progress-cursor");

        if (!countryName.length) {
            countryName = "Poland";
        }

        fetch(url + countryName)
            .then(function (response) {

                if (response.status == 200) {
                    setTimeout(function () {
                        buttonSearch.disabled = false;
                        buttonSearch.classList.remove("progress-cursor");
                    }, 1000);
                }
                return response.json();
            })
            .then(showCountriesList);
    }

    function showCountriesList(resp) {
        coutrieslist.innerHTML = "";
        resp.forEach(function (item) {
            var label = new CountryLabel(item);
            label.addCountry();
        })
    }

    searchCountries();
})();
