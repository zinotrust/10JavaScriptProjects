const gLink= document.getElementById("glink");
const btn = document.getElementById("btn");
const downloadLink = document.getElementById("download-link");
const embedAudio = document.getElementById("embed-audio");
const embedVideo = document.getElementById("embed-video");
const clear = document.querySelector(".clear");



btn.addEventListener("click", generateLink);

function generateLink(e) {
    e.preventDefault();
    // console.log(gLink.value);
    const gLinkValue = document.getElementById("glink").value;
    const confirmLink = glink.value.includes("https://drive.google.com/file/d/");

    if (confirmLink == true) {
        const getDownloadLink = gLink.value
        .replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=download&id=")
        .replace("/view?usp=sharing", "");
        // alert(getDownloadLink);
        downloadLink.value = getDownloadLink;

        function copyText(target) {
            if (target.value == "") {
                alert("Please generate a Download Link")
                }else {
                target.select();
                document.execCommand("copy");
                alert("Link has been copied to clipboard");
                }
        }
        const copy = document.querySelector(".copy");
        copy.addEventListener("click", () => {
            return copyText(downloadLink);
        })

        // EMBED AUDIO
        const audio1 = '<audio width="300" height="32" controls="controls" src="';
        const audio2 = '" type="audio/mp3"></audio>';
        
        console.log(downloadLink.value);
        embedAudio.value = `${audio1}${downloadLink.value}${audio2}`;
        // COPY AUDIO EMBED CODE
        const copyAudio = document.querySelector(".copy-audio");
        copyAudio.addEventListener("click", () => {
            return copyText(embedAudio);
        })


        // Embed Video
        const getVideoLink = gLink.value
        .replace("/view?usp=sharing", "");

        const video1 = '<iframe src="';
        const video2 = '/preview" width="560" height="315"></iframe>';
        
        embedVideo.value = `${video1}${getVideoLink}${video2}`;

        const copyVideo = document.querySelector(".copy-video");
        copyVideo.addEventListener("click", () => {
            return copyText(embedVideo);
        })

    } else {
        alert("Please Enter a Google Drive File Link")
    }
}

clear.addEventListener("click", clearForm);

function clearForm(e) {
    e.preventDefault();
    gLink.value = "";
    downloadLink.value = "";
    embedAudio.value = "";
    embedVideo.value = "";
}








          

