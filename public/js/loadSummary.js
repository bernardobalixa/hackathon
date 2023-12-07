//const api_url = window.location.origin + "/api";

if (!window.localStorage.getItem("summarys")) {
    $.get(api_url + "/getSummary", res => {
        window.localStorage.setItem("summarys", res);
    })
}