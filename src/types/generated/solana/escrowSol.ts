/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/escrow_sol.json`.
 */
export type EscrowSol = {
  "address": "7L4VThFEZYgudKNFfBxbBSimMgkWu4PjpcfcPN8sSaW5",
  "metadata": {
    "name": "escrowSol",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "adjustRate",
      "discriminator": [
        143,
        27,
        123,
        27,
        109,
        218,
        64,
        219
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newRateLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "debit",
      "discriminator": [
        144,
        252,
        105,
        115,
        174,
        111,
        100,
        65
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "hold",
          "writable": true
        },
        {
          "name": "config"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountLlmTokens",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "escrow",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "hold",
      "discriminator": [
        83,
        159,
        208,
        118,
        203,
        182,
        239,
        221
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "escrow",
          "writable": true
        },
        {
          "name": "config"
        },
        {
          "name": "hold",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "escrow"
              },
              {
                "kind": "account",
                "path": "escrow.hold_counter",
                "account": "escrowAccount"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amountLlmTokens",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "rateLamports",
          "type": "u64"
        },
        {
          "name": "holdTimeoutSeconds",
          "type": "i64"
        }
      ]
    },
    {
      "name": "releaseHold",
      "discriminator": [
        106,
        109,
        70,
        162,
        197,
        158,
        92,
        243
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "hold",
          "writable": true
        },
        {
          "name": "escrow",
          "writable": true
        },
        {
          "name": "config"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "setStorageUrl",
      "discriminator": [
        35,
        112,
        246,
        135,
        217,
        196,
        125,
        172
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "escrow",
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "url",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configAccount",
      "discriminator": [
        189,
        255,
        97,
        70,
        186,
        189,
        24,
        102
      ]
    },
    {
      "name": "escrowAccount",
      "discriminator": [
        36,
        69,
        48,
        18,
        128,
        225,
        125,
        135
      ]
    },
    {
      "name": "holdAccount",
      "discriminator": [
        235,
        211,
        184,
        241,
        228,
        100,
        127,
        40
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6001,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6002,
      "name": "notEnoughLamportsOnHold",
      "msg": "Not enough lamports on hold"
    },
    {
      "code": 6003,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6004,
      "name": "invalidUrl",
      "msg": "Invalid URL"
    }
  ],
  "types": [
    {
      "name": "configAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "rateLamports",
            "type": "u64"
          },
          {
            "name": "holdTimeoutSeconds",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "escrowAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "amountLamports",
            "type": "u64"
          },
          {
            "name": "holdCounter",
            "type": "u64"
          },
          {
            "name": "storageUrl",
            "type": {
              "option": {
                "array": [
                  "u8",
                  200
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "holdAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "escrowAuthority",
            "type": "pubkey"
          },
          {
            "name": "amountLamports",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
