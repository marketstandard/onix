import { gql } from '@apollo/client';

gql`
  query getUsers {
    users {
      id
    }
  }
`;
