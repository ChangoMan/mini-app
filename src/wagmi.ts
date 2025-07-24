// import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { farcasterFrame } from '@farcaster/frame-wagmi-connector'
import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base],
  connectors: [farcasterFrame(), coinbaseWallet()],
  transports: {
    [base.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
