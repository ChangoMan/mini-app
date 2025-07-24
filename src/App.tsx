import { Earn } from '@coinbase/onchainkit/earn'
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from '@coinbase/onchainkit/identity'
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import { sdk } from '@farcaster/frame-sdk'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  return (
    <div className="max-w-xl mx-auto py-12 px-6 h-screen bg-gray-900 text-white overflow-x-hidden">
      <h1 className="text-center text-2xl font-semibold">
        Easily earn interest on your USDC
      </h1>
      <div className="mt-6 text-center">
        <EarnSection />
      </div>
    </div>
  )
}

function EarnSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
      <Earn vaultAddress="0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A" />
    </div>
  )
}

// function SendButton() {
//   const {
//     data: hash,
//     error: sendError,
//     isPending: isSendPending,
//     sendTransaction,
//   } = useSendTransaction()
//   const { disconnect } = useDisconnect()

//   async function handleSendEth() {
//     sendTransaction({
//       to: '0xf7e89E45502890381F9242403eA8661fad89Ca79', //hunterchang.eth
//       value: parseEther('0.0002'),
//     })
//   }

//   const { isLoading: isConfirming, isSuccess: isConfirmed } =
//     useWaitForTransactionReceipt({
//       hash,
//     })

//   return (
//     <>
//       <div className="mt-12">
//         <h1 className="mb-0 text-xl font-bold">Send Hunter ETH</h1>
//         <button
//           type="button"
//           disabled={isSendPending}
//           onClick={handleSendEth}
//           className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {isSendPending ? 'Confirming...' : 'Send 0.0002 ETH'}
//         </button>
//         {hash && <div>Transaction Hash: {hash}</div>}
//         {isConfirming && <div>Waiting for confirmation...</div>}
//         {isConfirmed && <div>Transaction confirmed.</div>}
//         {sendError && (
//           <div>
//             Error: {(sendError as BaseError).shortMessage || sendError.message}
//           </div>
//         )}
//       </div>

//       <div className="mt-12">
//         <button
//           className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-3.5 py-1.5 rounded"
//           onClick={() => disconnect()}
//         >
//           Disconnect
//         </button>
//       </div>
//     </>
//   )
// }

export default App
