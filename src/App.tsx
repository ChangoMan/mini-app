import { sdk } from '@farcaster/frame-sdk'
import { useEffect } from 'react'
import { parseEther } from 'viem'
import {
  type BaseError,
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
} from 'wagmi'

function App() {
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6 h-screen bg-gray-900 text-white overflow-x-hidden">
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
    <div className="flex flex-col gap-2 max-w-xs mx-auto">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
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
  const { disconnect } = useDisconnect()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const to = '0xf7e89E45502890381F9242403eA8661fad89Ca79'
    sendTransaction({ to, value: parseEther('0.0002') })
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
          <button
            disabled={isSendPending}
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isSendPending ? 'Confirming...' : 'Send 0.0002 ETH'}
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

      <div className="mt-12">
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </>
  )
}

export default App
