import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// Used to overide the default messages
const messages = {
    // Generic overrides for message types
    required: 'Please enter your {{ field }}',

    // Specific overrides for specific error messages
    // Example:
    // myInput.required: "Some custom message for {{ field }}"
}

// Used to rename specific form fields to give more readble user-facing error messages
const fields = {
    fullName: 'full name',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)
