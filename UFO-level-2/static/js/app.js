// from data.js
var tableData = data;

// Table append
// tbody reference

var tbody = d3.select("tbody");

// For Each Loop to iterate over the tableData array
tableData.forEach(ufoItem => {
    // console.log(ufoItem);
    var row = tbody.append("tr");
    
    // iterate over each object value
    Object.values(ufoItem).forEach(value => {
        var cell = row.append("td");
        cell.text(value)
    });
});

// Event listener
// form references
var filterButton = d3.select("#filter-btn");
var filterForm = d3.select("form");
var resetButton = d3.select("#reset-btn");

//attach events

filterButton.on("click", filterDate);
filterForm.on("change",filterDate);
resetButton.on("click", resetSearch);

// filterDate event function

function filterDate(){
    //Prevent the page from refreshing
    d3.event.preventDefault();

    tbody.html(" ");

    // select input value reference
    var inputDateReference = d3.select("#datetime");
    var inputCityReference = d3.select("#city");
    var inputStateReference = d3.select("#state");
    var inputCountryReference = d3.select("#country");
    var inputShapeReference = d3.select("#shape");

    // select input
    var inputDate = inputDateReference.property("value");
    inputDateFormatted = String(inputDate);
    console.log(inputDate);
    //city
    var inputCity = inputCityReference.property("value").toLowerCase();
    console.log(inputCity);
    //state
    var inputState = inputStateReference.property("value").toLowerCase();
    console.log(inputState);
    // country
    var inputCountry = inputCountryReference.property("value").toLowerCase();
    console.log(inputCountry);
    //shape
    var inputShape = inputShapeReference.property("value").toLowerCase();
    console.log(inputShape);

    //the filter is apply  whether the user has entered a filter manually
    if(inputDate || inputCity || inputState || inputCountry || inputShape){

        // verify only available conditions entered as inputs
       var inputArray = [["datetime", inputDateFormatted], ["city", inputCity], ["state", inputState], ["country", inputCountry], ["shape", inputShape]];
       var currentArray = inputArray.filter(user => user[1] !== "");
       var conditionArray = currentArray.map(ufoElem => "ufoElem." + ufoElem[0] + " === " + "'" + ufoElem[1] + "'").join(" && ");
       console.log(currentArray);
       console.log(conditionArray);

        var filterArray = tableData.filter(ufoElem => eval(conditionArray));

        tbody.html(" ");

        filterArray.forEach(ufoNewItem => {
            var newRow = tbody.append("tr");
        
            // iterate over each object value
    
            Object.values(ufoNewItem).forEach(newValue => {
                var cell = newRow.append("td");
                cell.text(newValue)
            });
        });
    };
};

//reset the searchf form
function resetSearch(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // reset the form
    document.getElementById("form-id").reset();

    // wipe out the tbody to be able to write out new table
    tbody.html("");

    // fill in observations only where date matches user input
    tableData.forEach(ufoItem => {
        // console.log(ufoItem);
        var row = tbody.append("tr");
        
        // iterate over each object value
    
        Object.values(ufoItem).forEach(value => {
            var cell = row.append("td");
            cell.text(value)
        });
    });
}