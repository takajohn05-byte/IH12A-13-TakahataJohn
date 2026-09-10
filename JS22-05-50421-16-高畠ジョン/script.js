async function initMap() {

    // Google Mapsライブラリ
    const { Map, InfoWindow } =
        await google.maps.importLibrary("maps");

    const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");


    // 東浦町の中心付近
    const center = {
        lat: 34.9817,
        lng: 136.9666
    };


    // 地図
    const map = new Map(
        document.getElementById("map"),
        {
            center: center,
            zoom: 14,

            mapId: "DEMO_MAP_ID"
        }
    );


    // 情報ウィンドウ
    const infoWindow = new InfoWindow();


    // 観光スポット
    const spots = {

        aeon: {
            name: "イオンモール東浦",

            position: {
                lat: 34.9796,
                lng: 136.9710
            },

            image: "images/aeon.jpg",

            description:
                "東浦町にある大型ショッピングモールです。ファッション、グルメ、ショッピングなど、様々な楽しみ方ができます。"
        },


        park: {
            name: "於大公園",

            position: {
                lat: 34.9767,
                lng: 136.9700
            },

            image: "images/odai-park.jpg",

            description:
                "東浦町にある自然豊かな公園です。遊具広場やバーベキュー広場、おもしろサイクル広場などがあります。"
        },


        matsuri: {
            name: "於大まつり",

            position: {
                lat: 34.9767,
                lng: 136.9700
            },

            image: "images/odai-matsuri.jpg",

            description:
                "東浦町の春を代表するイベントです。於大行列やステージイベント、物産展などが行われます。"
        }

    };


    // マーカーを作成
    Object.keys(spots).forEach(key => {

        const spot = spots[key];


        const marker =
            new AdvancedMarkerElement({

                map: map,

                position: spot.position,

                title: spot.name,

                gmpClickable: true

            });


        // マーカークリック
        marker.addEventListener(
            "gmp-click",
            () => {

                const content = `

                    <div class="info-window">

                        <img
                            src="${spot.image}"
                            alt="${spot.name}"
                        >

                        <h2>
                            ${spot.name}
                        </h2>

                        <p>
                            ${spot.description}
                        </p>

                    </div>

                `;


                infoWindow.setContent(content);


                infoWindow.open({

                    map: map,

                    anchor: marker

                });

            }

        );

    });


    // カードの「地図で見る」ボタン
    $(".map-button").click(function () {

        const spotName =
            $(this).data("spot");

        const spot =
            spots[spotName];


        map.setCenter(
            spot.position
        );

        map.setZoom(16);


        // マーカーの場所まで移動
        window.scrollTo({

            top:
                document
                .getElementById("map")
                .offsetTop - 50,

            behavior: "smooth"

        });

    });

}


// Google Maps開始
initMap();


// jQuery UI Accordion
$(function () {

    $("#accordion").accordion({

        collapsible: true,

        active: false,

        heightStyle: "content"

    });

});
