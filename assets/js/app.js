window.onload = () => {
    setTimeout(lazyLoad, 800);

    document.querySelectorAll(".picture").forEach((item) => {
        item.addEventListener("click", (e) => {
            let http = new XMLHttpRequest();
            let url = "../../pictures.json";

            http.open("GET", url, true);

            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    let responseAjax = JSON.parse(http.response);

                    for (const picture in responseAjax) {
                        if (responseAjax[picture].id == e.target.getAttribute("data-id")) {
                            console.log(responseAjax[picture]);
                        }
                    }
                }
            }
            http.send();
        });
    });
};

function lazyLoad() {
    let images = document.querySelectorAll(".picture");

    images.forEach((image) => {
        image.style.backgroundImage = `url("${image.getAttribute("data-image")}")`;
        image.classList.add("is-loaded");
    });

}