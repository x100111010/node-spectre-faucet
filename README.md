# Spectre Faucet

Miniature Spectre faucet website based on [Spectre Wallet](https://github.com/spectre-project/node-spectre-wallet)
framework. The faucet can be run on single or multiple networks.
In case you run it on multiple networks it will use the same
seed phrase for all together.

## Setup Spectred

```
git clone https://github.com/spectre-project/spectred
cd spectred
go build
cd cmd/spectreminer
go build
```

## Run Spectred

Terminal 1:

```
cd spectred
spectred --utxoindex
```

Terminal 2:

```
cd spectred/cmd/spectreminer
spectreminer --miningaddr=spectre:qrfeq7a9msf7cvuh35tyl2v3s5aj5wn6uj3gql3jlu7z8zxujyxagdzlw22p2 --mine-when-not-synced
```

## Configuration

You need to have a hCaptcha subscription. You can create a free one
at: https://www.hcaptcha.com/

Once you have created it copy the `sitekey` and `secret` into
`config/spectre-faucet.conf` file.

Lastly you need to create a file `.seeds` with the 12-word seed
phrase of a wallet to disable address derivation. This is optional
but recommended if you run the faucet on a secure and privately
owned system.

It is highly recommended to run the faucet behind a reverse proxy
like NGINX and add the following header into your proxy
configuration:

```
proxy_set_header X-Real-IP $remote_addr;
```

It will ensure that single IP addresses cannot empty the faucet and
limit their amount in the 24 hour timeframe.

## Running

```
git clone https://github.com/spectre-project/node-spectre-faucet
cd node-spectre-faucet
npm install
node spectre-faucet.js --mainnet --host 0.0.0.0 --limit 10 --rpc 127.0.0.1:18110
```
