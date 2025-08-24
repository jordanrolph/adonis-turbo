import vine from '@vinejs/vine'

/**
 * Validates the create session (login) action
 */
export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().normalizeEmail({
            all_lowercase: true,
        }),
        password: vine.string().trim().minLength(8).maxLength(40),
    })
)