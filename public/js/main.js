const api_url = window.location.origin + "/api";

const identificationForm = document.forms["identification_form"];

$(identificationForm).on("submit", e => {
    e.preventDefault();

    $.post(api_url+"/abc", {
        fever: identificationForm["fever"].value,
        headaches_days: identificationForm["headaches_days"].value,
        throwing: identificationForm["throwing"].value,
        redness: identificationForm["redness"].value,
        dizzy: identificationForm["dizzy"].value,
        stiffness: identificationForm["stiffness"].value
    }, res => {
        console.log(res);
    });
});