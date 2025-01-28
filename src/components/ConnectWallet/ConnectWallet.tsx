import { useEffect } from 'react';
import { ArrowLeftOnRectangleIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { signOut, useSession } from 'next-auth/react';
import { signInWithSolana } from 'utils/client/wallet';
import Button from 'components/Button';

interface Props {}

export default function ConnectWallet({}: Props) {
  const wallet = useWallet();
  const { connected, publicKey, disconnect } = wallet;
  const { setVisible } = useWalletModal();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleAuth = async () => {
      if (connected && publicKey && !session?.user?.publicKey && status === 'unauthenticated') {
        try {
          console.log('--- signing in with solana');
          await signInWithSolana(wallet);
        } catch (error) {
          console.error('Failed to authenticate wallet:', error);
          // Optionally disconnect wallet on auth failure
          // disconnect();
        }
      }
    };

    handleAuth();
  }, [connected, publicKey, session, wallet, status]);

  const abbreviateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const handleDisconnect = async () => {
    disconnect();
    await signOut({ redirect: false });
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
          <button onClick={handleDisconnect} className="w-fit rounded-md bg-negative p-2">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
