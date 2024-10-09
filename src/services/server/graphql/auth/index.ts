import { type Adapter, isDate } from '@auth/core/adapters';
import { useFragment } from 'types/generated/auth';
import {
  AccountFragmentFragmentDoc,
  CreateAccountDocument,
  CreateSessionDocument,
  CreateUserDocument,
  CreateVerificationTokenDocument,
  DeleteAccountDocument,
  DeleteSessionDocument,
  DeleteUserDocument,
  DeleteVerificationTokenDocument,
  GetSessionAndUserDocument,
  GetUserDocument,
  GetUsersDocument,
  SessionFragmentFragmentDoc,
  UpdateSessionDocument,
  UpdateUserDocument,
  UserFragmentFragmentDoc,
  VerificationTokenFragmentFragmentDoc,
} from 'types/generated/auth/graphql';
import { type HasuraAdapterClient, client as hasuraClient } from './client';

export function HasuraAdapter(client: HasuraAdapterClient): Adapter {
  const c = hasuraClient(client);

  return {
    async createUser(newUser) {
      const { insertUsersOne } = await c.run(CreateUserDocument, {
        data: format.to<any>(newUser),
      });

      return format.from(useFragment(UserFragmentFragmentDoc, insertUsersOne), true);
    },
    async getUser(id) {
      const { usersByPk } = await c.run(GetUserDocument, { id });

      return format.from(useFragment(UserFragmentFragmentDoc, usersByPk));
    },
    async getUserByEmail(email) {
      const { users } = await c.run(GetUsersDocument, {
        where: { email: { _eq: email } },
      });

      return format.from(useFragment(UserFragmentFragmentDoc, users?.[0]));
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { users } = await c.run(GetUsersDocument, {
        where: {
          accounts: {
            provider: { _eq: provider },
            providerAccountId: { _eq: providerAccountId },
          },
        },
      });

      return format.from(useFragment(UserFragmentFragmentDoc, users?.[0]));
    },
    async updateUser({ id, ...data }) {
      const { updateUsersByPk } = await c.run(UpdateUserDocument, {
        id,
        data: format.to<any>(data),
      });

      return format.from(useFragment(UserFragmentFragmentDoc, updateUsersByPk), true);
    },
    async deleteUser(id) {
      const { deleteUsersByPk } = await c.run(DeleteUserDocument, { id });

      return format.from<any, true>(useFragment(UserFragmentFragmentDoc, deleteUsersByPk), true);
    },
    async createSession(data) {
      const { insertSessionsOne } = await c.run(CreateSessionDocument, {
        data: format.to<any>(data),
      });

      return format.from(useFragment(SessionFragmentFragmentDoc, insertSessionsOne), true);
    },
    async getSessionAndUser(sessionToken) {
      const { sessions } = await c.run(GetSessionAndUserDocument, {
        sessionToken,
      });
      const sessionAndUser = sessions?.[0];
      if (!sessionAndUser) return null;

      const { user, ...session } = sessionAndUser;

      const returnData: Awaited<ReturnType<Adapter['getSessionAndUser']>> = {
        session: format.from(useFragment(SessionFragmentFragmentDoc, session), true),
        user: format.from(useFragment(UserFragmentFragmentDoc, user), true),
      };

      return {
        ...returnData,
        user: {
          ...returnData.user,
          // @ts-expect-error It doesn't recognize this for some reason
          hasActiveSubscription: !!returnData.user?.subscriptions?.length,
        },
      };
    },
    async updateSession({ sessionToken, ...data }) {
      const { updateSessions } = await c.run(UpdateSessionDocument, {
        sessionToken,
        data: format.to<any>(data),
      });
      const session = updateSessions?.returning?.[0];

      return format.from(useFragment(SessionFragmentFragmentDoc, session));
    },
    async deleteSession(sessionToken) {
      const { deleteSessions } = await c.run(DeleteSessionDocument, {
        sessionToken,
      });
      const session = deleteSessions?.returning?.[0];

      return format.from<any>(useFragment(SessionFragmentFragmentDoc, session));
    },
    async linkAccount(data) {
      const { insertAccountsOne } = await c.run(CreateAccountDocument, {
        data,
      });

      return useFragment(AccountFragmentFragmentDoc, insertAccountsOne) as any;
    },
    async unlinkAccount(params) {
      const { deleteAccounts } = await c.run(DeleteAccountDocument, params);
      const account = deleteAccounts?.returning[0];

      return useFragment(AccountFragmentFragmentDoc, account) as any;
    },
    async createVerificationToken(data) {
      const { insertVerificationTokensOne } = await c.run(CreateVerificationTokenDocument, {
        data: format.to<any>(data),
      });

      return format.from(
        useFragment(VerificationTokenFragmentFragmentDoc, insertVerificationTokensOne),
      );
    },
    async useVerificationToken(params) {
      const { deleteVerificationTokens } = await c.run(DeleteVerificationTokenDocument, params);
      const verificationToken = deleteVerificationTokens?.returning?.[0];

      return format.from(useFragment(VerificationTokenFragmentFragmentDoc, verificationToken));
    },
  };
}

export const format = {
  from<T, B extends boolean = false>(
    object?: Record<string, any> | null | undefined,
    throwIfNullish?: B,
  ): B extends true ? T : T | null {
    if (!object) {
      if (throwIfNullish) throw new Error('Object is nullish');
      return null as any;
    }

    const newObject: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(object))
      newObject[key] = isDate(value) ? new Date(value) : value;

    return newObject as T;
  },
  to<T>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(object))
      newObject[key] = value instanceof Date ? value.toISOString() : value;

    return newObject as T;
  },
};
