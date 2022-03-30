import { ethers } from "https://cdn.skypack.dev/ethers";

export class AssetsFlow {

    private provider: any
    private signer: any

    public constructor(private providerURL: string, private privateKeyOfSender: string) {

        this.provider = new ethers.providers.JsonRpcProvider(this.providerURL)
    }


    public async flow(fromWallet: string, toWallet: string, amountInETH: number, chainId: string) {

        const wallet = new ethers.Wallet(this.privateKeyOfSender, this.provider)

        this.signer = this.provider.getSigner(fromWallet)
        console.log(`sending ${amountInETH} from: ${fromWallet} to: ${toWallet} on chain ${chainId}.`)

        console.log(await this.provider.getNetwork())
        console.log(await this.provider.connection)
        const currentGasPrice = await this.provider.getGasPrice()
        console.log(currentGasPrice)
        // const result = await wallet.sendTransaction({
        //     to: toWallet,
        //     value: ethers.utils.parseEther(amountInETH.toString()),
        //     gasLimit: ethers.utils.hexValue(21000),
        //     gasPrice: currentGasPrice,

        // })

        // console.log(result)


    }

}