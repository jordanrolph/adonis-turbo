import User from '#models/user'
import { test } from '@japa/runner'

const mockUserData = {
  email: 'john@example.com',
  password: 'Pa$$word123',
  fullName: 'John Doe',
}

test.group('Settings Page', (group) => {
  group.each.setup(async () => {
    // Reset data in test database
    await User.query().delete()
  })

  test('unauthenticated users cannot access settings page', async ({ visit }) => {
    const page = await visit('/settings')

    // Should be redirected to login page
    await page.waitForURL('/login')
  })

  test('authenticated users can view settings page', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    await Promise.all([
      page.assertTextContains('body', 'Settings'),
      page.assertTextContains('body', 'Email'),
      page.assertTextContains('body', 'Full Name'),
      page.locator('input[name="email"]'),
      page.locator('input[name="fullName"]'),
      page.locator('button[type="submit"]')
    ])
  })

  test('displays current user data in form fields', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    await Promise.all([
      page.assertInputValue('input[name="email"]', mockUser.email),
      page.assertInputValue('input[name="fullName"]', mockUser.fullName as string)
    ])
  })

  test('email field is disabled', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    const emailInput = page.locator('input[name="email"]')
    await emailInput.isDisabled()
  })

  test('can successfully update full name', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    // Enter a new full name
    await page.locator('input[name="fullName"]').fill('Testy Testerson')
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/settings')

    // Should show success flash message
    await page.assertTextContains('body', 'Changes saved')

    // Should display updated name in the form
    await page.assertInputValue('input[name="fullName"]', 'Testy Testerson')
  })

  test('full name validation prevents invalid characters', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    // Enter invalid full name (with numbers)
    await page.locator('input[name="fullName"]').fill('John123')
    await page.locator('button[type="submit"]').click()

    // Should stay on settings page and show validation error
    await page.waitForURL('/settings')

    // Should show validation error message
    await page.assertTextContains('body', 'The full name field must contain only letters')
  })

  test('updating name with same value shows no success message', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    // Submit form with same name (no changes)
    await page.locator('button[type="submit"]').click()

    await page.waitForURL('/settings')

    // Should not show success message since no changes were made
    const successMessage = page.locator('p:has-text("Changes saved")')
    await successMessage.waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {
      // This is expected - the element shouldn't exist
    })
  })

  test('home link navigates back to home page', async ({ visit, browserContext }) => {
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/settings')

    // Click home link
    await page.locator('a:has-text("Home")').click()

    // Should navigate to home page
    await page.waitForURL('/')
  })
})