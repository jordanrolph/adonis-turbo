import vine from '@vinejs/vine'

export const updateUserDetailsValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim().alpha({
            allowSpaces: true,
            allowUnderscores: false,
            allowDashes: true,
        }),
    })
)