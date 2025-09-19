import * as Turbo from '@hotwired/turbo'

console.log("Turbo loaded")

Turbo.start()

// If a turbo frame response errors (e.g. with 404), visit the URL instead of showing
// an error in a partial to give proper feedback to the user
// https://github.com/hotwired/turbo/issues/670
document.addEventListener('turbo:frame-missing', (event) => {
    event.preventDefault()
    event.detail.visit(event.detail.response.url)
})
