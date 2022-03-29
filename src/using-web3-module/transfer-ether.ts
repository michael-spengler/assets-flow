
// const providerURL = "http://localhost:8545" // if you run your own ethereum node listening on 8545
// const providerURL = "http://localhost:8547" // if you run your own arbitrum mainnet node listening on 8547 // 192.168.1.107:8547
// const providerURL = "https://mainnet.infura.io/v3/<yourinfuraprojectid>" // if you use infura's nodes


import Web3 from 'https://deno.land/x/web3/mod.ts'

export class AssetsFlow {

    private web3: any

    public constructor(private providerURL: string, private privateKeyOfSender: string) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.providerURL))
    }

    public async flow(fromWallet: string, toWallet: string, amountInETH: number, chainId: string) {
        const amountInWei = amountInETH * 1000000000000000000

        let transactionObject
        try {
            transactionObject = await this.getTransactionObject(fromWallet, toWallet, amountInWei, chainId)
        } catch (error) {
            console.log(`error while getting the transaction object: ${error.message}`)
        }

        try {
            await this.signAndSend(transactionObject, this.privateKeyOfSender)
        } catch (error) {
            console.log(`error while signing and sending the transaction: ${error.message}`)
        }
    }


    public async getTransactionObject(from: string, to: string, amountInWei: number, chainId: string) {

        const txCount = await this.web3.eth.getTransactionCount(from, "pending")
        const gasPrice = await this.web3.eth.getGasPrice()

        return {
            nonce: this.web3.utils.numberToHex(txCount),
            gasLimit: this.web3.utils.numberToHex(33000),
            gasPrice: this.web3.utils.toHex(gasPrice),
            from,
            to,
            value: amountInWei,
            chainId,
        }

    }


    public async signAndSend(transactionObject: any, senderPrivateKey: string) {

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


