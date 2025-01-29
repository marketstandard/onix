# Onix

**Own Your Data**

An open source and private alternative to ChatGPT.

Stop giving your data to big tech and reclaim your privacy with Onix. We are committed to ensuring that your conversations remain private and secure, without being stored or used to train models.

## Why Choose Onix?

### Reclaim Your Data Ownership

Unlike other AI chat platforms, Onix does not store or train on your chats and personal information. Our privacy policies are transparent and designed to protect you.

### True Data Privacy and Ownership

- **No Data Storage**: We don't store your data.
- **No Model Training**: We don't train models on your data.
- **Local Storage**: Your chats stay with you, stored on your computer or phone, not our database.
- **Open Source**: Our code and database schema are open source.

### Trusted Infrastructure

- **Groq**: For LLM infrastructure, committed to trust and privacy.
- **Solana**: For secure cryptocurrency payments with time-locked escrow holds.
- **Render.com**: For database and API hosting.
- **Vercel**: For web hosting.

### How Payments Work

Our payment system uses Solana for maximum security and transparency:

1. **Deposit**: Users deposit SOL into their escrow account
2. **Time-Locked Holds**: Each chat request creates a 10-minute hold on the required funds
3. **Resolution**:
   - If the API call succeeds: The server withdraws from the held funds, and the remaining unused funds are returned to your escrow account
   - If the API call fails or times out: The hold expires automatically and funds return to your available balance
4. **Security**: All actions require cryptographic signatures, ensuring only you can authorize holds on your funds

## Use Cases

Onix is designed for everyone, from individuals to businesses.

Examples include:

- **Enterprise Clients**: Protect sensitive data from large tech companies.
- **Software Engineers**: Keep your source code private.
- **Legal Professionals**: Receive AI intelligence without exposing confidential information.
- **Doctors**: Get feedback for patients without exposing public health information.

## Features

### Features That Empower You

- **Simple and Elegant Design**: Enjoy clear, concise answers without unnecessary clutter.
- **Productivity Focus**: Pin, tag, and group chats effortlessly to stay organized.
- **Radical Privacy**: Your chats are securely stored on your device.

### Natural Conversation

Chat with an AI that understands context and provides helpful, human-like responses:

![Chat Example](https://raw.githubusercontent.com/marketstandard/onix/refs/heads/main/public/images/chat-example.png)

### Secure Authentication

Connect securely using wallet-based authentication:

![Wallet Verification](https://raw.githubusercontent.com/marketstandard/onix/refs/heads/main/public/images/verify-wallet.png)

## Roadmap

We are building the future of private AI with features that put you in charge of your data:

- API access
- Business and organization structures
- Mobile and desktop apps
- Chat export
- Encrypted cloud storage
- Generative UI
- Voice chat with AI
- Custom models and AI agents
- Vector database management
- Chat search
- Blockchain storage and payments

---

**Privacy First. Always.**

const FAQS = [
// ... existing FAQs ...
{
title: 'How do payments work?',
content:
'We use Solana for all payments. When you chat, funds are placed on a 10-minute hold in your escrow account. If the API call succeeds, the server withdraws the held amount. If the call fails or times out, the hold expires automatically and the funds return to your available balance. This ensures you only pay for successful requests while protecting both users and the service.',
},
// ... existing FAQs ...
];
