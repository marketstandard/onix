import { ArrowLeftOnRectangleIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Button from 'components/Button';

interface Props {}

export default function ConnectWallet({}: Props) {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const abbreviateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="flex items-center gap-2 px-4">
      {!connected ? (
        <Button onClick={() => setVisible(true)} className="w-full">
          Connect Wallet
        </Button>
      ) : (
        <div className="flex w-full gap-2">
          <div className="flex w-full items-center gap-2 rounded-md bg-brand-primary p-1">
            <WalletIcon className="h-6 w-6 shrink-0 text-black" />
            <span className="truncate text-sm text-black">
              {publicKey ? abbreviateAddress(publicKey.toString()) : ''}
            </span>
          </div>
          <button onClick={disconnect} className="w-fit rounded-md bg-negative p-2">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
