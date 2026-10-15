<h1 align="center">utxo.lat</h1>

<p align="center">Explore Bitcoin, track UTXOs, and monitor public addresses.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Bitcoin-Mainnet%20%26%20Testnet-F7931A?logo=bitcoin&logoColor=white" alt="Bitcoin mainnet and testnet" />
  <img src="https://img.shields.io/badge/Mode-Watch--only-2563EB" alt="Watch-only explorer" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5" />
</p>

<p align="center"><a href="https://utxo.lat">Open utxo.lat</a></p>

## What you can do

- Search addresses, transactions, and blocks on Bitcoin mainnet or Testnet3.
- Inspect unspent transaction outputs (UTXOs), balances, and confirmations.
- Save public addresses in a local watchlist with labels and wallet groups.
- Follow recent blocks, mempool activity, and fee estimates.
- Enable browser alerts for incoming funds, spent UTXOs, confirmations, and balance changes.
- Print BIP39 word lists and download an offline dice-based seed calculator.

The explorer is watch-only: you can monitor public addresses without private keys. Watchlists and notification settings are saved in your browser, separately for each network.

## Run locally

Install Node.js 22.18+ and pnpm 10.34.5, then run:

```bash
git clone https://github.com/zuyux/utxo.git
cd utxo
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

The app uses public API providers by default. To customize the mainnet providers, copy the example configuration and edit the URLs:

```bash
cp .env.example .env.local
```

If file watching hits your system's inotify limit, run `pnpm dev:poll`. Polling uses more CPU.

## Use the explorer

1. Open `/` for mainnet or `/testnet` for Testnet3.
2. Enter an address, transaction ID, block hash, or block height in the search bar.
3. Open an address to review its balance and UTXOs, then add it to your watchlist.
4. Add a label and wallet group to organize saved addresses.
5. Use the header bell to enable notifications. Add transaction IDs in the notification dialog to track confirmations, and use **Send test notification** to check delivery.

Notifications require browser permission and HTTPS or localhost. Monitoring runs every 30 seconds while the app is open on the selected network; the first successful check establishes a baseline. Background tabs may be throttled, and activity between checks can be missed. Alerts are not delivered after the app closes.

## Use the offline seed tool

1. Open `/seed` and select a dictionary language. Direct links such as `/seed/fr` select that language.
2. Print the numbered word list using A1 portrait paper if you want a physical reference.
3. Download `/seed-offline.html` and transfer it to a trusted offline device.
4. Open the saved file and follow its instructions: use 128 independent fair-die rolls for 12 words or 256 rolls for 24 words. Odd faces map to `0`; even faces map to `1`.

The calculator bundles all ten official BIP39 word lists, adds the checksum, and works without external dependencies. It does not save rolls or phrases to storage. Instructions and dictionary languages can be selected independently; the offline dictionary defaults to English for wallet compatibility.

This tool has not received an independent security audit. A valid checksum does not prove that your dice or device are trustworthy. Confirm your wallet supports the selected language and test recovery offline before funding. Clearing the page cannot guarantee removal from device memory.

## Development commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm seed:offline` | Rebuild the standalone seed calculator |
| `pnpm test:seed` | Check seed vectors and verify the offline file matches its source |
| `node --test tests/notification-events.test.ts` | Run notification event regression tests |

Built with Next.js, React, TypeScript, and Tailwind CSS. Blockchain requests use API routes backed by public mempool.space and Blockstream providers.

For social preview artwork and metadata details, see [docs/og-image-prompt.md](docs/og-image-prompt.md). Production metadata uses `https://utxo.lat`; submit `/sitemap.xml` to Google Search Console after deployment.

## Author

[@fabohax](https://github.com/fabohax)
