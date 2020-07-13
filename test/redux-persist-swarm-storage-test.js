const chai = require('chai')
const spies = require('chai-spies')
const fds = require('fds.js')
const JSDOM = require('jsdom').JSDOM
const MockExpressRequest = require('mock-express-request')
const MockExpressResponse = require('mock-express-response')
var path = require('path');

const SwarmStorage = require('../src/redux-persist-swarm-storage')

var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath })
chai.use(spies)
const expect = chai.expect

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), milliseconds)
    })
}

const address = process.env.ADDRESS
const privateKey = process.env.PRIVATEKEY

console.log()
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
                address: address,
                privateKey: privateKey
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
                address: address,
                privateKey: privateKey
            }

            const storage = new SwarmStorage(FDS, account, { keyPrefix: "instaswarm" })
            const res = await storage.getItem('userdata')
            console.log(res)
            const res2 = await storage.getAllKeys()
            console.log(res2)
        })
    })
})