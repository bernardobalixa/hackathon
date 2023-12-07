var slider_pag = 0;
var summarys;
var messages = [];

const api_url = window.location.origin + "/api";

const chatForm = document.forms["chat_form"];

const chatHistory = $("#chat_history");

function changeSlider() {
    $("#slider_container .slider_imgs_container .slider_imgs").css("margin-left", "-" + slider_pag*640 + "px");
}

$("#slider_container .slider_left").click(e => {
    slider_pag = slider_pag > 0 ? slider_pag-1 : 2;

    changeSlider();
});

$("#slider_container .slider_right").click(e => {
    slider_pag = slider_pag < 2 ? slider_pag+1 : 0;

    changeSlider();
});

function loadSummarys() {
    summarys = JSON.parse(window.localStorage.getItem("summarys"));

    for (let i = 0; i < summarys.length; i++) {
        $("#slider_container .slider_imgs").append(`
            <div class="slider_img">
                <i class="fa-solid fa-globe icon"></i>
                <span class="site_name">${summarys[i].name}</span>
                <div class="btn_container">
                <button>
                    <a
                    target="_blank"
                    href="${summarys[i].url}"
                    >Visitar</a
                    >
                </button>
                <button onclick="showResumo(${i})">Resumir</button>
                </div>
            </div>
        `);
    }
}

function showResumo(i) {
    $("#resumo .title").text(summarys[i].name);
    $("#resumo .content").text(summarys[i].summary);
    $("#resumo_container").css("display", "flex");
}

function hideResumo() {
    $("#resumo_container").hide();
}

if (window.localStorage.getItem("summarys")) {
    loadSummarys();
} else {
    $.get(api_url + "/getSummary", res => {
        window.localStorage.setItem("summarys", res);
        loadSummarys();
    })
}

function updateChat() {
    chatHistory.empty();

    messages.forEach(msg => {
        chatHistory.append(`
            <div class="mensagem ${msg.from}">${msg.message}</div>
        `);
    });

    chatHistory.scrollTop(chatHistory[0].scrollHeight);
}

$(chatForm).on("submit", e => {
    e.preventDefault();

    messages.push({
        from: "me",
        message: chatForm["message"].value
    });

    updateChat();

    $.ajax({
        type: 'POST',
        url: api_url+"/sendMessage",
        data: JSON.stringify({msg: chatForm["message"].value}),
        success: data => {
            messages.push({
                from: "ai",
                message: data.response
            });

            updateChat();
        },
        contentType: "application/json",
        dataType: "json"
    });
});