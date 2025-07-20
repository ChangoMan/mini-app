import { sdk } from '@farcaster/frame-sdk'
import { useEffect } from 'react'
import { useAccount, useConnect, useSignMessage } from 'wagmi'

function App() {
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6 h-screen bg-gray-900 text-white overflow-hidden">
      <h1 className="text-2xl font-bold text-center">Hunter Chang</h1>
      <div className="mt-6 text-center">
        <ConnectMenu />
      </div>
    </div>
  )
}

function ConnectMenu() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()

  if (isConnected) {
    return (
      <>
        <div>Connected account:</div>
        <div className="text-xs whitespace-wrap break-words">{address}</div>
        <SignButton />
      </>
    )
  }

  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      onClick={() => connect({ connector: connectors[0] })}
    >
      Connect
    </button>
  )
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage()

  return (
    <>
      <button
        type="button"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => signMessage({ message: 'hello world' })}
        disabled={isPending}
      >
        {isPending ? 'Signing...' : 'Sign message'}
      </button>
      {data && (
        <>
          <div className="mt-10">Signature</div>
          <div className="mt-4 text-xs whitespace-wrap break-words">{data}</div>
        </>
      )}
      {error && (
        <>
          <div className="mt-6 text-red-500">Error</div>
          <div>{error.message}</div>
        </>
      )}
    </>
  )
}

export default App
