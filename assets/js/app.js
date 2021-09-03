window.onload = () => {
    setTimeout(lazyLoad, 800);

    document.querySelectorAll(".picture").forEach((item) => {
        item.addEventListener("click", (e) => {
            let http = new XMLHttpRequest();
            let url = `${window.location.origin}/${window.location.pathname}/pictures.json`;

            http.open("GET", url, true);

            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    let responseAjax = JSON.parse(http.response),
                        container_display = document.querySelector("main#main");

                    for (const picture in responseAjax) {
                        if (responseAjax[picture].id == e.target.getAttribute("data-id")) {
                            let data = responseAjax[picture];
                            container_display.innerHTML = `
                            <div class="container_picture">
                                <section class="left_section">
                                    <img src="${data.image}" alt="${data.name}" class="picture_photo" loading="lazy">
                                    <div class="information">
                                        <h2 class="title">${data.name}</h2>
                                        <p class="author">${data.author}</p>
                                    </div>
                                    <img src="${data.author_image}" alt="${data.author}" class="author_photo" loading="lazy">
                                </section>
                                <section class="right_section">
                                    <h3 class="year">${data.year}</h3>
                                    <p class="description">${data.description}</p>
                                    <a href="${data.link}" target="_blank" class="source">GO TO
                                        SOURCE</a>
                                </section>
                        </div>
                            `;
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