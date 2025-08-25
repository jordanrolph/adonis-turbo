import { test } from '@japa/runner'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

test.group('Signup', (group) => {
  group.each.setup(async () => {
    // Reset data in test database
    await User.query().delete()
  })

  test('displays registration form', async ({ visit }) => {
    const page = await visit('/signup')

    // Check the form rendered as expected
    await Promise.all([
      page.assertTextContains('body', 'Full Name'),
      page.assertTextContains('body', 'Email'),
      page.assertTextContains('body', 'Password'),
      page.assertTextContains('body', 'Sign up'),
      page.assertTextContains('body', 'Log in to an existing account')
    ])
  })


  test('creates new user with valid data', async ({ visit, assert }) => {
    const mockUserData = {
      email: 'john@example.com',
      password: 'Pa$$word123',
      fullName: 'John Doe',
    }

    const page = await visit('/signup')

    // Fill out the form fields
    await page.locator('input[name="fullName"]').fill(mockUserData.fullName)
    await page.locator('input[name="email"]').fill(mockUserData.email)
    await page.locator('input[name="password"]').fill(mockUserData.password)

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // Wait for navigation to complete
    await page.waitForURL('/')

    // Check the new user was created correctly in the db
    const createdUser = await User.query().where("email", mockUserData.email).first()
    assert.exists(createdUser)
    assert.equal(createdUser?.email, mockUserData.email)
    assert.equal(createdUser?.fullName, mockUserData.fullName)

    // Check user's password was stored as a hashed value
    assert.notEqual(createdUser?.password, mockUserData.password)
    const passwordIsValid = await hash.verify(createdUser?.password!, mockUserData.password)
    assert.isTrue(passwordIsValid)
  })

  test('signup rejected if email already exists', async ({ visit, assert }) => {
    // Create a user in the database
    const existingUserData = {
      email: 'john@example.com',
      password: 'Pa$$word123',
      fullName: 'John Doe',
    }
    await User.create(existingUserData)

    // Try to create a new account with the same email as the existing user
    const similarUserData = {
      email: existingUserData.email,
      password: 'someotherpassword123',
      fullName: 'Some Name',
    }

    const page = await visit('/signup')

    // Fill out the form fields
    await page.locator('input[name="fullName"]').fill(similarUserData.fullName)
    await page.locator('input[name="email"]').fill(similarUserData.email)
    await page.locator('input[name="password"]').fill(similarUserData.password)

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // User should stay on the signup page with a flash message error message
    await page.waitForURL('/signup')
    await Promise.all([
      page.assertTextContains('body', 'Sign up'),
      page.assertTextContains('body', 'Error creating account')])

    // Ensure only one user exists with this email (no duplicate was created)
    const usersWithEmail = await User.query().where("email", existingUserData.email)
    assert.lengthOf(usersWithEmail, 1)

    // Ensure the existing user's data was not changed in the database
    const userFromDatabase = usersWithEmail[0]
    assert.equal(userFromDatabase.email, existingUserData.email)
    assert.equal(userFromDatabase.fullName, existingUserData.fullName)
    assert.isTrue(await hash.verify(userFromDatabase.password, existingUserData.password))
    assert.notEqual(userFromDatabase.fullName, similarUserData.fullName)
    assert.isFalse(await hash.verify(userFromDatabase.password, similarUserData.password))
  })

  test('signup fails if fullname is missing', async ({ visit, assert }) => {
    const page = await visit('/signup')

    // Fill form with missing fullName
    await page.locator('input[name="email"]').fill('john@example.com')
    await page.locator('input[name="password"]').fill('password123')
    // fullName is intentionally not filled
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // User should stay on the signup page with a flash error message shown
    await page.waitForURL('/signup')
    await page.assertTextContains('body', 'Please enter your full name')

    // Ensure no user was created
    const users = await User.query()
    assert.lengthOf(users, 0)
  })

  test('signup fails if email is missing', async ({ visit, assert }) => {
    const page = await visit('/signup')

    // Fill form with missing email
    await page.locator('input[name="fullName"]').fill('John Doe')
    await page.locator('input[name="password"]').fill('password123')
    // email is intentionally not filled
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // User should stay on the signup page with a flash error message shown
    await page.waitForURL('/signup')
    await page.assertTextContains('body', 'Please enter your email')

    // Ensure no user was created
    const users = await User.query()
    assert.lengthOf(users, 0)
  })

  test('signup fails if email is invalid', async ({ visit, assert }) => {
    const page = await visit('/signup')

    // Fill form with invalid email
    await page.locator('input[name="fullName"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('john@example') // malformed email
    await page.locator('input[name="password"]').fill('password123')

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // User should stay on the signup page with a flash error message shown
    await page.waitForURL('/signup')
    await page.assertTextContains('body', 'The email field must be a valid email address')

    // Ensure no user was created
    const users = await User.query()
    assert.lengthOf(users, 0)
  })

  test('signup fails if password is missing', async ({ visit, assert }) => {
    const page = await visit('/signup')

    // Fill form with missing password
    await page.locator('input[name="fullName"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('john@example.com')
    // password is intentionally not filled
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // User should stay on the signup page with a flash error message shown
    await page.waitForURL('/signup')
    await page.assertTextContains('body', 'Please enter your password')

    // Ensure no user was created
    const users = await User.query()
    assert.lengthOf(users, 0)
  })

  test('signup fails if password is too short', async ({ visit, assert }) => {
    const page = await visit('/signup')

    // Fill form with short password
    await page.locator('input[name="fullName"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('john@example.com')
    await page.locator('input[name="password"]').fill('123') // too short

    // Submit the form
    await page.locator('button[type="submit"]:has-text("Sign up")').click()

    // User should stay on the signup page with a flash error message shown
    await page.waitForURL('/signup')
    await page.assertTextContains('body', 'The password field must have at least 8 characters')

    // Ensure no user was created
    const users = await User.query()
    assert.lengthOf(users, 0)
  })
})

