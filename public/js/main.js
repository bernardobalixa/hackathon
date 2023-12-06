const api_url = window.location.origin + "/api";

const identificationForm = document.forms["identification_form"];
const resultContainer = $("#result_container");
const great_success_result = $("#result_great_success");
const success_result = $("#result_success");
const result_fail = $("#result_fail");

$(identificationForm).on("submit", e => {
    e.preventDefault();

    let dados = {
        fever: identificationForm["fever"].value,
        headacheDuration: identificationForm["headaches_days"].value,
        vomits: identificationForm["throwing"].value,
        redness: identificationForm["redness"].value,
        dizziness: identificationForm["dizzy"].value,
        stiffness: identificationForm["stiffness"].value,
        confusion: "no",
        photophobia: "no",
        coldHandsAndFeet: "no",
        highRespiratoryRate: "no",
        muscleAndJointPain: "no",
        sleppiness: "no"
    }

    $.ajax({
        type: 'POST',
        url: api_url+"/abc",
        data: JSON.stringify(dados),
        success: data => {
            console.log(data);
            if (!data.error) {
                if (data.isMeningitis) {
                    if (data.others.length > 0) {
                        success_result.show();
                        great_success_result.hide();
                        result_fail.hide();
                    } else {
                        success_result.hide();
                        great_success_result.show();
                        result_fail.hide();
                    }
                } else {
                    success_result.hide();
                    great_success_result.hide();
                    result_fail.show();
                }
                resultContainer.show();
            }
        },
        contentType: "application/json",
        dataType: "json"
    })
});

$("#result_container > p .close_results_btn").click(e => {
    resultContainer.hide();
})