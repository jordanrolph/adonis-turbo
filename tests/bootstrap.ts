import { assert } from '@japa/assert'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import { browserClient } from '@japa/browser-client'
import { sessionBrowserClient } from '@adonisjs/session/plugins/browser_client'
import { authBrowserClient } from '@adonisjs/auth/plugins/browser_client'
import env from '#start/env'
import { execSync } from 'node:child_process'

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [
  assert(),
  pluginAdonisJS(app),
  browserClient({
    runInSuites: ['browser']
  }),
  sessionBrowserClient(app),
  authBrowserClient(app),

]

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executed after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    async () => {
      // Ensure test runner is using the test database
      const databasePath = env.get('DB_DATABASE')
      const isTestDatabase = databasePath.includes('test')

      if (!isTestDatabase) {
        throw new Error(
          `
              SAFETY CHECK FAILED!
              Tests should run against a database with 'test' in the name.
              Current DB_DATABASE: "${databasePath}"
              Expected something like: "${databasePath}_test"
              Did you add a test database URL to the ".env.test" file?
            `
        )
      }

      console.log('Using test database:', databasePath)

      // Drop all tables and re-migrate the test database so it is fresh
      execSync('node ace migration:fresh')
    },
  ],
  teardown: [],
}

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
