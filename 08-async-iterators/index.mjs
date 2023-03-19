import  { pipeline } from 'node:stream/promises'
import { setTimeout } from 'node:timers/promises'

async function * customReadable () {
  yield Buffer.from('this is my buffer')
  setTimeout(100)
  yield Buffer.from('custom readable!')
}

async function * customTransform (stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_")
  }
}

async function * customWritable(stream) {
  for await (const chunk of stream) {
    console.log('[writable]', chunk)
  }
}

// writable and readable custom function
async function * customDuplex(stream) {
  const wholeString = []
  let bytesRead = 0
  for await (const chunk of stream) {
    console.log('[duplex writable]', chunk)
    bytesRead+= chunk.length
    wholeString.push(chunk)
  }

  yield `wholeString: ${wholeString.join()}`
  yield `bytesRead: ${bytesRead}`
}

await pipeline(
  customReadable,
  customTransform,
  customDuplex,
  customWritable
)