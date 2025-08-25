import User from '#models/user'
import { test } from '@japa/runner'

test.group('Home', (group) => {
  group.each.setup(async () => {
    // Reset data in test database
    await User.query().delete()
  })

  test('Shows logout button', async ({ visit, browserContext }) => {
    // Create a user account and authenticate as them
    const mockUserData = {
      email: 'john@example.com',
      password: 'Pa$$word123',
      fullName: 'John Doe',
    }
    const mockUser = await User.create(mockUserData)
    await browserContext.loginAs(mockUser)

    const page = await visit('/')
    await Promise.all([
      page.assertTextContains('body', `Logout`)])
  })
})
