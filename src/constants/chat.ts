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
