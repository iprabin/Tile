const formatter = new Intl.NumberFormat('en-US', { //not my code
    style: 'currency',                             // source: https://flaviocopes.com/how-to-format-number-as-currency-javascript/
    currency: 'USD',
    minimumFractionDigits: 2
});

$(function () {
    $('#calc').on('click', function (e) {
        document.getElementById("error").classList.remove("show");   //hides error
        document.getElementById("error").classList.add("hidden");
        var rate, cost, mat;

        let type = document.getElementById('tiles').value;
        if (type == "Wood") {
            rate = 4;
            mat = 2.58;
        }
        else if (type == "Laminate") {
            rate = 2;
            mat = 1.58;
        }
        else if (type == "Stone Tiles") {                  //calulates the cost on the overlay in the home page.
            rate = 6;
            mat = 4.16;
        }
        else if (type == "Normal Tiles") {
            rate = 3;
            mat = 1.99;
        }
        else {
            document.getElementById("error").classList.remove("hidden");    //shows error
            document.getElementById("error").classList.add("show");
            document.getElementById("error").innerHTML = "* Please Select a Flooring Type";   //writes error
            return;
        }

        let height = document.getElementById('height').value;
        let width = document.getElementById('width').value;
        if (height == 0 || width == 0) {
            document.getElementById("error").classList.remove("hidden");             //shows error
            document.getElementById("error").classList.add("show");
            document.getElementById("error").innerHTML = "* Please enter the height and width";
            return;
        }
        var matCost = ((height * width) * mat);
        cost = (((height * width)) * rate) + matCost;
        document.getElementById("info-mat").classList.remove("hidden");      //shows cost info
        document.getElementById("info-mat").classList.add("show");
        document.getElementById("mat").innerHTML = `${formatter.format(matCost)}`;
        document.getElementById("labor").innerHTML = `${formatter.format(((height * width) * rate))}`;
        document.getElementById("answer").innerHTML = `${formatter.format(cost)}`;
    });

    $('#calc-tile').on('click', function (e) {
        document.getElementById("error").classList.remove("show");
        document.getElementById("error").classList.add("hidden");        //hides error
        let rate = 3.12;
        let cost, mat, labor = 0;
        let title = document.getElementById("title-estimate").innerHTML;

        let height = document.getElementById('height').value;
        let width = document.getElementById('width').value;
        if (height == 0 || width == 0) {
            document.getElementById("error").classList.remove("hidden");
            document.getElementById("error").classList.add("show");                             //show error
            document.getElementById("error").innerHTML = "* Please enter the height and width";
            return;
        }
        if (title == "Porcelain Tiles") {
            mat = (3.29 * (height * width));
            labor = ((height * width) * rate);
            cost = mat + labor;
        }
        else if (title == "Ceramic Tiles") {
            mat = (2.56 * (height * width));
            labor = ((height * width) * rate);
            cost = mat + labor;
        }
        else if (title == "Stone Tiles") {
            mat = (5.28 * (height * width));
            labor = ((height * width) * rate);
            cost = mat + labor;
        }
        else if (title == "Hardwood Flooring") {
            mat = (6.23 * (height * width));                                  //calulates the cost on for each services.
            labor = ((height * width) * rate);
            cost = mat + labor;
        }
        else {
            mat = (3.80 * (height * width))
            labor = ((height * width) * rate);
            cost = mat + labor;
        }
        document.getElementById("info-mat").classList.remove("hidden");       //shows materials info
        document.getElementById("info-mat").classList.add("show");
        document.getElementById("mat").innerHTML = `${formatter.format(mat)}`;
        document.getElementById("labor").innerHTML = `${formatter.format(labor)}`;
        document.getElementById("answer").innerHTML = `${formatter.format(cost)}`;
    });

    $(".modal").on("hidden.bs.modal", function () {
        document.getElementById("info-mat").classList.remove("show");
        document.getElementById("info-mat").classList.add("hidden");        //clears fields when model view is closed
        document.getElementById('height').value = "";
        document.getElementById('width').value = "";
        document.getElementById("answer").innerHTML = "";
        document.getElementById("error").innerHTML = "";
    });

    $("form").submit(function(e){
        e.preventDefault();
    });

    $('#sub').on('click', function (e) {
        $('form').trigger("reset");
    });
});

function clickedService(id) {
    let list = id.innerText;          //gets title of each service so I could make the calculator dynamic 
    let title = list.split("\n");
    document.getElementById("title-estimate").innerHTML = title[0];
}