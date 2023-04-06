import reddit from './redditapi'

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// Form event listener
searchForm.addEventListener('submit', e => {
    // Get search terms
    const searchTerm = searchInput.value
    // console.log(searchTerm)
    // Get Sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value
    // Get limit
    const searchLimit = document.getElementById('limit').value
    // check input 
    if(searchTerm === ""){
        showMessage('Please add a search term', 'alert-danger')
    }
    // clear input
    searchInput.value = ''
    // search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        let output = '<div class="card-columns">'
        // loop through posts
        results.forEach(post => {
            // check image
            let image = post.preview ? post.preview.images[0].source.url : 'https://play.google.com/store/apps/details?id=com.reddit.frontpage&hl=en_IN'
            output += `
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            </div>
            </div>
            `
        })
        output += '</div>'
        document.getElementById('results').innerHTML = output
    });


    e.preventDefault()
})

// Show Message
function showMessage(message, className){
    // create div
    const div = document.createElement('div')
    // Add classes
    div.className = `alert ${className}`
    // Add text
    div.appendChild(document.createTextNode(message))
    // Get paid
    const searchContainer = document.getElementById('search-container')
    // Get search
    const search = document.getElementById('search')
    // Insert message
    searchContainer.insertBefore(div, search)
    // Timeout alert
    setTimeout( _ => document.querySelector('.alert').remove(),3000)

    // setTimeout(function(){
    //     document.querySelector('.alert').remove()
    // }, 3000)

}

// Truncate Text
function truncateText(text, limit){
    const shortened = text.indexOf("", limit);
    if(shortened == -1) return text;
    return text.substring(0, shortened)

}