import { AssetsFlow } from "./transfer-ether.ts"

const providerURL = Deno.args[0]
const privateKeyOfSender = Deno.args[1]
const fromAccount = "0x4396A292512AA418087645B56a3a76333Bd10e28"
const toAccount = "0xc74ea0869e49Aad10B3dedd8D56D74686fAfC7A0"
const amountInETH = 1
const chainId = "42161"

new AssetsFlow(providerURL, privateKeyOfSender).flow(fromAccount, toAccount, amountInETH, chainId)