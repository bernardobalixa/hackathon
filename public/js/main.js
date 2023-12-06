const api_url = window.location.origin + "/api";

const identificationForm = document.forms["identification_form"];

$(identificationForm).on("submit", e => {
    e.preventDefault();

    let dados = {
        fever: identificationForm["fever"].value,
        headacheDuration: identificationForm["headaches_days"].value,
        vomits: identificationForm["throwing"].value,
        redness: identificationForm["redness"].value,
        dizziness: identificationForm["dizzy"].value,
        stiffness: identificationForm["stiffness"].value
    }

    $.ajax({
        type: 'POST',
        url: api_url+"/abc",
        data: JSON.stringify(dados),
        success: data => {
            console.log(data);
        },
        contentType: "application/json",
        dataType: "json"
    })
});