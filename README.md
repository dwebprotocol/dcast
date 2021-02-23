# dCast

A 1-1 end-to-end encrypted internet pipe powered by [dSwarm](https://github.com/hyperswarm) and Noise

```
npm install dcast
```

## Usage

``` js
const DCast = require('dcast')

// 'from satoshi' should be a somewhat unique topic used to derive a discovery key.
// to find the other side of your pipe. it's seemed with a determistic timestamp from ~+-30min for better privacy
// once the other peer is discovered it is used to derive a noise keypair as well.
const beam = new DCast('from satoshi')

// make a little chat app
process.stdin.pipe(beam).pipe(process.stdout)
```

## CLI

Part of the [dHub CLI](https://github.com/protocol/cli)

Provided here as a standalone CLI as well.

First install it

```sh
npm install -g dcast
```

Then on one machine run

```sh
echo 'hello world' | dcast 'some topic'
```

Then on another

```sh
# will print "hello world"
dcast 'some topic'
```

That's it! Happy piping.

## API

#### `const stream = new DCast(key)`

Make a new DCast duplex stream.

Will auto connect to another peer making using the same key within ~30 min with an end to end encrypted tunnel.

When the other peer writes it's emitted as `data` on this stream.

Likewise when you write to this stream it's emitted as `data` on the other peers stream.

## License

MIT
