import { ACCOUNT_ID, PLUGIN_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "NEAR Intents ZCash API",
            description: "API to interact with NEAR Intents and ZCash",
            version: "1.0.0",
        },
        servers: [
            {
                url: "https://near-intents-zcash-agent.vercel.app",
            },
        ],
        "x-mb": {
            "account-id": ACCOUNT_ID,
            assistant: {
                name: "NEAR Intents ZCash Assistant",
                description: `API to interact with NEAR Intents and ZCash`,
                instructions: `
                    You are an assistant designed to interact with NEAR Intents and ZCash:
                `,
                tools: [{ type: "generate-transaction" }, { type: "generate-evm-tx" }, { type: "sign-message" }],
                image: "https://z.cash/wp-content/uploads/2023/05/zcash-logo.png",
                categories: ["defi"],
            },
        },
        paths: {
            "/api/deposit": {
                get: {
                    summary: "Deposit NEAR to NEAR Intents Contract",
                    description:"This endpoint allows you to deposit NEAR tokens to the NEAR Intents Contract.",
                    operationId: "deposit",
                    parameters: [
                        {
                            name: "account_id",
                            in: "query",
                            description: "The NEAR account ID to deposit NEAR token",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: "token_amount",
                            in: "query",
                            description: "The amount of NEAR token to deposit",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Successful response to deposit NEAR to NEAR Intents Contract",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            balance: {
                                                type: "string",
                                                description:
                                                    "The new balance of the NEAR account after the deposit",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/swap": {
                get: {
                    summary: "Swap NEAR to ZCash",
                    description:"This endpoint allows you to swap NEAR tokens to ZCash.",
                    operationId: "swap",
                    parameters: [
                        {
                            name: "near_amount",
                            in: "query",
                            description: "The amount of NEAR token to swap",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            transactionPayload: {
                                                type: "object",
                                                properties: {
                                                    signerId: {
                                                        type: "string",
                                                        description: "The signer's NEAR account ID",
                                                    },
                                                    receiverId: {
                                                        type: "string",
                                                        description: "The receiver's NEAR account ID",
                                                    },
                                                    actions: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                type: {
                                                                    type: "string",
                                                                    description:
                                                                        "The type of action (e.g., 'Transfer')",
                                                                },
                                                                params: {
                                                                    type: "object",
                                                                    properties: {
                                                                        deposit: {
                                                                            type: "string",
                                                                            description:
                                                                                "The amount to transfer in yoctoNEAR",
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/withdraw": {
                get: {
                    summary: "Withdraw ZCash in NEAR to Zcash Address",
                    description:"This endpoint allows you to withdraw ZCash in NEAR to ZCash Address.",
                    operationId: "withdraw",
                    parameters: [
                        {
                            name: "zcash_amount",
                            in: "query",
                            description: "The amount of ZCash token to withdraw",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            transactionPayload: {
                                                type: "object",
                                                properties: {
                                                    signerId: {
                                                        type: "string",
                                                        description: "The signer's NEAR account ID",
                                                    },
                                                    receiverId: {
                                                        type: "string",
                                                        description: "The receiver's NEAR account ID",
                                                    },
                                                    actions: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                type: {
                                                                    type: "string",
                                                                    description:
                                                                        "The type of action (e.g., 'Transfer')",
                                                                },
                                                                params: {
                                                                    type: "object",
                                                                    properties: {
                                                                        deposit: {
                                                                            type: "string",
                                                                            description:
                                                                                "The amount to transfer in yoctoNEAR",
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        "400": {
                            description: "Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
    };

    return NextResponse.json(pluginData);
}