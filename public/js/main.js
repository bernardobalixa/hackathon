const api_url = window.location.origin + "/api";

const identificationForm = document.forms["identification_form"];
const resultContainer = $("#result_container");
const great_success_result = $("#result_great_success");
const success_result = $("#result_success");
const result_fail = $("#result_fail");
const typesMeningitis = $("#typesMeningitis");
const diseaseList = $("#diseaseList");

$(identificationForm).on("submit", e => {
    e.preventDefault();

    let dados = {
        fever: identificationForm["fever"].value,
        headacheDuration: identificationForm["headaches_days"].value,
        vomits: identificationForm["throwing"].value,
        redness: identificationForm["redness"].value,
        dizziness: identificationForm["dizzy"].value,
        stiffness: identificationForm["stiffness"].value,
        confusion: identificationForm["confusion"].value,
        photophobia: identificationForm["photophobia"].value,
        cold_hands_and_feet: identificationForm["coldHandsAndFeet"].value,
        high_respiratory_rate: identificationForm["highRespiratoryRate"].value,
        muscle_and_joint_pain: identificationForm["muscleAndJointPain"].value,
        sleepiness: identificationForm["sleepiness"].value
    }

    $.ajax({
        type: 'POST',
        url: api_url+"/abc",
        data: JSON.stringify(dados),
        success: data => {
            console.log(data);
            if (!data.error) {
				typesMeningitis.hide();
                if (data.isMeningitis == 2) {
                        success_result.hide();
                        great_success_result.show();
                        result_fail.hide();
						resultContainer.css("background-color", "#F2B2B7");
						typesMeningitis.html("Probable type: " + data.meningitisTypes[0].bold() + "<br>" +
											"Other possible types: " + data.meningitisTypes.splice(1).join(", "));
						typesMeningitis.show();
				}
            	else if (data.isMeningitis == 1) {
                        success_result.show();
                        great_success_result.hide();
                        result_fail.hide();
						resultContainer.css("background-color", "#FFB290");
                }
				else {
                    success_result.hide();
                    great_success_result.hide();
					resultContainer.css("background-color", "#CFFBCF");
                    result_fail.show();
                }
				diseaseList.html("Other probable diseases: " + "<br>" +
								data.others.join(", "));
				diseaseList.show();
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