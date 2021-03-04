#!/usr/bin/env node

const DCast = require('./')

if (process.argv.length < 3) {
  console.error('Usage: dcast <topic>')
  process.exit(1)
}

const beam = new DCast(process.argv.slice(2).join(' '))

beam.on('remote-address', function ({ host, port }) {
  if (!host) console.error('[dcast] Could not detect remote address')
  else console.error('[dcast] Joined the dWeb DHT - remote address is ' + host + ':' + port)
  if (port) console.error('[dcast] Network is holepunchable \\o/')
})

beam.on('connected', function () {
  console.error('[dcast] Success! Encrypted tunnel established to remote peer')
})

beam.on('end', () => beam.end())

process.stdin.pipe(beam).pipe(process.stdout)
if (typeof process.stdin.unref === 'function') process.stdin.unref()

process.once('SIGINT', () => {
  if (!beam.connected) closeASAP()
  else beam.end()
})

function closeASAP () {
  console.error('[dcast] Shutting down beam...')

  const timeout = setTimeout(() => process.exit(1), 2000)
  beam.destroy()
  beam.on('close', function () {
    clearTimeout(timeout)
  })
}
