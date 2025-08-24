import vine from '@vinejs/vine'

/**
 * Validates the create registration (new user sign up) action
 */
export const signUpValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim().alpha({
            allowSpaces: true,
            allowUnderscores: false,
            allowDashes: true,
        }),
        email: vine.string().trim().email()
            .normalizeEmail({
                all_lowercase: true,
            }),
        password: vine.string().trim().minLength(8).maxLength(40),
    })
)
