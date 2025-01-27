import React, { useEffect, useMemo, useState } from 'react';
import { Message, useChat } from '@ai-sdk/react';
import { ChatRequestOptions } from '@ai-sdk/ui-utils';
import * as anchor from '@coral-xyz/anchor';
import {
  AdjustmentsVerticalIcon,
  InformationCircleIcon,
  StarIcon as StarIconOutline,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { Icon } from '@iconify/react';
import type { Selection } from '@nextui-org/react';
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Badge,
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  SelectSection,
  Slider,
  Switch,
  Tab,
  Tabs,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MAX_RESPONSE_TOKENS } from 'constants/app';
import { HistoryMode, historySelectionLabels } from 'constants/chat';
import { Product } from 'types/generated/sanity';
import {
  deposit,
  getConfigAccount,
  getEscrowAccount,
  getEscrowPda,
  getHoldPda,
  hold,
} from 'services/shared/solana/escrowSol';
import { countLlmTokens } from 'utils/ai/countLlmTokens';
import { KeyCodes } from 'utils/client/dom';
import { useBrowserStorage } from 'context/storage/BrowserStorageContext';
import { useAnchorProvider } from 'hooks/useAnchorProvider';
import Github from 'svg/Github';
import ConnectWallet from 'components/ConnectWallet/ConnectWallet';
import Head from 'components/Head';
import Link from 'components/Link';
import PricingCards from 'components/pricing/PricingCards';
import classNames from 'styles/utils/classNames';
import Bullet from './Bullet';
import FeatureSection from './FeatureSection';
import Footer from './Footer';
import Orb from './Orb';
import PromptContainerWithConversation from './PromptContainerWithConversation';
import Recognition from './Recognition';
import Stars from './Stars';
import StarsTall from './StarsTall';
import UseCase from './UseCase';

const GITHUB_URL = 'https://github.com/marketstandard/onix';
const GROQ_PRIVACY_URL = 'https://groq.com/privacy-policy';
const GROQ_TRUST_URL = 'https://trust.groq.com';
const SHOULD_SHOW_TOP_BAR = false;
const SHOULD_SHOW_SIDE_CONTROLS = false;
const NEW_CHAT_NAME = 'New chat';
const sidebarWidth = 288;

enum HistoryTabs {
  All = 'all',
  Pinned = 'pinned',
}

type Preset = {
  id: string;
  name: string;
};

const ROADMAP_ITEMS = [
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

const FAQS = [
  {
    title: 'What is open source code?',
    content:
      'This means the code is available publicly for anyone to see. This improves privacy and security because it allows you to audit the code and verify all of our claims. It also makes our website more secure because we receive bug reports from the open source community.',
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

const presets: Preset[] = [
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

const DEFAULT_MODELS = [
  'gpt-4',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'babbage-002',
  'davinci-002',
];

const fineTuneModels = [
  'personal::gpt-3',
  'personal::gpt-3-16k',
  'personal::gpt-3-16k-2',
  'personal::gpt-3-16k-3',
  'personal::gpt-3-16k-4',
  'personal::gpt-3-16k-5',
];

/**
 * @todo Abstract this to be universially usable to keep client/server events in sync
 */
export function parseStreamContent(content: string) {
  const eventRegex = /<event>(.*?)<\/event>/g;
  let match: RegExpExecArray | null;
  const events: string[] = [];
  let text = content;

  while ((match = eventRegex.exec(content)) !== null) {
    events.push(match[1]);
    text = text.replace(match[0], ''); // Remove the event tag from the text
  }

  return { text, events };
}

interface Props {
  product?: Product;
}

const Meta = () => {
  return (
    <Head
      title="Private, Secure, Open Source AI Alternative to ChatGPT"
      description="Chat with Onix AI to solve any problem. Private, secure, and trustless by default. Own your data. An open source alternative to ChatGPT."
    />
  );
};

const SectionCallout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={classNames(
        'text-center text-xs font-medium uppercase tracking-widest text-brand-primary',
        className,
      )}
    >
      {children}
    </p>
  );
};

const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h2 className={classNames('font-title text-5xl font-bold', className)}>{children}</h2>;
};

const CalloutText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        'inline-flex rounded-l-lg bg-gradient-to-r from-[rgba(0,253,200,0.5)] to-[rgba(0,0,0,0)] px-4 py-2 font-semibold text-text-primary-darkmode backdrop-blur-md',
        className,
      )}
    >
      {children}
    </div>
  );
};

const BulletText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={classNames('flex gap-4 text-base', className)}>
      <div className="shrink-0">
        <Bullet className="w-6" />
      </div>
      <div className="text-text-secondary-darkmode">{children}</div>
    </div>
  );
};

