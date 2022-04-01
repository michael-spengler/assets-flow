import { ethers } from "https://cdn.skypack.dev/ethers";
import { UnitConverter } from "https://deno.land/x/units/mod-ethereum-blockchain.ts";

export class AssetsFlow {

    private provider: any
    private signer: any

    public constructor(private providerURL: string, private privateKeyOfSender: string) {

        this.provider = new ethers.providers.JsonRpcProvider(this.providerURL)
    }


    public async flow(fromWallet: string, toWallet: string, amountInETH: number, chainId: string) {

        const wallet = new ethers.Wallet(this.privateKeyOfSender, this.provider)

        console.log(`sending ${amountInETH} from: ${fromWallet} to: ${toWallet} on chain ${chainId}.`)

        console.log(await this.provider.getNetwork())
        console.log(await this.provider.connection)
        const currentGasPrice = await this.provider.getGasPrice()

        const gas = 21000 // 

        console.log(currentGasPrice)

        const transactionCostInWei = currentGasPrice * gas

        console.log(`transactionCostInWei: ${transactionCostInWei}`)

        const transactionCostInEther = UnitConverter.convert('Wei', transactionCostInWei, 'Ether')

        console.log(`transactionCostInEther: ${transactionCostInEther}`)

        const valueOfTransaction = amountInETH + transactionCostInEther

        const balanceInWei = await this.provider.getBalance(fromWallet)
        const balanceInEther = UnitConverter.convert('Wei', balanceInWei, 'Ether')

        console.log(`valueOfTransaction: ${valueOfTransaction}`)
        console.log(`balance: ${balanceInEther}`)

        console.log(`currentGasPrice: ${currentGasPrice}`)

        const amountAsString = amountInETH.toString()
        console.log(`amountAsString: ${amountAsString}`)


        const result = await wallet.sendTransaction({
            to: toWallet,
            value: ethers.utils.parseEther(amountAsString),
            // value: ethers.utils.hexValue(amountInETH),
            gasLimit: ethers.utils.hexValue(gas),
            // gasPrice: currentGasPrice,

        })

        console.log(result)


    }

}