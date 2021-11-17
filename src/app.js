const { constants, Contract, ethers, BigNumber } = require("ethers");
const { MaxUint256 } = constants;
var request = require('request');
const dotenv = require("dotenv");
const Maker = require('@makerdao/dai');
const { legos } = require("@studydefi/money-legos");
const getGuniArb = require("./abi/GuniArb.json");
const addresses = require("./addresses.json");
const getLeverageBPS = 500000; // 50x leverage
dotenv.config();
const privKey = process.env["PRIV_KEY"];
const provider = new ethers.providers.JsonRpcProvider();
const wallet = new ethers.Wallet(privKey, provider);
function formateCall(to, data, value = "0") {

    return [to, data, value];
}

const approveMaxIfNotAlreadyCall = async (tokenContract, from, to, amount) => {
    const allowance = await tokenContract.allowance(from, to);
    return formateCall(tokenContract.address, tokenContract.interface.encodeFunctionData("approve", [to, MaxUint256]));
};
const GUNI_Arb = async function () {
    console.log("start");
    const dai = new ethers.Contract(legos.erc20.dai.address, legos.erc20.dai.abi, wallet);
    Arb_GUNI = "0xf30cE3B3564D0D12b1B240013299c7f12Fd5bd0f";
    const GUNI_Arb = new ethers.Contract(addresses.mainnet.getGuniArb.GUNI_Arb,getGuniArb.abi,wallet)
    GUNI_Arb.vat.hope(Arb_GUNI);
    GUNI_Arb.dai.approve(Arb_GUNI, AMOUNT);
    GUNI_Arb.uniLev.wind(AMOUNT, MIN_AMOUNT_EXPECTED_IN_WALLET_AFTER_TX);
    GUNI_Arb.vat.nope(Arb_GUNI);
}
GUNI_Arb();