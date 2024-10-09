'use client';

import React from 'react';
import { Button, CardFooter } from '@nextui-org/react';
import type { ButtonProps } from '@nextui-org/react';
import { useApiGateway } from 'hooks/useApi';
import PricingButton from './PricingButton';

export enum FrequencyEnum {
  Yearly = 'yearly',
  Quarterly = 'quarterly',
}

export enum TiersEnum {
  Free = 'free',
  Pro = 'pro',
  Team = 'team',
}

export type Frequency = {
  key: FrequencyEnum;
  label: string;
  priceSuffix: string;
};

export type Tier = {
  key: TiersEnum;
  title: string;
  price: string;
  priceSuffix?: string;
  href: string;
  description?: string;
  mostPopular?: boolean;
  featured?: boolean;
  features?: string[];
  buttonText: string;
  buttonColor?: ButtonProps['color'];
  buttonVariant: ButtonProps['variant'];
  plan: 'monthly' | 'yearly';
};

export const frequencies: Array<Frequency> = [
  { key: FrequencyEnum.Yearly, label: 'Pay Yearly', priceSuffix: 'per year' },
  { key: FrequencyEnum.Quarterly, label: 'Pay Quarterly', priceSuffix: 'per quarter' },
];

export const tiers: Array<Tier> = [
  {
    key: TiersEnum.Pro,
    title: 'Monthly',
    description: 'Get access to private, cutting edge AI for the cost of a pizza. Own your data.',
    href: '#',
    mostPopular: true,
    price: '$20',
    priceSuffix: 'month',
    featured: false,
    features: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonColor: 'primary',
    buttonVariant: 'solid',
    plan: 'monthly',
  },
  {
    key: TiersEnum.Team,
    title: 'Yearly',
    href: '#',
    featured: true,
    mostPopular: false,
    description: 'Get 2 months free with when you go annual.',
    price: '$200',
    priceSuffix: 'year',
    features: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonColor: 'default',
    buttonVariant: 'flat',
    plan: 'yearly',
  },
];

export default function Demo() {
  const { data, error, post, isLoading } = useApiGateway('/v1/payments/checkout');

  const createCheckoutSession = async ({ plan }: { plan: string }) => {
    try {
      if (isLoading) return;

      const resp = await post({
        payload: {
          plan,
        },
      });
      window.location.href = resp.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div aria-label="Tiers" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-4">
      {tiers.map((tier) => (
        <button
          key={tier.key}
          onClick={() => {
            createCheckoutSession({
              plan: tier.plan,
            });
          }}
          disabled={isLoading}
        >
          <PricingButton>
            <div className="flex flex-col gap-2 p-4 pb-20 text-left">
              {tier.title}
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-3xl font-semibold leading-7 tracking-tight text-transparent">
                  {tier.price}
                </span>
                <span className="text-tiny font-medium text-default-400">
                  {`/${tier.priceSuffix}`}
                </span>
              </p>
              <p className="text-sm text-default-400">{tier.description}</p>
            </div>
            <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow items-center gap-2">&nbsp;</div>
              <Button
                as="span"
                radius="full"
                size="sm"
                color="primary"
                className="font-semibold text-black"
                onPress={() => {
                  createCheckoutSession({
                    plan: tier.plan,
                  });
                }}
                disabled={isLoading}
                isLoading={isLoading}
              >
                Purchase {tier.title}
              </Button>
            </CardFooter>
          </PricingButton>
        </button>
      ))}
    </div>
  );
}
