// Declare base_url.
const base_url = window.location.origin;

// When the document is ready and all objects are rendered.
$(document).ready(function () {
    /*var tooltipList = $('[data-bs-toggle="tooltip"]').map(tooltipTriggerEl => {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            boundary: 'window'
        });
    });*/

    // Add a click event handler to button.
    $("#search-card-btn").on('click', function (e) {
        // No page refresh.
        e.preventDefault();

        // Build the resource to retreive.
        let cardName = $("#search-card-txt").val();
        let cardUrl = `${base_url}/cards`;

        // Make an ajax get call to retreive info from server.
        $.ajax({
            method: "GET",
            url: cardUrl,
            dataType: "html",
            data: {
                name: cardName
            }
        }).done(function (data) { // Catch a successful return value.
            $("#card-images").html("");
            if (data === "") {
                $("#card-images").html("Cards not found.");
                return;
            }

            let res = JSON.parse(data);
            console.log(res);

            for (let i = 0; i < res.cards.length; i++) {
                console.log(res.cards[i].name);

                let img = $("<img>").attr("src", res.cards[i].img_uri);

                $("#card-images").append(img);
            }
        }).fail(function (data) { // Catch an unsuccessful return value.
            console.log("Error: " + data);
            $("#card-images").html("Error found.");
        }).always(function () { // Enter on any return.
        });
    });
});