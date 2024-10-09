import { gql } from 'graphql-tag';

gql`
  mutation CreateUser($data: UsersInsertInput!) {
    insertUsersOne(object: $data) {
      ...UserFragment
    }
  }
`;

gql`
  query GetUser($id: uuid!) {
    usersByPk(id: $id) {
      ...UserFragment
    }
  }
`;

gql`
  query GetUsers($where: UsersBoolExp!) {
    users(where: $where) {
      ...UserFragment
    }
  }
`;

gql`
  mutation UpdateUser($id: uuid!, $data: UsersSetInput!) {
    updateUsersByPk(pkColumns: { id: $id }, _set: $data) {
      ...UserFragment
    }
  }
`;

gql`
  mutation DeleteUser($id: uuid!) {
    deleteUsersByPk(id: $id) {
      ...UserFragment
    }
  }
`;

gql`
  mutation CreateSession($data: SessionsInsertInput!) {
    insertSessionsOne(object: $data) {
      ...SessionFragment
    }
  }
`;

gql`
  query GetSessionAndUser($sessionToken: String!) {
    sessions(where: { sessionToken: { _eq: $sessionToken } }) {
      ...SessionFragment
      user {
        ...UserFragment
      }
    }
  }
`;

gql`
  mutation UpdateSession($sessionToken: String!, $data: SessionsSetInput!) {
    updateSessions(where: { sessionToken: { _eq: $sessionToken } }, _set: $data) {
      returning {
        ...SessionFragment
      }
    }
  }
`;

gql`
  mutation DeleteSession($sessionToken: String!) {
    deleteSessions(where: { sessionToken: { _eq: $sessionToken } }) {
      returning {
        ...SessionFragment
      }
    }
  }
`;

gql`
  mutation CreateAccount($data: AccountsInsertInput!) {
    insertAccountsOne(object: $data) {
      ...AccountFragment
    }
  }
`;

gql`
  mutation DeleteAccount($provider: String!, $providerAccountId: String!) {
    deleteAccounts(
      where: { provider: { _eq: $provider }, providerAccountId: { _eq: $providerAccountId } }
    ) {
      returning {
        ...AccountFragment
      }
    }
  }
`;

gql`
  mutation CreateVerificationToken($data: VerificationTokensInsertInput!) {
    insertVerificationTokensOne(object: $data) {
      ...VerificationTokenFragment
    }
  }
`;

gql`
  mutation DeleteVerificationToken($identifier: String!, $token: String!) {
    deleteVerificationTokens(where: { identifier: { _eq: $identifier }, token: { _eq: $token } }) {
      returning {
        ...VerificationTokenFragment
      }
    }
  }
`;

gql`
  fragment UserFragment on Users {
    id
    email
    name
    image
    stripeCustomerId
    subscriptions(
      where: { _or: [{ status: { _eq: TRIALING } }], currentPeriodEnd: { _gt: "now()" } }
    ) {
      id
      status
      currentPeriodEnd
    }
  }
`;

gql`
  fragment SessionFragment on Sessions {
    id
    sessionToken
    userId
    expires
  }
`;

gql`
  fragment AccountFragment on Accounts {
    id
    userId
    provider
    providerAccountId
  }
`;

gql`
  fragment VerificationTokenFragment on VerificationTokens {
    identifier
    token
    expires
  }
`;
