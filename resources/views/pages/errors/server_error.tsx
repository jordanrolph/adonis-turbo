import { Exception } from '@adonisjs/core/exceptions'

interface ServerErrorProps {
  error: Exception
}

export function ServerError(props: ServerErrorProps) {
  const { error } = props

  return (
    <>
      <h1 safe>{error.code} - Server error</h1>
      <p>
        This template is rendered by the
        <a href="http://docs.adonisjs.com/guides/exception-handling#status-pages">
          status pages feature
        </a>
        of the global exception handler.
      </p>
      <code>This page is `server_error.tsx`</code>
    </>
  )
}
