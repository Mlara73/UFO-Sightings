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

