import * as Turbo from '@hotwired/turbo'
import { Application } from "@hotwired/stimulus"

console.log("Turbo loaded")

Turbo.start()
const application = Application.start()
application.debug = !process.env.NODE_ENV === "production"
window.Stimulus = application

// If a turbo frame response errors (e.g. with 404), visit the URL instead of showing
// an error in a partial to give proper feedback to the user
// https://github.com/hotwired/turbo/issues/670
document.addEventListener('turbo:frame-missing', (event) => {
    event.preventDefault()
    event.detail.visit(event.detail.response.url)
})
