import { test } from '@japa/runner'
import { createElement } from '@kitajs/html'
import { LogoutButton } from '#components/logout_button'
import { HttpContext } from '@adonisjs/core/http'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('LogoutButton component', (group) => {
  // Store the real HttpContext get method so we can put it back later
  const originalGetContext = HttpContext.get

  group.each.setup(async () => {
    // Mock the HttpContext
    let mockContext = await testUtils.createHttpContext()
    mockContext.request.csrfToken = 'test-csrf-token'
    HttpContext.get = () => mockContext
  })

  group.each.teardown(() => {
    // Restore the original method
    HttpContext.get = originalGetContext
  })

  test('renders logout form with correct content', async ({ assert }) => {
    const html = createElement(LogoutButton, {})

    // Check the form has the correct attributes to allow logout
    assert.include(html, 'action="/logout"')
    assert.include(html, 'method="post"')

    // Check that the Logout button element exists
    assert.include(html, '<button')
    assert.include(html, 'type="submit"')
    assert.include(html, 'Logout')

    // Check that the CSRF field exists
    assert.include(html, 'type="hidden"')
    assert.include(html, 'name="_csrf"')
    assert.include(html, `value="test-csrf-token"`)
  })
})