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
    <div className="max-w-xl mx-auto py-12 px-4 h-screen bg-gray-900 text-white overflow-x-hidden">
      <h1 className="flex flex-col items-center text-center text-2xl font-semibold">
        Easily earn interest
        <span className="flex items-center gap-2">
          on your USDC{' '}
          <img alt="USDC Logo" className="w-6 h-6" src="/logo-usdc.svg" />
        </span>
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
      <div>
        <Earn
          className="w-full max-w-sm"
          vaultAddress="0x7BfA7C4f149E7415b73bdeDfe609237e29CBF34A"
        />
      </div>
    </div>
  )
}

export default App
