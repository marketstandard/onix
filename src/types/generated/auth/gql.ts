/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation CreateUser($data: UsersInsertInput!) {\n    insertUsersOne(object: $data) {\n      ...UserFragment\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query GetUser($id: uuid!) {\n    usersByPk(id: $id) {\n      ...UserFragment\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query GetUsers($where: UsersBoolExp!) {\n    users(where: $where) {\n      ...UserFragment\n    }\n  }\n':
    types.GetUsersDocument,
  '\n  mutation UpdateUser($id: uuid!, $data: UsersSetInput!) {\n    updateUsersByPk(pkColumns: { id: $id }, _set: $data) {\n      ...UserFragment\n    }\n  }\n':
    types.UpdateUserDocument,
  '\n  mutation DeleteUser($id: uuid!) {\n    deleteUsersByPk(id: $id) {\n      ...UserFragment\n    }\n  }\n':
    types.DeleteUserDocument,
  '\n  mutation CreateSession($data: SessionsInsertInput!) {\n    insertSessionsOne(object: $data) {\n      ...SessionFragment\n    }\n  }\n':
    types.CreateSessionDocument,
  '\n  query GetSessionAndUser($sessionToken: String!) {\n    sessions(where: { sessionToken: { _eq: $sessionToken } }) {\n      ...SessionFragment\n      user {\n        ...UserFragment\n      }\n    }\n  }\n':
    types.GetSessionAndUserDocument,
  '\n  mutation UpdateSession($sessionToken: String!, $data: SessionsSetInput!) {\n    updateSessions(where: { sessionToken: { _eq: $sessionToken } }, _set: $data) {\n      returning {\n        ...SessionFragment\n      }\n    }\n  }\n':
    types.UpdateSessionDocument,
  '\n  mutation DeleteSession($sessionToken: String!) {\n    deleteSessions(where: { sessionToken: { _eq: $sessionToken } }) {\n      returning {\n        ...SessionFragment\n      }\n    }\n  }\n':
    types.DeleteSessionDocument,
  '\n  mutation CreateAccount($data: AccountsInsertInput!) {\n    insertAccountsOne(object: $data) {\n      ...AccountFragment\n    }\n  }\n':
    types.CreateAccountDocument,
  '\n  mutation DeleteAccount($provider: String!, $providerAccountId: String!) {\n    deleteAccounts(\n      where: { provider: { _eq: $provider }, providerAccountId: { _eq: $providerAccountId } }\n    ) {\n      returning {\n        ...AccountFragment\n      }\n    }\n  }\n':
    types.DeleteAccountDocument,
  '\n  mutation CreateVerificationToken($data: VerificationTokensInsertInput!) {\n    insertVerificationTokensOne(object: $data) {\n      ...VerificationTokenFragment\n    }\n  }\n':
    types.CreateVerificationTokenDocument,
  '\n  mutation DeleteVerificationToken($identifier: String!, $token: String!) {\n    deleteVerificationTokens(where: { identifier: { _eq: $identifier }, token: { _eq: $token } }) {\n      returning {\n        ...VerificationTokenFragment\n      }\n    }\n  }\n':
    types.DeleteVerificationTokenDocument,
  '\n  fragment UserFragment on Users {\n    id\n    email\n    name\n    image\n    stripeCustomerId\n    subscriptions(\n      where: { _or: [{ status: { _eq: TRIALING } }], currentPeriodEnd: { _gt: "now()" } }\n    ) {\n      id\n      status\n      currentPeriodEnd\n    }\n  }\n':
    types.UserFragmentFragmentDoc,
  '\n  fragment SessionFragment on Sessions {\n    id\n    sessionToken\n    userId\n    expires\n  }\n':
    types.SessionFragmentFragmentDoc,
  '\n  fragment AccountFragment on Accounts {\n    id\n    userId\n    provider\n    providerAccountId\n  }\n':
    types.AccountFragmentFragmentDoc,
  '\n  fragment VerificationTokenFragment on VerificationTokens {\n    identifier\n    token\n    expires\n  }\n':
    types.VerificationTokenFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUser($data: UsersInsertInput!) {\n    insertUsersOne(object: $data) {\n      ...UserFragment\n    }\n  }\n',
): typeof import('./graphql.js').CreateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUser($id: uuid!) {\n    usersByPk(id: $id) {\n      ...UserFragment\n    }\n  }\n',
): typeof import('./graphql.js').GetUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUsers($where: UsersBoolExp!) {\n    users(where: $where) {\n      ...UserFragment\n    }\n  }\n',
): typeof import('./graphql.js').GetUsersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateUser($id: uuid!, $data: UsersSetInput!) {\n    updateUsersByPk(pkColumns: { id: $id }, _set: $data) {\n      ...UserFragment\n    }\n  }\n',
): typeof import('./graphql.js').UpdateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteUser($id: uuid!) {\n    deleteUsersByPk(id: $id) {\n      ...UserFragment\n    }\n  }\n',
): typeof import('./graphql.js').DeleteUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateSession($data: SessionsInsertInput!) {\n    insertSessionsOne(object: $data) {\n      ...SessionFragment\n    }\n  }\n',
): typeof import('./graphql.js').CreateSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetSessionAndUser($sessionToken: String!) {\n    sessions(where: { sessionToken: { _eq: $sessionToken } }) {\n      ...SessionFragment\n      user {\n        ...UserFragment\n      }\n    }\n  }\n',
): typeof import('./graphql.js').GetSessionAndUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateSession($sessionToken: String!, $data: SessionsSetInput!) {\n    updateSessions(where: { sessionToken: { _eq: $sessionToken } }, _set: $data) {\n      returning {\n        ...SessionFragment\n      }\n    }\n  }\n',
): typeof import('./graphql.js').UpdateSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteSession($sessionToken: String!) {\n    deleteSessions(where: { sessionToken: { _eq: $sessionToken } }) {\n      returning {\n        ...SessionFragment\n      }\n    }\n  }\n',
): typeof import('./graphql.js').DeleteSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateAccount($data: AccountsInsertInput!) {\n    insertAccountsOne(object: $data) {\n      ...AccountFragment\n    }\n  }\n',
): typeof import('./graphql.js').CreateAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteAccount($provider: String!, $providerAccountId: String!) {\n    deleteAccounts(\n      where: { provider: { _eq: $provider }, providerAccountId: { _eq: $providerAccountId } }\n    ) {\n      returning {\n        ...AccountFragment\n      }\n    }\n  }\n',
): typeof import('./graphql.js').DeleteAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateVerificationToken($data: VerificationTokensInsertInput!) {\n    insertVerificationTokensOne(object: $data) {\n      ...VerificationTokenFragment\n    }\n  }\n',
): typeof import('./graphql.js').CreateVerificationTokenDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteVerificationToken($identifier: String!, $token: String!) {\n    deleteVerificationTokens(where: { identifier: { _eq: $identifier }, token: { _eq: $token } }) {\n      returning {\n        ...VerificationTokenFragment\n      }\n    }\n  }\n',
): typeof import('./graphql.js').DeleteVerificationTokenDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UserFragment on Users {\n    id\n    email\n    name\n    image\n    stripeCustomerId\n    subscriptions(\n      where: { _or: [{ status: { _eq: TRIALING } }], currentPeriodEnd: { _gt: "now()" } }\n    ) {\n      id\n      status\n      currentPeriodEnd\n    }\n  }\n',
): typeof import('./graphql.js').UserFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment SessionFragment on Sessions {\n    id\n    sessionToken\n    userId\n    expires\n  }\n',
): typeof import('./graphql.js').SessionFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AccountFragment on Accounts {\n    id\n    userId\n    provider\n    providerAccountId\n  }\n',
): typeof import('./graphql.js').AccountFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment VerificationTokenFragment on VerificationTokens {\n    identifier\n    token\n    expires\n  }\n',
): typeof import('./graphql.js').VerificationTokenFragmentFragmentDoc;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
