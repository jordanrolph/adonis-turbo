import User from '#models/user'
import { test } from '@japa/runner'

const mockUserData = {
  email: 'john@example.com',
  password: 'Pa$$word123',
  fullName: 'John Doe',
}

test.group('Home', (group) => {
  group.each.setup(async () => {
    // Reset data in test database
    await User.query().delete()
  })

  test('Shows welcome message when authenticated', async ({ visit, browserContext }) => {
    // Create a user account and authenticate as them
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/')
    await Promise.all([
      page.assertTextContains('body', `Hello ${mockUser.fullName}`),
      page.assertTextContains('body', `You are logged in as ${mockUser.email}`)
    ])
  })

  test('Shows logout button when authenticated', async ({ visit, browserContext }) => {
    // Create a user account and authenticate as them
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/')
    await Promise.all([
      page.assertTextContains('body', `Logout`)
    ])
  })

  test('Clicking logout button unauthenticates user', async ({ visit, browserContext }) => {
    // Create a user account and authenticate as them
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    // Click logout button
    const page = await visit('/')
    await page.locator('button[type="submit"]:has-text("Logout")').click()

    // Expect to be redirected to the login page
    await page.waitForURL('/login')
  })

  test('Unauthenticated users cannot access the home page', async ({ visit }) => {
    // Attempt to visit the home page when not logged in
    const page = await visit('/')

    // But expect to be redirected to the login page instead
    await page.waitForURL('/login')
  })
})
