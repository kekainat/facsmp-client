const releasesBox = document.getElementById("releases");


async function loadReleases() {

    try {

        const response = await fetch(
            "https://api.github.com/repos/kekainat/facsmp-client/releases"
        );


        const releases = await response.json();


        if (!releases.length) {

            releasesBox.innerHTML =
            `
            <div class="loading">
                Релизы пока отсутствуют
            </div>
            `;

            return;
        }



        releasesBox.innerHTML = "";



        releases.slice(0,5).forEach((release,index)=>{


            let file =
            release.assets.length
            ? release.assets[0].browser_download_url
            : release.html_url;



            const date =
            new Date(release.published_at)
            .toLocaleDateString("ru-RU");



            releasesBox.innerHTML +=
            `

            <div class="release">


                <div>

                    <h3>
                    ${release.name || release.tag_name}

                    ${index===0
                    ?
                    '<span style="color:#9b7bff"> ● Latest</span>'
                    :
                    ''
                    }

                    </h3>


                    <p style="color:#aaa;margin-top:8px">
                    ${date}
                    </p>


                    ${
                    release.body
                    ?
                    `
                    <p style="
                    color:#aaa;
                    margin-top:12px;
                    max-width:700px">
                    ${escapeHTML(
                    release.body.substring(0,250)
                    )}
                    </p>
                    `
                    :
                    ""
                    }

                </div>



                <a
                class="download"
                href="${file}"
                target="_blank">

                Скачать

                </a>


            </div>

            `;


        });



    }
    catch(error) {


        releasesBox.innerHTML =
        `
        <div class="loading">

        Не удалось загрузить релизы.
        <br>
        Проверьте GitHub страницу.

        </div>
        `;


        console.error(error);

    }

}




function escapeHTML(text){

    const div=document.createElement("div");

    div.textContent=text;

    return div.innerHTML;

}





// появление блоков при скролле

const observer =
new IntersectionObserver(entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}


});


},
{
threshold:.15
});




document
.querySelectorAll(".card,.step,.release")
.forEach(el=>{


el.style.opacity="0";

el.style.transform="translateY(30px)";

el.style.transition=
"all .6s ease";


observer.observe(el);


});




loadReleases();
