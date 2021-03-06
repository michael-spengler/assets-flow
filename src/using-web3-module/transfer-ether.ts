
// const providerURL = "http://localhost:8545" // if you run your own ethereum node listening on 8545
// const providerURL = "http://localhost:8547" // if you run your own arbitrum mainnet node listening on 8547 // 192.168.1.107:8547
// const providerURL = "https://mainnet.infura.io/v3/<yourinfuraprojectid>" // if you use infura's nodes


import Web3 from 'https://deno.land/x/web3/mod.ts'
import { UnitConverter } from "https://deno.land/x/units/mod-ethereum-blockchain.ts";

export class AssetsFlow {

    private web3: any

    public constructor(private providerURL: string, private privateKeyOfSender: string) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerURL))
    }

    public async flow(fromWallet: string, toWallet: string, amountInETH: number, chainId: string) {

        const balance = await this.web3.eth.getBalance(fromWallet)

        console.log(balance)

        // let transactionObject
        // try {
        //     transactionObject = await this.getTransactionObject(fromWallet, toWallet, amountInETH, chainId)
        // } catch (error) {
        //     console.log(`error while getting the transaction object: ${error.message}`)
        // }

        // try {
        //     await this.signAndSend(transactionObject, this.privateKeyOfSender)
        // } catch (error) {
        //     console.log(`error while signing and sending the transaction: ${error.message}`)
        // }
    }


    public async getTransactionObject(from: string, to: string, amountInETH: number, chainId: string) {

        const txCount = await this.web3.eth.getTransactionCount(from, "pending")
        const gasPrice = await this.web3.eth.getGasPrice()

        console.log(gasPrice)

        const amountInWei = UnitConverter.convert('Ether', amountInETH, 'Wei')
        console.log("amountInWei", amountInWei)

        return {
            nonce: this.web3.utils.numberToHex(txCount),
            gasLimit: this.web3.utils.numberToHex(21000),
            gasPrice: this.web3.utils.toHex(gasPrice),
            from,
            to,
            value: this.web3.utils.toBN(this.web3.utils.toHex(amountInWei)),
            chainId,
        }

    }


    public async signAndSend(transactionObject: any, senderPrivateKey: string) {

        console.log(senderPrivateKey)
        console.log(transactionObject)
        const signedTransaction = await this.web3.eth.accounts.signTransaction(transactionObject, senderPrivateKey)

        this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
            .on('transactionHash', (hash: string) => {
                console.log(hash);
            })
            .on('receipt', (receipt: any) => {
                console.log(receipt);
            })
            .on('confirmation', (confirmationNumber: number, receipt: any) => {
                console.log(confirmationNumber);
                console.log(receipt);
            })
            .on('error', console.error)

    }


    public async triggerTempTestCanBeDeleted() {


        const balance = await this.web3.eth.getBalance("0x7a915e362353d72570dcf90aa5baa1c5b341c7aa")

        console.log(`the balance is ${balance} wei`)
    }
}


