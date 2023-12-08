

const fetchBtn = document.getElementById('fetch')
const datePicker = document.getElementById('datePicker');

const fetchNASA = () => {
    const NASA_API_KEY = '3dBfOZSAxs3nxRjAL6jAzlYBPsnPC6PSwO5NYHXU';
    const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${datePicker.value}`
  
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
       renderByMediaType(data)
    })
    .catch(err => console.log(`error: ${err}`))

}

function renderByMediaType(data) {
    if (data.media_type === 'video') {
        refreshRenders(data)
        renderVideo(data.url)
    } else if (data.media_type === 'image') {
        refreshRenders(data)
        renderImage(data.hdurl)
    }
}

function refreshRenders(data) {
    clearRenderElements()
    renderText(data)
}

function clearRenderElements() {
    const imgOutput = document.getElementById('imgOutput')
    const iFrame = document.querySelector('.frame')

    imgOutput.src = ''
    iFrame.src = ''
    iFrame.classList.add('frame');
}

function renderVideo(data) {
    const iFrame = document.querySelector('.frame')
    iFrame.classList.remove('frame')
    iFrame.src = data 
    iFrame.innerText = data
}

function renderImage(data) {
    const imgOutput = document.getElementById('imgOutput')
    
    console.log(imgOutput)
    imgOutput.src = data
}

function renderText(data) {
    const title = document.getElementById('imgTitle')
    const descrip = document.getElementById('description')

    
    title.innerText = data.title
    descrip.innerText = data.explanation
}

fetchBtn.addEventListener('click', fetchNASA)
