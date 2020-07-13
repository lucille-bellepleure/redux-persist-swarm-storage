const chai = require('chai')
const spies = require('chai-spies')
const fds = require('fds.js')
const JSDOM = require('jsdom').JSDOM
const MockExpressRequest = require('mock-express-request')
const MockExpressResponse = require('mock-express-response')

const SwarmStorage = require('../src/redux-persist-swarm-storage')


chai.use(spies)
const expect = chai.expect

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), milliseconds)
    })
}

describe('SwarmStorage', () => {
    describe('Testing', () => {
        it('stores item', async () => {
            const FDS = new fds({
                tokenName: 'gas',
                swarmGateway: 'https://swarm2.fairdatasociety.org',
                ethGateway: 'https://geth-noordung.fairdatasociety.org',
                faucetAddress: 'https://faucet-noordung.fairdatasociety.org/gimmie',
                chainID: '235813',
                httpTimeout: 1000,
                gasPrice: 0.1,
                walletVersion: 1,
                scratchDir: './scratch',
                ensConfig: {
                    domain: 'datafund.eth',
                    registryAddress: '0xA1029cb176082eca658A67fD6807B9bDfB44A695',
                    subdomainRegistrarAddress: '0x0E6a3B5f6800145bAe95C48934B7b5a90Df50722',
                    resolverContractAddress: '0xC91AB84FFad79279D47a715eF91F5fbE86302E4D'
                }

            })

            const account = {
                address: "0x996974B31C8d7c8096C7Ef7914469B964D1Ea11D",
                privateKey: "0x656da20262069a18a9e65ac2134383eea6628721e669f0de4be5e567ec98c722"
            }

            const storage = new SwarmStorage(FDS, account, { keyPrefix: "instaswarm" })
            await storage.setItem('userdata', JSON.stringify({ foo: 'bar' }))
            await storage.setItem('userposts', JSON.stringify({ bar: 'cor' }))

        })
        it('retrieves item', async () => {
            const FDS = new fds({
                tokenName: 'gas',
                swarmGateway: 'https://swarm2.fairdatasociety.org',
                ethGateway: 'https://geth-noordung.fairdatasociety.org',
                faucetAddress: 'https://faucet-noordung.fairdatasociety.org/gimmie',
                chainID: '235813',
                httpTimeout: 1000,
                gasPrice: 0.1,
                walletVersion: 1,
                scratchDir: './scratch',
                ensConfig: {
                    domain: 'datafund.eth',
                    registryAddress: '0xA1029cb176082eca658A67fD6807B9bDfB44A695',
                    subdomainRegistrarAddress: '0x0E6a3B5f6800145bAe95C48934B7b5a90Df50722',
                    resolverContractAddress: '0xC91AB84FFad79279D47a715eF91F5fbE86302E4D'
                }

            })

            const account = {
                address: "0x996974B31C8d7c8096C7Ef7914469B964D1Ea11D",
                privateKey: "0x656da20262069a18a9e65ac2134383eea6628721e669f0de4be5e567ec98c722"
            }

            const storage = new SwarmStorage(FDS, account, { keyPrefix: "instaswarm" })
            const res = await storage.getItem('userdata')
            console.log(res)
            const res2 = await storage.getAllKeys()
            console.log(res2)
        })
    })
})