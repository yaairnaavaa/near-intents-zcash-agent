import { swagger } from "@elysiajs/swagger";
import {
  WRAP_NEAR_CONTRACT_ID,
  estimateSwap,
  fetchAllPools,
  ftGetTokenMetadata,
  getStablePools,
  instantSwap,
  nearDepositTransaction,
  nearWithdrawTransaction,
  transformTransactions,
  type EstimateSwapView,
  type Transaction,
  type TransformedTransaction,
} from "@ref-finance/ref-sdk";
import { Elysia } from "elysia";
import { searchToken } from "@/utils/search-token";
import { formatDate, convertAsciiArrayToNumber, ClaimVault } from "@/utils/methods";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const CONTRACT_ID_INTENTS = "intents.near";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(swagger())
  .get("/deposit", async ({ query }) => {    
    const { account_id,token_amount} = query;

    console.log("account_id",account_id);
    console.log("token_amount",token_amount);

    if (!account_id || !token_amount) {
      return { error: "account_id, token_amount are required parameters" };
    }

    try {
      return true;
    } catch (error) {
      return { error: "Failed to deposit NEAR token" };
    }
  })
  .get("/swap", async ({ query }) => {    
    const { near_amount} = query;

    console.log("near_amount",near_amount);

    if (!near_amount) {
      return { error: "near_amount is required parameter" };
    }

    try {
      return true;
    } catch (error) {
      return { error: "Failed to swap NEAR to ZCash" };
    }
  })
  .get("/withdraw", async ({ query }) => {    
    const { zcash_amount} = query;

    console.log("zcash_amount",zcash_amount);

    if (!zcash_amount) {
      return { error: "zcash_amount is required parameter" };
    }

    try {
      return true;
    } catch (error) {
      return { error: "Failed to withdraw ZCash" };
    }
  })
  .compile();

export const GET = app.handle;
export const POST = app.handle;
