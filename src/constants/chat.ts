export enum HistoryMode {
  Off = 'OFF',
  Local = 'LOCAL',
  EthereumBlockchain = 'ETHEREUM_BLOCKCHAIN',
  SolanaBlockchain = 'SOLANA_BLOCKCHAIN',
  PrivateCloud = 'PRIVATE_CLOUD',
}

export const historySelectionLabels = {
  [HistoryMode.Off]: 'Off',
  [HistoryMode.Local]: 'Local',
  [HistoryMode.EthereumBlockchain]: 'Ethereum Blockchain',
  [HistoryMode.SolanaBlockchain]: 'Solana Blockchain',
  [HistoryMode.PrivateCloud]: 'Blockchain',
};

export enum HistoryTabs {
  All = 'all',
  Pinned = 'pinned',
}

export type Preset = {
  id: string;
  name: string;
};

export const ROADMAP_ITEMS = [
  'API access',
  'Business and organization structures',
  'Mobile and desktop apps',
  'Chat export',
  'Encrypted cloud storage',
  'Generative UI',
  'Voice chat with AI',
  'Artifacts',
  'Custom models',
  'AI agents and plugins',
  'Vector database management',
  'Chat search',
  'Blockchain storage and payments',
];

export const FAQS = [
  {
    title: 'What is open source code?',
    content:
      'This means the code is available publicly for anyone to see. This improves privacy and security because it allows you to audit the code and verify all of our claims. It also makes our website more secure because we receive bug reports from the open source community.',
  },
  {
    title: 'How do payments work?',
    content:
      'We use Solana for all payments. When you chat, funds are placed on a 10-minute hold in your escrow account. If the API call succeeds, the server withdraws the held amount and returns the balance to your escrow account. If the call fails or times out, the hold expires automatically and the funds return to your available balance. This ensures you only pay for successful requests while protecting both users and the service.',
  },
  {
    title: 'What are you doing to become more private?',
    content:
      'Currently we store the absolute minimum amount of data to prevent abuse and keep the site running. To be even more private, we will integrate the blockchain so that you only need a cryptocurrency wallet to use the site and you can pre-buy usage tokens. See our roadmap for more details on our current and future plans.',
  },
  {
    title: "Why can't I acccess my conversation data on other devices?",
    content:
      'To build trust and keep data completely private, we store currently conversations on your device, not in the cloud. This gives you full control. We are currently implementing the ability to export your conversations to other devices or store it in our encrypted cloud storage.',
  },
  {
    title: 'Do you use any analytics?',
    content:
      'We use a privacy-focused and completely anonymous tool that stores no cookies. It gives us anonymous usage data so we can understand the number site visitors.',
  },
  {
    title: 'Are you HIPAA and SOC2 compliant?',
    content:
      'We are in the process of becoming HIPAA and SOC2 compliant. With our strict practices around privacy and radically minimal data storage, we are already compliant with HIPAA and SOC2 and must pass the audits and receive the certifications as a final step.',
  },
  {
    title: 'Do you offer API access?',
    content:
      'We are quickly developing an API that will allow you to access our private AI from your applications or websites.',
  },
  {
    title: 'How do you work with startups, businesses, and enterprise clients?',
    content:
      "The private LLM is perfectly suited for business and enterprise clients, ensuring your data is always secured. We offer on-premise deployments so the data never leaves your organization's control",
  },
];

export const PRESETS: Preset[] = [
  {
    id: '1',
    name: 'Preset 1',
  },
  {
    id: '2',
    name: 'Preset 2',
  },
  {
    id: '3',
    name: 'Preset 3',
  },
  {
    id: '4',
    name: 'Preset 4',
  },
  {
    id: '5',
    name: 'Preset 5',
  },
  {
    id: '6',
    name: 'Preset 6',
  },
  {
    id: '7',
    name: 'Preset 7',
  },
  {
    id: '8',
    name: 'Preset 8',
  },
  {
    id: '9',
    name: 'Preset 9',
  },
  {
    id: '10',
    name: 'Preset 10',
  },
];

export const DEFAULT_MODELS = [
  'gpt-4',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'babbage-002',
  'davinci-002',
];

export const FINE_TUNE_MODELS = [
  'personal::gpt-3',
  'personal::gpt-3-16k',
  'personal::gpt-3-16k-2',
  'personal::gpt-3-16k-3',
  'personal::gpt-3-16k-4',
  'personal::gpt-3-16k-5',
];
