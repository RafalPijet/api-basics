"use strict";
(function () {
    var url = "https://restcountries.eu/rest/v2/name/";
    var coutrieslist = document.getElementById("countries");

    document.getElementById("search").addEventListener("click", searchCountries);

    function searchCountries() {
        var countryName = document.getElementById("country-name").value;

        if (!countryName.length) {
            countryName = "Poland";
        }
        fetch(url + countryName)
            .then(function (response) {
                return response.json();
            })
            .then(showCountriesList);
    }

    function showCountriesList(resp) {
        coutrieslist.innerHTML = "";
        resp.forEach(function (item) {
            var liElement = document.createElement("li");
            liElement.innerText = item.name + ", capital: " + item.capital;
            coutrieslist.appendChild(liElement);
        })
    }
})();