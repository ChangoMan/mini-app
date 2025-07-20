import { sdk } from '@farcaster/frame-sdk'
import { useEffect } from 'react'
import { parseEther } from 'viem'
import {
  type BaseError,
  useAccount,
  useConnect,
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
} from 'wagmi'

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
  const {
    data: hash,
    error: sendError,
    isPending: isSendPending,
    sendTransaction,
  } = useSendTransaction()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = '0xf7e89E45502890381F9242403eA8661fad89Ca79'
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

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

      <div className="mt-12">
        <h2 className="text-xl font-bold">Send Hunter ETH</h2>
        <form className="mt-4" onSubmit={submit}>
          <div className="mt-2 max-w-xs mx-auto">
            <input
              name="value"
              placeholder="0.05"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required
            />
          </div>
          <button
            disabled={isSendPending}
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isSendPending ? 'Confirming...' : 'Send'}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {sendError && (
            <div>
              Error:{' '}
              {(sendError as BaseError).shortMessage || sendError.message}
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default App
