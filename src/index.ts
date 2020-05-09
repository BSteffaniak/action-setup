import { setFailed, getState, debug } from '@actions/core'
import getInputs from './inputs'
import setOutputs from './outputs'
import installPnpm from './install-pnpm'
import pnpmInstall from './pnpm-install'

async function main() {
  const isPost = getState('isPost')
  debug(JSON.stringify(isPost))
  if (isPost) {
    return
  }
  const inputs = getInputs()
  await installPnpm(inputs)
  console.log('Installation Completed!')
  setOutputs(inputs)
  pnpmInstall(inputs)
}

main().catch(error => {
  console.error(error)
  setFailed(error)
})