export default function ChatLlmScreen({ product }: Props) {
  const newChatTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const session = useSession();
  const router = useRouter();
  const { connected, disconnect, signMessage, publicKey } = useWallet();
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [selectedHistoryTab, setSelectedHistoryTab] = React.useState(HistoryTabs.All);
  const [tagSearch, setTagSearch] = React.useState('');
  const [projectSearch, setProjectSearch] = React.useState('');
  const [selectedPreset, setSelectedPreset] = React.useState<Preset | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<React.Key | null>('llama');
  const [systemMessage, setSystemMessage] = React.useState<string>('');
  const [temperature, setTemperature] = React.useState<number>(0.5);
  const [maxLength, setMaxLength] = React.useState<number>(1024);
  const [topP, setTopP] = React.useState<number>(0.5);
  const [frequencyPenalty, setFrequencyPenalty] = React.useState<number>(0);
  const [presencePenalty, setPresencePenalty] = React.useState<number>(0);
  const [displayInfo, setDisplayInfo] = React.useState('');
  const {
    isOpen: isOpenDeleteChat,
    onOpen: onOpenDeleteChat,
    onOpenChange: onOpenChangeDeleteChat,
  } = useDisclosure();
  const {
    isOpen: isOpenChatName,
    onOpen: openChatName,
    onOpenChange: onOpenChangeChatName,
  } = useDisclosure();
  const {
    isOpen: isOpenPricing,
    onOpen: onOpenPricing,
    onOpenChange: onOpenChangePricing,
  } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onOpenChange: onOpenChangeSettings,
  } = useDisclosure();
  const {
    isOpen: isOpenMobileSidebar,
    onOpen: onOpenMobileSidebar,
    onOpenChange: onOpenChangeMobileSidebar,
    onClose: onCloseMobileSidebar,
  } = useDisclosure();
  const [chatNameForUpdate, setChatNameForUpdate] = React.useState('');
  const [tagsForUpdate, setTagsForUpdate] = React.useState([]);
  const [projectForUpdate, setProjectForUpdate] = React.useState<null | {
    id: string;
    title: string;
  }>(null);
  const {
    isOpen: isOpenFilters,
    onOpen: onOpenFilters,
    onOpenChange: onOpenChangeFilters,
  } = useDisclosure();
  const [projectFilters, setProjectFilters] = React.useState<Selection>(new Set([]));
  const handleChangeProjectFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setProjectFilters(new Set(e.target.value.split(',').filter((p) => !!p) || []));
  };
  const [tagFilters, setTagFilters] = React.useState<Selection>(new Set([]));
  const handleChangeTagFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setTagFilters(new Set(e.target.value.split(',').filter((p) => !!p) || []));
  };
  // @ts-ignore It's a Set
  const filterCount = projectFilters.size + tagFilters.size;
  const [projectFilterText, setProjectFilterText] = React.useState('');
  const {
    isOpen: isOpenTags,
    onOpen: onOpenTags,
    onOpenChange: onOpenChangeTags,
    onClose: onCloseTags,
  } = useDisclosure();
  const {
    isOpen: isOpenProject,
    onOpen: onOpenProject,
    onOpenChange: onOpenChangeProject,
    onClose: onCloseProject,
  } = useDisclosure();
  const {
    state,
    activeChatId,
    activeChat,
    setActiveChatId,
    startNewChat,
    generateTitle,
    updateMessages,
    setHistoryMode,
    historyMode,
    togglePinChat,
    toggleIsSavingChat,
    setTags,
    setProject,
    setTitle,
    deleteItemById,
  } = useBrowserStorage();
  const activeChatProject = activeChat?.projectId
    ? state.projects.find((project) => project.id === activeChat?.projectId)
    : undefined;
  const projectFilterTextLower = projectFilterText.toLowerCase().trim();
  const filteredProjects = !!projectFilterTextLower
    ? state.projects.filter((p) => p.id.includes(projectFilterTextLower))
    : state.projects;

  const isUser = true;
  const isTopNavActive = false;

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    data,
    isLoading: isLoadingMessages,
    setMessages,
    setInput,
  } = useChat({
    initialMessages: activeChat?.messages || undefined,
    onResponse: (response) => {
      console.log('onResponse', response);
      if (response) {
        updateMessages(messages);
      }
    },
    onFinish: (response) => {
      if (response) {
        updateMessages(messages);
        generateTitle();
      }
    },
    onToolCall: (tool) => {
      // console.log('onToolCall', tool);
    },
    sendExtraMessageFields: true,
  });

  useEffect(() => {
    if (!!messages?.length) {
      updateMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (!isLoadingMessages && !!messages?.length) {
      updateMessages(messages);
      generateTitle();
    }
  }, [isLoadingMessages, messages]);

  useEffect(() => {
    if (isNewChat) {
      setTimeout(() => {
        newChatTextAreaRef.current?.focus();
      }, 100);
    }
  }, [isNewChat]);

  const onSelectedPresetChange = (key: React.Key) => {
    const preset = presets.find((preset) => preset.id === key);

    if (!preset) {
      return;
    }

    setSelectedPreset(preset);
  };

  const onModelChange = (keys: Selection) => {
    const newModel = Array.from(keys)[0];

    if (newModel) {
      setSelectedModel(newModel);
    }
  };

  const { provider, isConnected } = useAnchorProvider();

  const [balance, setBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = React.useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = React.useState<number>(0);

  const fetchBalance = async () => {
    if (!isConnected) {
      setBalance(0);
      return;
    }

    const { escrowAccount } = await getEscrowAccount({ provider });
    setBalance(escrowAccount?.amountLamports?.toNumber() ?? 0);
  };

  useEffect(() => {
    fetchBalance();
  }, [isConnected, provider]);

  const handleDeposit = async () => {
    if (!isConnected || !depositAmount) return;

    const amountLamports = depositAmount * LAMPORTS_PER_SOL;
    await deposit({ provider, amountLamports });

    await fetchBalance();
  };

  const handleEscrowSol = async () => {
    if (!isConnected) throw new Error('Wallet not connected');

    const { escrowAccount } = await getEscrowAccount({ provider });
    const { amountLamports } = escrowAccount;

    const { configAccount } = await getConfigAccount({ provider });
    const { rateLamports } = configAccount;

    const prevMessagesTokens = messages.reduce((total, msg) => {
      const roleOverhead = 4;
      return total + roleOverhead + countLlmTokens(msg.content);
    }, 0);
    const currMessageTokens = countLlmTokens(input);
    // 10% buffer - don't worry, it will be refunded at close
    const totalTokens = (prevMessagesTokens + currMessageTokens + MAX_RESPONSE_TOKENS) * 1.1;

    if (amountLamports.lt(new anchor.BN(totalTokens * rateLamports.toNumber()))) {
      throw new Error(
        `Missing required lamports to conduct transaction. Required: ${
          totalTokens * rateLamports.toNumber()
        }, Available: ${amountLamports.toString()}`,
      );
    }

    const holdRes = await hold({ provider, amountLlmTokens: totalTokens });

    const { holdAccount, holdCounter } = holdRes;

    const { escrowPda } = getEscrowPda(provider.publicKey);
    const holdAccountPda = getHoldPda(escrowPda, holdCounter.toNumber());

    return { holdPda: holdAccountPda.holdPda };
  };

  const handleAuthenticatedSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions,
  ) => {
    e.preventDefault();

    if (session.status === 'loading') {
      return;
    }

    if (isConnected) {
      try {
        const { holdPda } = await handleEscrowSol();

        const body = {
          holdAccountPda: holdPda.toBase58(),
          publicKey: publicKey.toBase58(),
        };

        const signature = await signMessage(new TextEncoder().encode(JSON.stringify(body)));

        const bodyWithSignature = {
          ...body,
          signature: Buffer.from(signature).toString('base64'),
        };

        handleSubmit(e, { ...chatRequestOptions, body: bodyWithSignature });
        setIsNewChat(false);
      } catch (error) {
        console.error('Error escrowing sol:', error);
      }
    } else if (session.status !== 'authenticated') {
      router.push('/signin');
      return;
    } else {
      handleSubmit(e, { ...chatRequestOptions });
      setIsNewChat(false);
    }
  };

  const controlsContent = (
    <>
      <Textarea
        fullWidth
        label="System"
        placeholder="You are a helpful assistant"
        value={systemMessage}
        onValueChange={setSystemMessage}
      />
      <Select
        label="Model"
        selectedKeys={selectedModel ? ([selectedModel] as unknown as Selection) : []}
        onSelectionChange={onModelChange}
      >
        <SelectSection showDivider title="Open AI">
          {DEFAULT_MODELS.map((model) => (
            <SelectItem key={model}>{model}</SelectItem>
          ))}
        </SelectSection>
        <SelectSection title="Fine Tunes">
          {fineTuneModels.map((fineTunedModel) => (
            <SelectItem key={fineTunedModel}>{fineTunedModel}</SelectItem>
          ))}
        </SelectSection>
      </Select>
      <div className="mt-2 flex w-full flex-col gap-6 px-1">
        <Slider
          aria-label="Temperature"
          label="Temperature"
          maxValue={1}
          minValue={0}
          size="sm"
          step={0.01}
          value={temperature}
          onChange={(value) => {
            setTemperature(value as number);
          }}
        />
        <Slider
          aria-label="Max Length"
          label="Max Length"
          maxValue={2048}
          minValue={0}
          size="sm"
          step={1}
          value={maxLength}
          onChange={(value) => setMaxLength(value as number)}
        />
        <Slider
          aria-label="Top P"
          label="Top P"
          maxValue={1}
          minValue={0}
          size="sm"
          step={0.01}
          value={topP}
          onChange={(value) => {
            setTopP(value as number);
          }}
        />
        <Slider
          aria-label="Frequency Penalty"
          label="Frequency Penalty"
          maxValue={2}
          minValue={0}
          size="sm"
          step={0.01}
          value={frequencyPenalty}
          onChange={(value) => {
            setFrequencyPenalty(value as number);
          }}
        />
        <Slider
          aria-label="Presence Penalty"
          label="Presence Penalty"
          maxValue={2}
          minValue={0}
          size="sm"
          step={0.01}
          value={presencePenalty}
          onChange={(value) => {
            setPresencePenalty(value as number);
          }}
        />
      </div>
    </>
  );

  const chatsForNav = useMemo(() => {
    let chats = [...state.chats];

    if (selectedHistoryTab === HistoryTabs.Pinned) {
      chats = chats.filter((chat) => !!chat.pinnedAt);
    }

    // @ts-ignore It's a Set
    if (projectFilters.size) {
      const pf = Array.from(projectFilters);
      chats = chats.filter((chat) => pf.includes(chat.projectId));
    }

    // @ts-ignore It's a Set
    if (tagFilters.size) {
      const tf = Array.from(tagFilters);
      chats = chats.filter((chat) => (chat.tags || []).some((tag) => tf.includes(tag.id)));
    }

    return chats.toSorted(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [state.chats, selectedHistoryTab, projectFilters, tagFilters]);

  const leftnavContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col">
        <div className="flex gap-2 px-2 pt-4">
          <div>
            <Button
              color="primary"
              className="w-full text-xl leading-none text-text-primary-lightmode"
              isIconOnly
              onClick={() => {
                startNewChat();
                setMessages([]);
                setIsNewChat(true);
                setInput('');
                onCloseMobileSidebar();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                newChatTextAreaRef.current?.focus();
              }}
            >
              +
            </Button>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="w-full text-default-500"
                endContent={
                  <span className="hidden sm:flex">
                    <Icon icon="solar:alt-arrow-down-linear" />
                  </span>
                }
                size="md"
                variant="flat"
              >
                {historySelectionLabels[historyMode]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={historyMode}
              selectionMode="single"
              onSelectionChange={(role) => {
                // @ts-ignore
                setHistoryMode(role.currentKey);
              }}
            >
              <DropdownItem key={HistoryMode.Off}>
                {historySelectionLabels[HistoryMode.Off]}
              </DropdownItem>
              <DropdownItem key={HistoryMode.Local}>
                {historySelectionLabels[HistoryMode.Local]}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-4 flex w-full items-center gap-1 px-2">
          <Tabs
            fullWidth
            size="sm"
            aria-label="Chat history"
            selectedKey={selectedHistoryTab}
            // @ts-ignore It uses the enum
            onSelectionChange={setSelectedHistoryTab}
          >
            <Tab key={HistoryTabs.All} title="All" />
            <Tab key={HistoryTabs.Pinned} title="Pinned" />
          </Tabs>
          <Badge isInvisible={!filterCount} content={filterCount} color="default" size="sm">
            <button
              onClick={() => onOpenFilters()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-medium bg-primary"
            >
              <AdjustmentsVerticalIcon className="w-4 text-black" />
            </button>
          </Badge>
        </div>
        <nav className={classNames('flex flex-auto grow flex-col overflow-y-auto py-2')}>
          <div className="flex flex-col px-2">
            {chatsForNav && chatsForNav.length > 0 ? (
              (connected || session.status === 'authenticated' ? chatsForNav : []).map(
                (chat, i) => {
                  return (
                    <div key={chat.id} className="flex w-full">
                      <div
                        className={classNames(
                          'w-0.5 shrink-0',
                          chat.id === activeChatId ? 'bg-brand-primary' : 'bg-transparent',
                        )}
                      >
                        &nbsp;
                      </div>
                      <button
                        className={classNames(
                          'w-full rounded-lg p-2.5 text-left text-sm hover:bg-brand-gray-900',
                        )}
                        onClick={() => {
                          setActiveChatId(chat.id);
                          setMessages(undefined);
                          setIsNewChat(false);
                          setInput('');
                          onCloseMobileSidebar();
                        }}
                      >
                        <div className="truncate">{chat?.title || NEW_CHAT_NAME}</div>
                      </button>
                    </div>
                  );
                },
              )
            ) : selectedHistoryTab === HistoryTabs.Pinned || filterCount ? (
              <Card>
                <CardBody>
                  <div className="flex w-full items-center justify-center text-center text-sm text-text-secondary-darkmode">
                    No chats maching filters
                  </div>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </nav>
        <div className="space-y-4 py-4">
          <ConnectWallet />
          {session.status === 'loading' ? null : session.status === 'unauthenticated' &&
            !connected ? (
            <div className="px-4">
              <Button
                as={Link}
                href="/signin"
                color="primary"
                fullWidth
                className="font-semibold text-black"
              >
                Log In
              </Button>
            </div>
          ) : (
            <div className="px-1">
              <Button
                fullWidth
                className="justify-start px-2 text-default-600"
                startContent={
                  <Icon
                    className="text-default-600"
                    icon="solar:settings-minimalistic-line-duotone"
                    width={24}
                  />
                }
                variant="light"
                onPress={onOpenSettings}
              >
                Settings
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const leftnav = (
    <>
      <div
        className={classNames(
          'fixed left-0 top-0 z-20 hidden w-side-nav overflow-hidden border-r border-[rgba(13,70,58,0.50)] bg-bg-primary-lightmode dark:bg-bg-primary-darkmode lg:block',
          isTopNavActive ? 'h-[calc(100vh-theme(height.top-nav))]' : 'h-screen',
        )}
      >
        {leftnavContent}
      </div>
      <Button
        className="fixed left-2 top-2 z-20 lg:hidden"
        isIconOnly
        size="sm"
        variant="light"
        onPress={onOpenMobileSidebar}
      >
        <Icon
          className="text-default-500"
          height={24}
          icon="solar:hamburger-menu-outline"
          width={24}
        />
      </Button>
    </>
  );

  return (
    <>
      <Meta />
      {isNewChat || (session.status !== 'authenticated' && !isConnected) ? (
        <div className="safearea-pad-y flex min-h-screen flex-col bg-[rgba(0,253,200,0.05)]">
          {leftnav}
          <main className="relative mx-auto flex w-full grow flex-col px-2 pl-2 lg:pl-side-nav">
            <div className="relative flex h-screen flex-col items-center pt-[10%]">
              <div className="relative z-10 flex w-full flex-col items-center justify-center">
                <div className="mx-auto mb-2 inline-flex flex-col items-center justify-center gap-1.5">
                  <div className="mb-5 text-center text-3xl font-bold">
                    <img src="/logo-white.png" className="h-16 text-brand-primary" />
                  </div>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pretty rounded-full bg-brand-primary/10 px-2 py-1.5"
                  >
                    <Github className="w-5" />
                    <h1 className="text-pretty text-center text-sm text-zinc-300">
                      An open source and private alternative to ChatGPT
                    </h1>
                    <ArrowUpRightIcon className="w-3.5" />
                  </a>
                  <h2 className="mb-8 text-center font-title text-3xl font-bold">
                    Solve any problem, privately
                  </h2>
                </div>
                <form
                  onSubmit={handleAuthenticatedSubmit}
                  className="mx-auto flex w-full max-w-2xl"
                >
                  <Textarea
                    ref={newChatTextAreaRef}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                      if (event.key === KeyCodes.Enter && !event.shiftKey) {
                        event.preventDefault(); // Prevent newline in the textarea

                        if (session.status === 'loading') {
                          return;
                        }

                        if (session.status !== 'authenticated' && !isConnected) {
                          router.push('/signin');
                          return;
                        }

                        handleAuthenticatedSubmit(event);
                        setIsNewChat(false);
                      }
                    }}
                    placeholder="Ask me anything"
                    minRows={1}
                    className="w-full rounded-full transition-shadow focus-within:!shadow-modal focus:!shadow-modal focus-visible:!shadow-modal"
                    classNames={{
                      input: 'h-[32px]',
                    }}
                    radius="lg"
                    aria-label="Prompt"
                    disableAnimation
                    endContent={
                      <Tooltip showArrow content="Send message">
                        <Button
                          isIconOnly
                          color="primary"
                          isDisabled={!input}
                          radius="lg"
                          variant={!input ? 'flat' : 'solid'}
                          type="submit"
                        >
                          <Icon
                            className={classNames('text-black [&>path]:stroke-[2px]')}
                            icon="solar:arrow-up-linear"
                            width={20}
                          />
                        </Button>
                      </Tooltip>
                    }
                  />
                </form>
              </div>
              {/* <div className="mt-8">
                    <Button onPress={onOpenPricing}>Create a Subscription for Full Access</Button>
                  </div> */}
            </div>
            <div className="absolute left-0 top-0 h-full w-full pl-0 lg:pl-side-nav">
              <Stars className="h-full w-full" />
            </div>
            <div className="absolute left-0 top-[calc(100vh_-_8rem)] pl-0 lg:pl-side-nav">
              <div className="flex w-full justify-center px-0.5 pb-8 text-center">
                <button
                  className="w flex items-center gap-1 text-center font-medium"
                  onClick={() => {
                    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                  }}
                >
                  Learn more <ArrowDownIcon className="w-3 text-sm text-primary" />
                </button>
              </div>
              <img
                src="/hero-bg.png"
                alt="Landing Page Image"
                className="h-auto min-h-[9rem] w-full object-cover object-center"
              />
            </div>
          </main>
          <div className="pl-0 lg:pl-side-nav">
            <section className="py-32">
              <SectionTitle className="text-center">
                <div>Own Your Data.</div>
                <div>The Only Private AI Chat.</div>
              </SectionTitle>
              <p className="mx-auto max-w-[51.5rem] py-6 text-center text-lg text-text-secondary-darkmode">
                Stop giving your data to big tech. Onix is the only company committed to privacy and
                data ownership. We never store or train on your conversations.
              </p>
              <div className="text-center">
                <Button color="primary" className="font-semibold text-black">
                  Get Started
                </Button>
              </div>
            </section>
            <section>
              <Recognition userCount={1300} />
            </section>
            <section className="relative">
              <div className="absolute left-0 top-0 h-full w-full">
                <Stars className="h-full w-full" />
              </div>
              <div className="absolute -top-[12rem] left-0">
                <img src="/orb-left.png" alt="Orb" className="max-w-32" loading="lazy" />
              </div>
              <SectionCallout className="mt-36">COMPETITOR COMPARISON</SectionCallout>
              <SectionTitle className="mt-4 text-center">Reclaim Your Data Ownership</SectionTitle>
              <p className="mt-6 text-center font-medium text-text-secondary-darkmode">
                Others store and train on your chats and personal information.
              </p>
              <p className="text-center text-sm text-text-secondary-darkmode">
                Their (lack of) privacy policies say it all:
              </p>
              <div className="px-4">
                <img
                  src="/competitors.png"
                  alt="Competitors"
                  loading="lazy"
                  className="mx-auto max-w-full rounded-lg lg:max-w-[1000px]"
                />
              </div>
            </section>
            <div className="relative my-16">
              <div className="absolute -top-80 right-0">
                <img src="/orb-right.png" alt="Orb" className="max-w-48" loading="lazy" />
              </div>
            </div>
            <section className="relative">
              <SectionCallout className="mt-36">YOU DESERVE BETTER</SectionCallout>
              <SectionTitle className="mt-4 text-center">
                True Data Privacy and Ownership
              </SectionTitle>
              <p className="mx-auto mt-6 max-w-xl text-center text-text-secondary-darkmode">
                Onix is committed to your privacy and ensuring you are the only person in control of
                your data. Our commitment and values:
              </p>
              <div className="">
                {/* <div className="bg-opacity-50 bg-[url('/world.png')] bg-cover bg-center"> */}
                <div className="absolute left-0 top-0 h-full w-full opacity-80 mix-blend-color-dodge">
                  <img
                    src="/world.png"
                    alt="World"
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative min-h-[300px] pb-[10rem] pt-[8rem]">
                  <div className="mx-auto flex max-w-5xl flex-col gap-16 px-2 sm:flex-row sm:px-0">
                    <div className="sm:w-1/2">
                      <div className="space-y-11">
                        <div className="pl-[20%]">
                          <CalloutText className="min-w-[300px]">
                            We don't store your data
                          </CalloutText>
                        </div>
                        <CalloutText>We don't train models on your data</CalloutText>
                        <div className="pl-[20%]">
                          <CalloutText>Your chats stay with you — always</CalloutText>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center sm:w-1/2">
                      <p className="max-w-sm text-pretty text-4xl font-semibold leading-normal">
                        Conversations are stored on your computer or phone, not our database.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="relative">
              <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row">
                <div className="flex flex-col justify-between sm:w-1/2">
                  <BulletText className="text-pretty">
                    Our code and database schema are entirely open source so you can see exactly how
                    we handle data. See our code on{' '}
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary underline"
                    >
                      GitHub
                    </a>
                    .
                  </BulletText>
                  <BulletText>
                    We rely on open source libraries and open source AI models
                  </BulletText>
                  <BulletText>We use modern standards and data encryption</BulletText>
                </div>
                <div className="sm:w-1/2">
                  <BulletText>
                    We have a commitment to using the minimum number of vendors required to run a
                    business, and we ensure they all follow our strict guidelines
                  </BulletText>
                  <ul className="ml-8 mt-1 list-disc pl-8 text-base text-text-secondary-darkmode">
                    <li>
                      Groq for LLM infrastructure. They are committed to{' '}
                      <a
                        href={GROQ_TRUST_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary underline"
                      >
                        trust
                      </a>{' '}
                      and{' '}
                      <a
                        href={GROQ_PRIVACY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary underline"
                      >
                        privacy
                      </a>
                      . We are also in the process of deploying our own private servers to reduce
                      reliance here.
                    </li>
                    <li>Stripe for payments</li>
                    <li>Render.com for database and API hosting</li>
                    <li>Vercel for web hosting</li>
                  </ul>
                </div>
              </div>
              <div className="mt-14 text-center">
                <SectionTitle>Don't take our word for it, verify it</SectionTitle>
                <div className="mt-10">
                  <Button
                    color="primary"
                    className="font-semibold text-black"
                    startContent={<Github className="w-5" />}
                    as="a"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code on GitHub
                  </Button>
                </div>
              </div>
            </section>
            <div className="relative mb-40">
              <div className="absolute left-0 top-0">
                <img
                  src="/oval-bottom.png"
                  alt="Oval Bottom"
                  className="h-auto min-h-[9rem] w-full object-cover object-center"
                />
              </div>
            </div>
            <section className="relative pt-14">
              <SectionCallout className="mt-36">Use Cases</SectionCallout>
              <SectionTitle className="mt-4 text-center">Privacy for Everyone</SectionTitle>
              <p className="mx-auto mt-6 max-w-xl text-center text-text-secondary-darkmode">
                From individuals to businesses, protect what matters most.
              </p>
              <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-5">
                  <div className="pb-14">
                    <UseCase
                      title="Enterprise Clients"
                      description="Don't expose your sensitive data to large tech companies"
                      tags={[]}
                    />
                  </div>
                  <div className="pb-14">
                    <UseCase
                      title="Software Engineers"
                      description="Keep your source code private"
                      tags={[]}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5 sm:pt-5">
                  <div className="sm:pt-14">
                    <UseCase
                      title="Legal Professionals"
                      description="Receive AI intelligence for legal cases without exposing confidential informations"
                      tags={[]}
                    />
                  </div>
                  <div className="pt-14">
                    <UseCase
                      title="Doctors"
                      description="Get feedback for patients without exposing their public health information"
                      tags={[]}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="relative px-2 pt-14 sm:px-0">
              <SectionCallout className="mt-36">Features</SectionCallout>
              <SectionTitle className="mt-4 text-center">Features That Empower You</SectionTitle>
              <p className="mx-auto mt-6 max-w-xl text-center text-text-secondary-darkmode">
                From individuals to businesses, protect what matters most.
              </p>
              <div className="relative my-10">
                <FeatureSection />
                <div className="absolute left-0 top-0 animate-orb-move">
                  <Orb className="w-48" />
                </div>
              </div>
              <div className="flex justify-center">
                <Button color="primary" className="font-semibold text-black">
                  Get Started
                </Button>
              </div>
            </section>
            <section className="relative px-2 pb-40 pt-14 sm:px-0">
              <div className="absolute left-0 top-0 z-10 h-full w-full">
                <StarsTall className="h-full w-full" />
              </div>
              <SectionCallout className="mt-36">ROADMAP</SectionCallout>
              <SectionTitle className="mt-4 text-center">
                Building the Future of Private AI
              </SectionTitle>
              <p className="mx-auto mt-6 max-w-xl text-center text-text-secondary-darkmode">
                Explore what's coming next as we continue to build features and tools that put you
                in charge of your data, with no compromises.
              </p>
              <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-between gap-y-8">
                {ROADMAP_ITEMS.map((item) => (
                  <CalloutText key={item}>
                    <div className="pr-8">{item}</div>
                  </CalloutText>
                ))}
              </div>
            </section>
            {/* <section className="relative">
              <SectionCallout className="">PRICING</SectionCallout>
              <SectionTitle className="mt-4 text-center">Get unlimited access</SectionTitle>
              <p className="mx-auto mt-6 max-w-2xl text-center text-text-secondary-darkmode">
                For less than $5 per week, you can solve any problem while keeping your privacy.
              </p>
              <div>Pricing cards</div>
            </section> */}
            <section className="relative pt-14">
              <SectionCallout className="mt-36">FAQ</SectionCallout>
              <SectionTitle className="mt-4 text-center">Frequently Asked Questions</SectionTitle>
              <p className="mx-auto mt-6 max-w-2xl text-center text-text-secondary-darkmode">
                Our AI platform is designed to address your most pressing concerns. Explore the
                answers to common questions to get the clarity you need.
              </p>
              <div className="mx-auto mt-10 max-w-5xl">
                <Accordion
                  fullWidth
                  keepContentMounted
                  className="gap-3"
                  itemClasses={{
                    base: 'px-6 !bg-transparent hover:!bg-default-100 !shadow-none data-[open=true]:!bg-default-100',
                    title: 'font-medium',
                    trigger: 'py-4 md:py-6',
                    content: 'pt-0 pb-6 text-base text-default-500',
                    indicator: 'data-[open=true]:rotate-180',
                  }}
                  items={FAQS}
                  selectionMode="multiple"
                  variant="splitted"
                >
                  {FAQS.map((item, i) => (
                    <AccordionItem
                      key={i}
                      indicator={<Icon icon="solar:alt-arrow-down-linear" width={24} />}
                      title={item.title}
                    >
                      {item.content}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
            <section className="relative flex min-h-[512px] flex-col items-center justify-center pt-14">
              <div className="absolute bottom-0 left-0 h-full w-full opacity-80 mix-blend-color-dodge">
                <img
                  src="/world.png"
                  alt="World"
                  loading="lazy"
                  className="mx-auto max-w-4xl object-cover object-center"
                />
              </div>
              <SectionTitle className="mt-4 text-center">
                Get Started with True Privacy
              </SectionTitle>
              <p className="mx-auto mt-6 max-w-2xl text-center">
                Privacy for the cost of a cup of coffee per week
              </p>
              <div className="mt-10 flex justify-center gap-5">
                <Button
                  as={Link}
                  href="/signin"
                  color="primary"
                  className="font-semibold text-black"
                >
                  Create Your Private Account
                </Button>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="safearea-pad-y flex min-h-screen bg-bg-primary-lightmode dark:bg-bg-primary-darkmode">
          {leftnav}
          <main className="mx-auto flex grow flex-col overflow-y-hidden px-2 lg:h-screen lg:h-screen lg:pl-side-nav">
            {SHOULD_SHOW_TOP_BAR && (
              <header className="flex w-full flex-col items-center gap-4 pb-6 lg:flex-row lg:justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-large font-medium">Playground</h1>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        className="flex lg:hidden"
                        radius="full"
                        size="sm"
                        variant="flat"
                      >
                        <Icon icon="solar:menu-dots-bold" width={24} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="fle-col flex max-h-[40vh] w-[300px] justify-start gap-3 overflow-scroll p-4">
                      {controlsContent}
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    aria-label="Saved presets"
                    className="w-[200px] max-w-[120px] lg:max-w-[230px]"
                    labelPlacement="outside"
                    placeholder="Select a preset"
                    selectedKeys={selectedPreset ? [selectedPreset.id] : []}
                    size="sm"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      onSelectedPresetChange(e.target.value);
                    }}
                  >
                    {presets.map((preset) => (
                      <SelectItem key={preset.id}>{preset.name}</SelectItem>
                    ))}
                  </Select>
                  <Button size="sm" variant="flat">
                    Save
                  </Button>
                  <Button size="sm" variant="flat">
                    Update
                  </Button>
                  <Button color="danger" size="sm" variant="flat">
                    Delete
                  </Button>
                </div>
              </header>
            )}

            <div className="flex flex-col justify-between gap-1 py-1.5 pl-8 sm:flex-row sm:items-center lg:pl-4">
              <div className="flex">
                <Dropdown>
                  <DropdownTrigger>
                    <button className="flex items-center justify-center rounded-md px-1.5 py-1 leading-none transition-colors duration-150 hover:bg-default/50">
                      <h1 className="mr-1 text-sm font-semibold">
                        {activeChat?.title || NEW_CHAT_NAME}
                      </h1>
                      <ChevronDownIcon className="w-3.5 text-text-secondary-darkmode" />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    selectedKeys={historyMode}
                    selectionMode="single"
                    onSelectionChange={(role) => {
                      // @ts-ignore
                      setHistoryMode(role.currentKey);
                    }}
                  >
                    <DropdownItem
                      onPress={() => {
                        setChatNameForUpdate(activeChat?.title || '');
                        openChatName();
                      }}
                    >
                      Rename
                    </DropdownItem>
                    <DropdownItem
                      onPress={() => {
                        onOpenDeleteChat();
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <div className="ml-2 hidden items-center sm:flex">
                  <Switch
                    size="sm"
                    isSelected={activeChat?.isSavingChat}
                    onValueChange={toggleIsSavingChat}
                  />{' '}
                  <span
                    className={classNames(
                      'text-xs font-medium',
                      activeChat?.isSavingChat
                        ? 'text-text-primary-darkmode'
                        : 'text-text-secondary-darkmode',
                    )}
                  >
                    Autosave
                  </span>{' '}
                  <Tooltip
                    placement="bottom"
                    content="Manage if this chat should be added to the history of your selected save location, if turned on. If you previously saved this chat and want it removed from the history, you will need to delete it."
                    size="sm"
                    closeDelay={100}
                    className="max-w-64 text-pretty p-4"
                    shadow="lg"
                  >
                    <InformationCircleIcon className="ml-1 w-4 cursor-pointer text-text-secondary-darkmode" />
                  </Tooltip>
                </div>
              </div>
              <div className="flex gap-2.5">
                {!!activeChat?.pinnedAt && (
                  <button onClick={() => togglePinChat(false)}>
                    <StarIcon className="w-5 text-warning-500" />
                  </button>
                )}
                {!activeChat?.pinnedAt && (
                  <button onClick={() => togglePinChat(true)}>
                    <StarIconOutline className="w-5 text-warning-500" />
                  </button>
                )}
                <Badge
                  isInvisible={!activeChat?.tags?.length}
                  content={activeChat?.tags?.length}
                  color="primary"
                  className="text-black"
                  size="sm"
                >
                  <Button
                    size="sm"
                    onPress={() => {
                      onOpenTags();
                      setTagsForUpdate(activeChat?.tags || []);
                    }}
                  >
                    Tags
                  </Button>
                </Badge>
                <Button
                  size="sm"
                  onPress={() => {
                    const matchingProject = state.projects.find(
                      (project) => project.id === activeChat?.projectId,
                    );
                    onOpenProject();
                    setProjectForUpdate(matchingProject || null);
                    setProjectSearch(matchingProject?.title || '');
                  }}
                >
                  Project{activeChatProject ? `: ${activeChatProject.title}` : ''}
                </Button>
              </div>
            </div>

            {/* Chat */}
            <PromptContainerWithConversation
              className="max-w-full px-0 lg:px-4"
              scrollShadowClassname=""
              isLoading={isLoadingMessages}
              stream={''}
              messages={messages}
              messageText={input}
              setMessageText={handleInputChange}
              displayInfo={displayInfo}
              submitChat={handleAuthenticatedSubmit}
            />

            {/* Controls */}
            {SHOULD_SHOW_SIDE_CONTROLS && (
              <div className="hidden w-1/4 flex-none flex-col gap-4 lg:flex">{controlsContent}</div>
            )}
          </main>
          {/* <section
          className={classNames(
            'hidden w-side-nav overflow-hidden border-l border-border-primary-lightmode dark:border-border-primary-darkmode lg:block',
            isTopNavActive ? 'h-[calc(100vh-theme(height.top-nav))]' : 'h-screen',
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-full flex-col">
              <div className="flex h-full flex-auto grow flex-col space-y-2 overflow-y-auto pt-5 text-center">
                Other actions or results
              </div>
            </div>
          </div>
        </section> */}
        </div>
      )}
      <Modal
        isOpen={isOpenTags}
        size="lg"
        onClose={onCloseTags}
        onOpenChange={() => {
          setTagSearch('');
          setTagsForUpdate([]);
        }}
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tags: {activeChat?.title || NEW_CHAT_NAME}
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  placeholder="Add tags"
                  className=""
                  selectedKey=""
                  onSelectionChange={(key) => {
                    console.log(key);
                  }}
                  listboxProps={{
                    emptyContent: tagSearch ? (
                      <div>
                        <button
                          className="flex items-center"
                          onClick={() => {
                            setTagsForUpdate((tags) => [
                              ...tags.filter((tag) => tag.id !== tagSearch.toLowerCase()),
                              { id: tagSearch.toLowerCase(), name: tagSearch },
                            ]);
                            setTagSearch('');
                          }}
                        >
                          <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-lg bg-primary font-semibold leading-none text-black">
                            +
                          </span>{' '}
                          Create tag: {tagSearch}
                        </button>
                      </div>
                    ) : (
                      <div>Enter name to create tag</div>
                    ),
                  }}
                  inputValue={tagSearch}
                  onInputChange={(value) => {
                    console.log(value);
                    setTagSearch(value);
                  }}
                  onClose={() => setTagSearch('')}
                >
                  {state.tags.map((tag) => (
                    <AutocompleteItem
                      key={tag.id}
                      onPress={() => {
                        setTagsForUpdate((tags) => [...tags.filter((t) => t.id !== tag.id), tag]);
                        setTagSearch('');
                      }}
                    >
                      {tag.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <div className="mt-1 flex flex-wrap gap-2">
                  {(tagsForUpdate || []).map((tag) => {
                    return (
                      <Chip
                        key={tag.id}
                        onClose={() => {
                          console.log('remove tag from current list');
                          setTagsForUpdate((tags) => tags.filter((t) => t.id !== tag.id));
                        }}
                        variant="flat"
                      >
                        {tag.name}
                      </Chip>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  className="text-black"
                  onPress={() => {
                    onClose();
                    setTags({ chatId: activeChatId, tags: tagsForUpdate });
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenProject}
        onClose={onCloseProject}
        onOpenChange={() => {
          setProjectSearch('');
          setProjectForUpdate(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Set project</ModalHeader>
              <ModalBody>
                {!!projectForUpdate && (
                  <div className="mb-2">
                    <h2 className="mb-2 text-sm font-medium">Active Project for Chat</h2>
                    <Card className="bg-default-100">
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <div className="pl-2.5 text-sm">{projectForUpdate.title}</div>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            size="sm"
                            onPress={() => setProjectForUpdate(null)}
                          >
                            <XMarkIcon className="w-4" />
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                )}
                <div>
                  <div>
                    <h2 className="mb-2 text-sm font-medium">Set, create, or filter projects</h2>
                  </div>
                  <div className="flex items-center">
                    <Input
                      placeholder="Create or filter projects"
                      isClearable
                      value={projectFilterText}
                      onChange={(e) => setProjectFilterText(e.target.value)}
                    />
                    <div className="mt-1 flex justify-end">
                      <Button
                        color="primary"
                        variant="ghost"
                        onPress={() => {
                          setProjectForUpdate({
                            id: projectFilterText.toLowerCase(),
                            title: projectFilterText,
                          });
                          setProjectFilterText('');
                        }}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto">
                  <div>{/* <h2 className="text-sm font-medium">Projects</h2> */}</div>
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div className="pl-2 text-sm text-text-secondary-darkmode">
                        {project.title}
                      </div>
                      <Button
                        color="success"
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setProjectForUpdate(project);
                        }}
                      >
                        Set as project
                      </Button>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  className="text-black"
                  onPress={() => {
                    setProject({ chatId: activeChatId, project: projectForUpdate });
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenFilters}
        onOpenChange={() => {
          onOpenChangeFilters();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody>
                <div>
                  <div>
                    <h2 className="mb-2 text-sm font-medium">Project</h2>
                  </div>
                  <Select
                    selectionMode="multiple"
                    placeholder="Select projects"
                    selectedKeys={projectFilters}
                    onChange={handleChangeProjectFilters}
                  >
                    {state.projects.map((project) => (
                      <SelectItem key={project.id}>{project.title}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <div>
                    <h2 className="mb-2 text-sm font-medium">Tags</h2>
                  </div>
                  <Select
                    selectionMode="multiple"
                    placeholder="Select tags"
                    selectedKeys={tagFilters}
                    onChange={handleChangeTagFilters}
                  >
                    {state.tags.map((tag) => (
                      <SelectItem key={tag.id}>{tag.name}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setProjectFilters(new Set([]));
                    setTagFilters(new Set([]));
                  }}
                >
                  Clear All
                </Button>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenChatName}
        onOpenChange={() => {
          onOpenChangeChatName();
          setChatNameForUpdate('');
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Chat name</ModalHeader>
              <ModalBody>
                <Input
                  value={chatNameForUpdate}
                  onChange={(e) => setChatNameForUpdate(e.target.value)}
                  placeholder="Enter name for chat..."
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  className="text-black"
                  onPress={() => {
                    setTitle(chatNameForUpdate);
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenDeleteChat}
        onOpenChange={() => {
          onOpenChangeDeleteChat();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete chat</ModalHeader>
              <ModalBody>
                <div className="text-sm text-danger-500">
                  Are you sure you want to delete this chat? This action is permanent.
                </div>
                <div>{activeChat?.title || NEW_CHAT_NAME}</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  color="danger"
                  onPress={() => {
                    deleteItemById('chats', activeChatId);
                    setIsNewChat(true);
                    onClose();
                  }}
                >
                  Confirm Delete
                </Button>
                <Button onPress={onClose}>Cancel</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size="2xl"
        isOpen={isOpenPricing}
        backdrop="blur"
        onOpenChange={() => {
          onOpenChangePricing();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create a subscription</ModalHeader>
              <ModalBody>
                <PricingCards />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size="2xl"
        isOpen={isOpenSettings}
        backdrop="blur"
        onOpenChange={() => {
          onOpenChangeSettings();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
              <ModalBody>
                {connected ? (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-border-primary-darkmode p-4">
                      <h3 className="mb-2 text-sm font-medium">Credit Balance</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-semibold">
                          {balance ? `${balance / LAMPORTS_PER_SOL} SOL` : '0.00 SOL'}
                        </div>
                      </div>
                      <Accordion>
                        <AccordionItem
                          key="1"
                          aria-label="Manage SOL"
                          title="Manage SOL"
                          className="px-0 text-sm"
                        >
                          <Tabs aria-label="SOL management options" fullWidth>
                            <Tab key="deposit" title="Deposit">
                              <div className="space-y-4 py-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Amount to deposit</span>
                                  <span className="text-sm font-medium">{`${depositAmount} SOL`}</span>
                                </div>
                                <Slider
                                  aria-label="Deposit amount"
                                  maxValue={10}
                                  minValue={0}
                                  step={0.1}
                                  value={depositAmount}
                                  onChange={(value) => setDepositAmount(value as number)}
                                  className="w-full"
                                />
                                <Button
                                  color="primary"
                                  className="w-full font-semibold text-black"
                                  isDisabled={depositAmount <= 0}
                                  onClick={handleDeposit}
                                >
                                  Deposit {depositAmount} SOL
                                </Button>
                              </div>
                            </Tab>
                            <Tab key="withdraw" title="Withdraw">
                              <div className="space-y-4 py-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Amount to withdraw</span>
                                  <span className="text-sm font-medium">{`${withdrawAmount} SOL`}</span>
                                </div>
                                <Slider
                                  aria-label="Withdraw amount"
                                  maxValue={balance ? balance / LAMPORTS_PER_SOL : 0}
                                  minValue={0}
                                  step={0.1}
                                  value={withdrawAmount}
                                  onChange={(value) => setWithdrawAmount(value as number)}
                                  className="w-full"
                                />
                                <Button
                                  color="primary"
                                  variant="bordered"
                                  className="w-full"
                                  isDisabled={true} //withdrawAmount <= 0}
                                >
                                  Withdraw {withdrawAmount} SOL
                                </Button>
                              </div>
                            </Tab>
                          </Tabs>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                ) : session.status === 'authenticated' ? (
                  <div className="mt-8 text-sm font-medium text-red-500">
                    <button onClick={() => signOut()}>Log Out</button>
                  </div>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        classNames={{
          base: 'justify-start sm:m-0 p-0 m-0 h-dvh max-h-full w-[var(--sidebar-width)]',
          wrapper: 'items-start justify-start !w-[var(--sidebar-width)]',
          body: 'p-0',
          closeButton: 'hidden',
        }}
        isOpen={isOpenMobileSidebar}
        motionProps={{
          variants: {
            enter: {
              x: 0,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              x: -288,
              transition: {
                duration: 0.2,
                ease: 'easeOut',
              },
            },
          },
        }}
        radius="none"
        style={{
          // @ts-ignore
          '--sidebar-width': `${sidebarWidth}px`,
        }}
        onOpenChange={onOpenChangeMobileSidebar}
      >
        <ModalContent>{(onClose) => <>{leftnavContent}</>}</ModalContent>
      </Modal>
    </>
  );
}
