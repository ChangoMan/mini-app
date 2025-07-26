'use client'

import { OnchainKitProvider } from '@coinbase/onchainkit'
import type { ReactNode } from 'react'
import { base } from 'wagmi/chains'

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'dark',
          theme: 'hacker',
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  )
}
