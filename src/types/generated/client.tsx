import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  jsonb: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** columns and relationships of "accounts" */
export type Accounts = {
  __typename?: 'Accounts';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  expiresAt?: Maybe<Scalars['Int']['output']>;
  id: Scalars['uuid']['output'];
  idToken?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  sessionState?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "accounts" */
export type AccountsAggregate = {
  __typename?: 'AccountsAggregate';
  aggregate?: Maybe<AccountsAggregateFields>;
  nodes: Array<Accounts>;
};

export type AccountsAggregateBoolExp = {
  count?: InputMaybe<AccountsAggregateBoolExpCount>;
};

/** aggregate fields of "accounts" */
export type AccountsAggregateFields = {
  __typename?: 'AccountsAggregateFields';
  avg?: Maybe<AccountsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<AccountsMaxFields>;
  min?: Maybe<AccountsMinFields>;
  stddev?: Maybe<AccountsStddevFields>;
  stddevPop?: Maybe<AccountsStddevPopFields>;
  stddevSamp?: Maybe<AccountsStddevSampFields>;
  sum?: Maybe<AccountsSumFields>;
  varPop?: Maybe<AccountsVarPopFields>;
  varSamp?: Maybe<AccountsVarSampFields>;
  variance?: Maybe<AccountsVarianceFields>;
};


/** aggregate fields of "accounts" */
export type AccountsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AccountsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "accounts" */
export type AccountsAggregateOrderBy = {
  avg?: InputMaybe<AccountsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<AccountsMaxOrderBy>;
  min?: InputMaybe<AccountsMinOrderBy>;
  stddev?: InputMaybe<AccountsStddevOrderBy>;
  stddevPop?: InputMaybe<AccountsStddevPopOrderBy>;
  stddevSamp?: InputMaybe<AccountsStddevSampOrderBy>;
  sum?: InputMaybe<AccountsSumOrderBy>;
  varPop?: InputMaybe<AccountsVarPopOrderBy>;
  varSamp?: InputMaybe<AccountsVarSampOrderBy>;
  variance?: InputMaybe<AccountsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "accounts" */
export type AccountsArrRelInsertInput = {
  data: Array<AccountsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<AccountsOnConflict>;
};

/** aggregate avg on columns */
export type AccountsAvgFields = {
  __typename?: 'AccountsAvgFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "accounts" */
export type AccountsAvgOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type AccountsBoolExp = {
  _and?: InputMaybe<Array<AccountsBoolExp>>;
  _not?: InputMaybe<AccountsBoolExp>;
  _or?: InputMaybe<Array<AccountsBoolExp>>;
  accessToken?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  expiresAt?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  idToken?: InputMaybe<StringComparisonExp>;
  provider?: InputMaybe<StringComparisonExp>;
  providerAccountId?: InputMaybe<StringComparisonExp>;
  refreshToken?: InputMaybe<StringComparisonExp>;
  scope?: InputMaybe<StringComparisonExp>;
  sessionState?: InputMaybe<StringComparisonExp>;
  tokenType?: InputMaybe<StringComparisonExp>;
  type?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "accounts" */
export enum AccountsConstraint {
  /** unique or primary key constraint on columns "id" */
  AccountsPkey = 'accounts_pkey'
}

/** input type for incrementing numeric columns in table "accounts" */
export type AccountsIncInput = {
  expiresAt?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "accounts" */
export type AccountsInsertInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expiresAt?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  idToken?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sessionState?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type AccountsMaxFields = {
  __typename?: 'AccountsMaxFields';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  expiresAt?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  idToken?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerAccountId?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  sessionState?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "accounts" */
export type AccountsMaxOrderBy = {
  accessToken?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  idToken?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  providerAccountId?: InputMaybe<OrderBy>;
  refreshToken?: InputMaybe<OrderBy>;
  scope?: InputMaybe<OrderBy>;
  sessionState?: InputMaybe<OrderBy>;
  tokenType?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type AccountsMinFields = {
  __typename?: 'AccountsMinFields';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  expiresAt?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  idToken?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerAccountId?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  sessionState?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "accounts" */
export type AccountsMinOrderBy = {
  accessToken?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  idToken?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  providerAccountId?: InputMaybe<OrderBy>;
  refreshToken?: InputMaybe<OrderBy>;
  scope?: InputMaybe<OrderBy>;
  sessionState?: InputMaybe<OrderBy>;
  tokenType?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "accounts" */
export type AccountsMutationResponse = {
  __typename?: 'AccountsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Accounts>;
};

/** on_conflict condition type for table "accounts" */
export type AccountsOnConflict = {
  constraint: AccountsConstraint;
  updateColumns?: Array<AccountsUpdateColumn>;
  where?: InputMaybe<AccountsBoolExp>;
};

/** Ordering options when selecting data from "accounts". */
export type AccountsOrderBy = {
  accessToken?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  expiresAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  idToken?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  providerAccountId?: InputMaybe<OrderBy>;
  refreshToken?: InputMaybe<OrderBy>;
  scope?: InputMaybe<OrderBy>;
  sessionState?: InputMaybe<OrderBy>;
  tokenType?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: accounts */
export type AccountsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "accounts" */
export enum AccountsSelectColumn {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  IdToken = 'idToken',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderAccountId = 'providerAccountId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  Scope = 'scope',
  /** column name */
  SessionState = 'sessionState',
  /** column name */
  TokenType = 'tokenType',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "accounts" */
export type AccountsSetInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expiresAt?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  idToken?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sessionState?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type AccountsStddevFields = {
  __typename?: 'AccountsStddevFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "accounts" */
export type AccountsStddevOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type AccountsStddevPopFields = {
  __typename?: 'AccountsStddevPopFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "accounts" */
export type AccountsStddevPopOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type AccountsStddevSampFields = {
  __typename?: 'AccountsStddevSampFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "accounts" */
export type AccountsStddevSampOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "accounts" */
export type AccountsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AccountsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AccountsStreamCursorValueInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expiresAt?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  idToken?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  sessionState?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type AccountsSumFields = {
  __typename?: 'AccountsSumFields';
  expiresAt?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "accounts" */
export type AccountsSumOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** update columns of table "accounts" */
export enum AccountsUpdateColumn {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  IdToken = 'idToken',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderAccountId = 'providerAccountId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  Scope = 'scope',
  /** column name */
  SessionState = 'sessionState',
  /** column name */
  TokenType = 'tokenType',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type AccountsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<AccountsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AccountsSetInput>;
  /** filter the rows which have to be updated */
  where: AccountsBoolExp;
};

/** aggregate varPop on columns */
export type AccountsVarPopFields = {
  __typename?: 'AccountsVarPopFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "accounts" */
export type AccountsVarPopOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type AccountsVarSampFields = {
  __typename?: 'AccountsVarSampFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "accounts" */
export type AccountsVarSampOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type AccountsVarianceFields = {
  __typename?: 'AccountsVarianceFields';
  expiresAt?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "accounts" */
export type AccountsVarianceOrderBy = {
  expiresAt?: InputMaybe<OrderBy>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "checkout_session_statuses" */
export type CheckoutSessionStatuses = {
  __typename?: 'CheckoutSessionStatuses';
  description?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** aggregated selection of "checkout_session_statuses" */
export type CheckoutSessionStatusesAggregate = {
  __typename?: 'CheckoutSessionStatusesAggregate';
  aggregate?: Maybe<CheckoutSessionStatusesAggregateFields>;
  nodes: Array<CheckoutSessionStatuses>;
};

/** aggregate fields of "checkout_session_statuses" */
export type CheckoutSessionStatusesAggregateFields = {
  __typename?: 'CheckoutSessionStatusesAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<CheckoutSessionStatusesMaxFields>;
  min?: Maybe<CheckoutSessionStatusesMinFields>;
};


/** aggregate fields of "checkout_session_statuses" */
export type CheckoutSessionStatusesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CheckoutSessionStatusesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "checkout_session_statuses". All fields are combined with a logical 'AND'. */
export type CheckoutSessionStatusesBoolExp = {
  _and?: InputMaybe<Array<CheckoutSessionStatusesBoolExp>>;
  _not?: InputMaybe<CheckoutSessionStatusesBoolExp>;
  _or?: InputMaybe<Array<CheckoutSessionStatusesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "checkout_session_statuses" */
export enum CheckoutSessionStatusesConstraint {
  /** unique or primary key constraint on columns "value" */
  CheckoutSessionStatusesPkey = 'checkout_session_statuses_pkey'
}

export enum CheckoutSessionStatusesEnum {
  Complete = 'COMPLETE',
  Expired = 'EXPIRED',
  Open = 'OPEN'
}

/** Boolean expression to compare columns of type "CheckoutSessionStatusesEnum". All fields are combined with logical 'AND'. */
export type CheckoutSessionStatusesEnumComparisonExp = {
  _eq?: InputMaybe<CheckoutSessionStatusesEnum>;
  _in?: InputMaybe<Array<CheckoutSessionStatusesEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<CheckoutSessionStatusesEnum>;
  _nin?: InputMaybe<Array<CheckoutSessionStatusesEnum>>;
};

/** input type for inserting data into table "checkout_session_statuses" */
export type CheckoutSessionStatusesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CheckoutSessionStatusesMaxFields = {
  __typename?: 'CheckoutSessionStatusesMaxFields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CheckoutSessionStatusesMinFields = {
  __typename?: 'CheckoutSessionStatusesMinFields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "checkout_session_statuses" */
export type CheckoutSessionStatusesMutationResponse = {
  __typename?: 'CheckoutSessionStatusesMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CheckoutSessionStatuses>;
};

/** on_conflict condition type for table "checkout_session_statuses" */
export type CheckoutSessionStatusesOnConflict = {
  constraint: CheckoutSessionStatusesConstraint;
  updateColumns?: Array<CheckoutSessionStatusesUpdateColumn>;
  where?: InputMaybe<CheckoutSessionStatusesBoolExp>;
};

/** Ordering options when selecting data from "checkout_session_statuses". */
export type CheckoutSessionStatusesOrderBy = {
  description?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: checkout_session_statuses */
export type CheckoutSessionStatusesPkColumnsInput = {
  value: Scalars['String']['input'];
};

/** select columns of table "checkout_session_statuses" */
export enum CheckoutSessionStatusesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "checkout_session_statuses" */
export type CheckoutSessionStatusesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "checkout_session_statuses" */
export type CheckoutSessionStatusesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: CheckoutSessionStatusesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CheckoutSessionStatusesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "checkout_session_statuses" */
export enum CheckoutSessionStatusesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type CheckoutSessionStatusesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CheckoutSessionStatusesSetInput>;
  /** filter the rows which have to be updated */
  where: CheckoutSessionStatusesBoolExp;
};

/** columns and relationships of "checkout_sessions" */
export type CheckoutSessions = {
  __typename?: 'CheckoutSessions';
  amountTotal?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  metadata?: Maybe<Scalars['jsonb']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  status: CheckoutSessionStatusesEnum;
  stripeCheckoutSessionId: Scalars['String']['output'];
  stripeCustomerId: Scalars['String']['output'];
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  subscription?: Maybe<Subscriptions>;
  subscriptionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};


/** columns and relationships of "checkout_sessions" */
export type CheckoutSessionsMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "checkout_sessions" */
export type CheckoutSessionsAggregate = {
  __typename?: 'CheckoutSessionsAggregate';
  aggregate?: Maybe<CheckoutSessionsAggregateFields>;
  nodes: Array<CheckoutSessions>;
};

export type CheckoutSessionsAggregateBoolExp = {
  count?: InputMaybe<CheckoutSessionsAggregateBoolExpCount>;
};

/** aggregate fields of "checkout_sessions" */
export type CheckoutSessionsAggregateFields = {
  __typename?: 'CheckoutSessionsAggregateFields';
  avg?: Maybe<CheckoutSessionsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CheckoutSessionsMaxFields>;
  min?: Maybe<CheckoutSessionsMinFields>;
  stddev?: Maybe<CheckoutSessionsStddevFields>;
  stddevPop?: Maybe<CheckoutSessionsStddevPopFields>;
  stddevSamp?: Maybe<CheckoutSessionsStddevSampFields>;
  sum?: Maybe<CheckoutSessionsSumFields>;
  varPop?: Maybe<CheckoutSessionsVarPopFields>;
  varSamp?: Maybe<CheckoutSessionsVarSampFields>;
  variance?: Maybe<CheckoutSessionsVarianceFields>;
};


/** aggregate fields of "checkout_sessions" */
export type CheckoutSessionsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "checkout_sessions" */
export type CheckoutSessionsAggregateOrderBy = {
  avg?: InputMaybe<CheckoutSessionsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CheckoutSessionsMaxOrderBy>;
  min?: InputMaybe<CheckoutSessionsMinOrderBy>;
  stddev?: InputMaybe<CheckoutSessionsStddevOrderBy>;
  stddevPop?: InputMaybe<CheckoutSessionsStddevPopOrderBy>;
  stddevSamp?: InputMaybe<CheckoutSessionsStddevSampOrderBy>;
  sum?: InputMaybe<CheckoutSessionsSumOrderBy>;
  varPop?: InputMaybe<CheckoutSessionsVarPopOrderBy>;
  varSamp?: InputMaybe<CheckoutSessionsVarSampOrderBy>;
  variance?: InputMaybe<CheckoutSessionsVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CheckoutSessionsAppendInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "checkout_sessions" */
export type CheckoutSessionsArrRelInsertInput = {
  data: Array<CheckoutSessionsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<CheckoutSessionsOnConflict>;
};

/** aggregate avg on columns */
export type CheckoutSessionsAvgFields = {
  __typename?: 'CheckoutSessionsAvgFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "checkout_sessions" */
export type CheckoutSessionsAvgOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "checkout_sessions". All fields are combined with a logical 'AND'. */
export type CheckoutSessionsBoolExp = {
  _and?: InputMaybe<Array<CheckoutSessionsBoolExp>>;
  _not?: InputMaybe<CheckoutSessionsBoolExp>;
  _or?: InputMaybe<Array<CheckoutSessionsBoolExp>>;
  amountTotal?: InputMaybe<IntComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  currency?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  metadata?: InputMaybe<JsonbComparisonExp>;
  mode?: InputMaybe<StringComparisonExp>;
  status?: InputMaybe<CheckoutSessionStatusesEnumComparisonExp>;
  stripeCheckoutSessionId?: InputMaybe<StringComparisonExp>;
  stripeCustomerId?: InputMaybe<StringComparisonExp>;
  stripeInvoiceId?: InputMaybe<StringComparisonExp>;
  stripeSubscriptionId?: InputMaybe<StringComparisonExp>;
  subscription?: InputMaybe<SubscriptionsBoolExp>;
  subscriptionId?: InputMaybe<UuidComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "checkout_sessions" */
export enum CheckoutSessionsConstraint {
  /** unique or primary key constraint on columns "id" */
  CheckoutSessionsPkey = 'checkout_sessions_pkey',
  /** unique or primary key constraint on columns "stripe_checkout_session_id" */
  CheckoutSessionsStripeCheckoutSessionIdKey = 'checkout_sessions_stripe_checkout_session_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CheckoutSessionsDeleteAtPathInput = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CheckoutSessionsDeleteElemInput = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CheckoutSessionsDeleteKeyInput = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "checkout_sessions" */
export type CheckoutSessionsIncInput = {
  amountTotal?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "checkout_sessions" */
export type CheckoutSessionsInsertInput = {
  amountTotal?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CheckoutSessionStatusesEnum>;
  stripeCheckoutSessionId?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  subscription?: InputMaybe<SubscriptionsObjRelInsertInput>;
  subscriptionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type CheckoutSessionsMaxFields = {
  __typename?: 'CheckoutSessionsMaxFields';
  amountTotal?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  stripeCheckoutSessionId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "checkout_sessions" */
export type CheckoutSessionsMaxOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  mode?: InputMaybe<OrderBy>;
  stripeCheckoutSessionId?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  stripeInvoiceId?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  subscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CheckoutSessionsMinFields = {
  __typename?: 'CheckoutSessionsMinFields';
  amountTotal?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  stripeCheckoutSessionId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "checkout_sessions" */
export type CheckoutSessionsMinOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  mode?: InputMaybe<OrderBy>;
  stripeCheckoutSessionId?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  stripeInvoiceId?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  subscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "checkout_sessions" */
export type CheckoutSessionsMutationResponse = {
  __typename?: 'CheckoutSessionsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CheckoutSessions>;
};

/** on_conflict condition type for table "checkout_sessions" */
export type CheckoutSessionsOnConflict = {
  constraint: CheckoutSessionsConstraint;
  updateColumns?: Array<CheckoutSessionsUpdateColumn>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};

/** Ordering options when selecting data from "checkout_sessions". */
export type CheckoutSessionsOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  metadata?: InputMaybe<OrderBy>;
  mode?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  stripeCheckoutSessionId?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  stripeInvoiceId?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  subscription?: InputMaybe<SubscriptionsOrderBy>;
  subscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: checkout_sessions */
export type CheckoutSessionsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CheckoutSessionsPrependInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "checkout_sessions" */
export enum CheckoutSessionsSelectColumn {
  /** column name */
  AmountTotal = 'amountTotal',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Currency = 'currency',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Mode = 'mode',
  /** column name */
  Status = 'status',
  /** column name */
  StripeCheckoutSessionId = 'stripeCheckoutSessionId',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  StripeInvoiceId = 'stripeInvoiceId',
  /** column name */
  StripeSubscriptionId = 'stripeSubscriptionId',
  /** column name */
  SubscriptionId = 'subscriptionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "checkout_sessions" */
export type CheckoutSessionsSetInput = {
  amountTotal?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CheckoutSessionStatusesEnum>;
  stripeCheckoutSessionId?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type CheckoutSessionsStddevFields = {
  __typename?: 'CheckoutSessionsStddevFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "checkout_sessions" */
export type CheckoutSessionsStddevOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type CheckoutSessionsStddevPopFields = {
  __typename?: 'CheckoutSessionsStddevPopFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "checkout_sessions" */
export type CheckoutSessionsStddevPopOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type CheckoutSessionsStddevSampFields = {
  __typename?: 'CheckoutSessionsStddevSampFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "checkout_sessions" */
export type CheckoutSessionsStddevSampOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "checkout_sessions" */
export type CheckoutSessionsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: CheckoutSessionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CheckoutSessionsStreamCursorValueInput = {
  amountTotal?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CheckoutSessionStatusesEnum>;
  stripeCheckoutSessionId?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type CheckoutSessionsSumFields = {
  __typename?: 'CheckoutSessionsSumFields';
  amountTotal?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "checkout_sessions" */
export type CheckoutSessionsSumOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** update columns of table "checkout_sessions" */
export enum CheckoutSessionsUpdateColumn {
  /** column name */
  AmountTotal = 'amountTotal',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Currency = 'currency',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Mode = 'mode',
  /** column name */
  Status = 'status',
  /** column name */
  StripeCheckoutSessionId = 'stripeCheckoutSessionId',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  StripeInvoiceId = 'stripeInvoiceId',
  /** column name */
  StripeSubscriptionId = 'stripeSubscriptionId',
  /** column name */
  SubscriptionId = 'subscriptionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type CheckoutSessionsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<CheckoutSessionsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<CheckoutSessionsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<CheckoutSessionsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<CheckoutSessionsDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CheckoutSessionsIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<CheckoutSessionsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CheckoutSessionsSetInput>;
  /** filter the rows which have to be updated */
  where: CheckoutSessionsBoolExp;
};

/** aggregate varPop on columns */
export type CheckoutSessionsVarPopFields = {
  __typename?: 'CheckoutSessionsVarPopFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "checkout_sessions" */
export type CheckoutSessionsVarPopOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type CheckoutSessionsVarSampFields = {
  __typename?: 'CheckoutSessionsVarSampFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "checkout_sessions" */
export type CheckoutSessionsVarSampOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CheckoutSessionsVarianceFields = {
  __typename?: 'CheckoutSessionsVarianceFields';
  amountTotal?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "checkout_sessions" */
export type CheckoutSessionsVarianceOrderBy = {
  amountTotal?: InputMaybe<OrderBy>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "invoice_statuses" */
export type InvoiceStatuses = {
  __typename?: 'InvoiceStatuses';
  description?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** aggregated selection of "invoice_statuses" */
export type InvoiceStatusesAggregate = {
  __typename?: 'InvoiceStatusesAggregate';
  aggregate?: Maybe<InvoiceStatusesAggregateFields>;
  nodes: Array<InvoiceStatuses>;
};

/** aggregate fields of "invoice_statuses" */
export type InvoiceStatusesAggregateFields = {
  __typename?: 'InvoiceStatusesAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<InvoiceStatusesMaxFields>;
  min?: Maybe<InvoiceStatusesMinFields>;
};


/** aggregate fields of "invoice_statuses" */
export type InvoiceStatusesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<InvoiceStatusesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "invoice_statuses". All fields are combined with a logical 'AND'. */
export type InvoiceStatusesBoolExp = {
  _and?: InputMaybe<Array<InvoiceStatusesBoolExp>>;
  _not?: InputMaybe<InvoiceStatusesBoolExp>;
  _or?: InputMaybe<Array<InvoiceStatusesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "invoice_statuses" */
export enum InvoiceStatusesConstraint {
  /** unique or primary key constraint on columns "value" */
  InvoiceStatusesPkey = 'invoice_statuses_pkey'
}

export enum InvoiceStatusesEnum {
  Draft = 'DRAFT',
  Open = 'OPEN',
  Paid = 'PAID',
  Uncollectible = 'UNCOLLECTIBLE',
  Void = 'VOID'
}

/** Boolean expression to compare columns of type "InvoiceStatusesEnum". All fields are combined with logical 'AND'. */
export type InvoiceStatusesEnumComparisonExp = {
  _eq?: InputMaybe<InvoiceStatusesEnum>;
  _in?: InputMaybe<Array<InvoiceStatusesEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<InvoiceStatusesEnum>;
  _nin?: InputMaybe<Array<InvoiceStatusesEnum>>;
};

/** input type for inserting data into table "invoice_statuses" */
export type InvoiceStatusesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type InvoiceStatusesMaxFields = {
  __typename?: 'InvoiceStatusesMaxFields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type InvoiceStatusesMinFields = {
  __typename?: 'InvoiceStatusesMinFields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "invoice_statuses" */
export type InvoiceStatusesMutationResponse = {
  __typename?: 'InvoiceStatusesMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<InvoiceStatuses>;
};

/** on_conflict condition type for table "invoice_statuses" */
export type InvoiceStatusesOnConflict = {
  constraint: InvoiceStatusesConstraint;
  updateColumns?: Array<InvoiceStatusesUpdateColumn>;
  where?: InputMaybe<InvoiceStatusesBoolExp>;
};

/** Ordering options when selecting data from "invoice_statuses". */
export type InvoiceStatusesOrderBy = {
  description?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: invoice_statuses */
export type InvoiceStatusesPkColumnsInput = {
  value: Scalars['String']['input'];
};

/** select columns of table "invoice_statuses" */
export enum InvoiceStatusesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "invoice_statuses" */
export type InvoiceStatusesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "invoice_statuses" */
export type InvoiceStatusesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: InvoiceStatusesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type InvoiceStatusesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "invoice_statuses" */
export enum InvoiceStatusesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type InvoiceStatusesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<InvoiceStatusesSetInput>;
  /** filter the rows which have to be updated */
  where: InvoiceStatusesBoolExp;
};

/** columns and relationships of "invoices" */
export type Invoices = {
  __typename?: 'Invoices';
  amountDue: Scalars['Int']['output'];
  amountPaid: Scalars['Int']['output'];
  amountRemaining: Scalars['Int']['output'];
  attemptCount: Scalars['Int']['output'];
  attempted: Scalars['Boolean']['output'];
  created: Scalars['timestamptz']['output'];
  createdAt: Scalars['timestamptz']['output'];
  dueDate?: Maybe<Scalars['timestamptz']['output']>;
  hostedInvoiceUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  invoicePdf?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  paid: Scalars['Boolean']['output'];
  status: InvoiceStatusesEnum;
  stripeInvoiceId: Scalars['String']['output'];
  /** An object relationship */
  subscription?: Maybe<Subscriptions>;
  subscriptionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};


/** columns and relationships of "invoices" */
export type InvoicesMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "invoices" */
export type InvoicesAggregate = {
  __typename?: 'InvoicesAggregate';
  aggregate?: Maybe<InvoicesAggregateFields>;
  nodes: Array<Invoices>;
};

export type InvoicesAggregateBoolExp = {
  bool_and?: InputMaybe<InvoicesAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<InvoicesAggregateBoolExpBool_Or>;
  count?: InputMaybe<InvoicesAggregateBoolExpCount>;
};

/** aggregate fields of "invoices" */
export type InvoicesAggregateFields = {
  __typename?: 'InvoicesAggregateFields';
  avg?: Maybe<InvoicesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<InvoicesMaxFields>;
  min?: Maybe<InvoicesMinFields>;
  stddev?: Maybe<InvoicesStddevFields>;
  stddevPop?: Maybe<InvoicesStddevPopFields>;
  stddevSamp?: Maybe<InvoicesStddevSampFields>;
  sum?: Maybe<InvoicesSumFields>;
  varPop?: Maybe<InvoicesVarPopFields>;
  varSamp?: Maybe<InvoicesVarSampFields>;
  variance?: Maybe<InvoicesVarianceFields>;
};


/** aggregate fields of "invoices" */
export type InvoicesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<InvoicesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invoices" */
export type InvoicesAggregateOrderBy = {
  avg?: InputMaybe<InvoicesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<InvoicesMaxOrderBy>;
  min?: InputMaybe<InvoicesMinOrderBy>;
  stddev?: InputMaybe<InvoicesStddevOrderBy>;
  stddevPop?: InputMaybe<InvoicesStddevPopOrderBy>;
  stddevSamp?: InputMaybe<InvoicesStddevSampOrderBy>;
  sum?: InputMaybe<InvoicesSumOrderBy>;
  varPop?: InputMaybe<InvoicesVarPopOrderBy>;
  varSamp?: InputMaybe<InvoicesVarSampOrderBy>;
  variance?: InputMaybe<InvoicesVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type InvoicesAppendInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "invoices" */
export type InvoicesArrRelInsertInput = {
  data: Array<InvoicesInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<InvoicesOnConflict>;
};

/** aggregate avg on columns */
export type InvoicesAvgFields = {
  __typename?: 'InvoicesAvgFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "invoices" */
export type InvoicesAvgOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "invoices". All fields are combined with a logical 'AND'. */
export type InvoicesBoolExp = {
  _and?: InputMaybe<Array<InvoicesBoolExp>>;
  _not?: InputMaybe<InvoicesBoolExp>;
  _or?: InputMaybe<Array<InvoicesBoolExp>>;
  amountDue?: InputMaybe<IntComparisonExp>;
  amountPaid?: InputMaybe<IntComparisonExp>;
  amountRemaining?: InputMaybe<IntComparisonExp>;
  attemptCount?: InputMaybe<IntComparisonExp>;
  attempted?: InputMaybe<BooleanComparisonExp>;
  created?: InputMaybe<TimestamptzComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  dueDate?: InputMaybe<TimestamptzComparisonExp>;
  hostedInvoiceUrl?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  invoicePdf?: InputMaybe<StringComparisonExp>;
  metadata?: InputMaybe<JsonbComparisonExp>;
  paid?: InputMaybe<BooleanComparisonExp>;
  status?: InputMaybe<InvoiceStatusesEnumComparisonExp>;
  stripeInvoiceId?: InputMaybe<StringComparisonExp>;
  subscription?: InputMaybe<SubscriptionsBoolExp>;
  subscriptionId?: InputMaybe<UuidComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "invoices" */
export enum InvoicesConstraint {
  /** unique or primary key constraint on columns "id" */
  InvoicesPkey = 'invoices_pkey',
  /** unique or primary key constraint on columns "stripe_invoice_id" */
  InvoicesStripeInvoiceIdKey = 'invoices_stripe_invoice_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type InvoicesDeleteAtPathInput = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type InvoicesDeleteElemInput = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type InvoicesDeleteKeyInput = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "invoices" */
export type InvoicesIncInput = {
  amountDue?: InputMaybe<Scalars['Int']['input']>;
  amountPaid?: InputMaybe<Scalars['Int']['input']>;
  amountRemaining?: InputMaybe<Scalars['Int']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "invoices" */
export type InvoicesInsertInput = {
  amountDue?: InputMaybe<Scalars['Int']['input']>;
  amountPaid?: InputMaybe<Scalars['Int']['input']>;
  amountRemaining?: InputMaybe<Scalars['Int']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  attempted?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['timestamptz']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  dueDate?: InputMaybe<Scalars['timestamptz']['input']>;
  hostedInvoiceUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invoicePdf?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<InvoiceStatusesEnum>;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  subscription?: InputMaybe<SubscriptionsObjRelInsertInput>;
  subscriptionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type InvoicesMaxFields = {
  __typename?: 'InvoicesMaxFields';
  amountDue?: Maybe<Scalars['Int']['output']>;
  amountPaid?: Maybe<Scalars['Int']['output']>;
  amountRemaining?: Maybe<Scalars['Int']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  created?: Maybe<Scalars['timestamptz']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  dueDate?: Maybe<Scalars['timestamptz']['output']>;
  hostedInvoiceUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invoicePdf?: Maybe<Scalars['String']['output']>;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "invoices" */
export type InvoicesMaxOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
  created?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  dueDate?: InputMaybe<OrderBy>;
  hostedInvoiceUrl?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoicePdf?: InputMaybe<OrderBy>;
  stripeInvoiceId?: InputMaybe<OrderBy>;
  subscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type InvoicesMinFields = {
  __typename?: 'InvoicesMinFields';
  amountDue?: Maybe<Scalars['Int']['output']>;
  amountPaid?: Maybe<Scalars['Int']['output']>;
  amountRemaining?: Maybe<Scalars['Int']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  created?: Maybe<Scalars['timestamptz']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  dueDate?: Maybe<Scalars['timestamptz']['output']>;
  hostedInvoiceUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invoicePdf?: Maybe<Scalars['String']['output']>;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "invoices" */
export type InvoicesMinOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
  created?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  dueDate?: InputMaybe<OrderBy>;
  hostedInvoiceUrl?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoicePdf?: InputMaybe<OrderBy>;
  stripeInvoiceId?: InputMaybe<OrderBy>;
  subscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "invoices" */
export type InvoicesMutationResponse = {
  __typename?: 'InvoicesMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invoices>;
};

/** on_conflict condition type for table "invoices" */
export type InvoicesOnConflict = {
  constraint: InvoicesConstraint;
  updateColumns?: Array<InvoicesUpdateColumn>;
  where?: InputMaybe<InvoicesBoolExp>;
};

/** Ordering options when selecting data from "invoices". */
export type InvoicesOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
  attempted?: InputMaybe<OrderBy>;
  created?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  dueDate?: InputMaybe<OrderBy>;
  hostedInvoiceUrl?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoicePdf?: InputMaybe<OrderBy>;
  metadata?: InputMaybe<OrderBy>;
  paid?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  stripeInvoiceId?: InputMaybe<OrderBy>;
  subscription?: InputMaybe<SubscriptionsOrderBy>;
  subscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: invoices */
export type InvoicesPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type InvoicesPrependInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "invoices" */
export enum InvoicesSelectColumn {
  /** column name */
  AmountDue = 'amountDue',
  /** column name */
  AmountPaid = 'amountPaid',
  /** column name */
  AmountRemaining = 'amountRemaining',
  /** column name */
  AttemptCount = 'attemptCount',
  /** column name */
  Attempted = 'attempted',
  /** column name */
  Created = 'created',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DueDate = 'dueDate',
  /** column name */
  HostedInvoiceUrl = 'hostedInvoiceUrl',
  /** column name */
  Id = 'id',
  /** column name */
  InvoicePdf = 'invoicePdf',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Paid = 'paid',
  /** column name */
  Status = 'status',
  /** column name */
  StripeInvoiceId = 'stripeInvoiceId',
  /** column name */
  SubscriptionId = 'subscriptionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** select "invoicesAggregateBoolExpBool_andArgumentsColumns" columns of table "invoices" */
export enum InvoicesSelectColumnInvoicesAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Attempted = 'attempted',
  /** column name */
  Paid = 'paid'
}

/** select "invoicesAggregateBoolExpBool_orArgumentsColumns" columns of table "invoices" */
export enum InvoicesSelectColumnInvoicesAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Attempted = 'attempted',
  /** column name */
  Paid = 'paid'
}

/** input type for updating data in table "invoices" */
export type InvoicesSetInput = {
  amountDue?: InputMaybe<Scalars['Int']['input']>;
  amountPaid?: InputMaybe<Scalars['Int']['input']>;
  amountRemaining?: InputMaybe<Scalars['Int']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  attempted?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['timestamptz']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  dueDate?: InputMaybe<Scalars['timestamptz']['input']>;
  hostedInvoiceUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invoicePdf?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<InvoiceStatusesEnum>;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type InvoicesStddevFields = {
  __typename?: 'InvoicesStddevFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "invoices" */
export type InvoicesStddevOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type InvoicesStddevPopFields = {
  __typename?: 'InvoicesStddevPopFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "invoices" */
export type InvoicesStddevPopOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type InvoicesStddevSampFields = {
  __typename?: 'InvoicesStddevSampFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "invoices" */
export type InvoicesStddevSampOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "invoices" */
export type InvoicesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: InvoicesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type InvoicesStreamCursorValueInput = {
  amountDue?: InputMaybe<Scalars['Int']['input']>;
  amountPaid?: InputMaybe<Scalars['Int']['input']>;
  amountRemaining?: InputMaybe<Scalars['Int']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  attempted?: InputMaybe<Scalars['Boolean']['input']>;
  created?: InputMaybe<Scalars['timestamptz']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  dueDate?: InputMaybe<Scalars['timestamptz']['input']>;
  hostedInvoiceUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invoicePdf?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<InvoiceStatusesEnum>;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type InvoicesSumFields = {
  __typename?: 'InvoicesSumFields';
  amountDue?: Maybe<Scalars['Int']['output']>;
  amountPaid?: Maybe<Scalars['Int']['output']>;
  amountRemaining?: Maybe<Scalars['Int']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "invoices" */
export type InvoicesSumOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** update columns of table "invoices" */
export enum InvoicesUpdateColumn {
  /** column name */
  AmountDue = 'amountDue',
  /** column name */
  AmountPaid = 'amountPaid',
  /** column name */
  AmountRemaining = 'amountRemaining',
  /** column name */
  AttemptCount = 'attemptCount',
  /** column name */
  Attempted = 'attempted',
  /** column name */
  Created = 'created',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DueDate = 'dueDate',
  /** column name */
  HostedInvoiceUrl = 'hostedInvoiceUrl',
  /** column name */
  Id = 'id',
  /** column name */
  InvoicePdf = 'invoicePdf',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Paid = 'paid',
  /** column name */
  Status = 'status',
  /** column name */
  StripeInvoiceId = 'stripeInvoiceId',
  /** column name */
  SubscriptionId = 'subscriptionId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type InvoicesUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<InvoicesAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<InvoicesDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<InvoicesDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<InvoicesDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<InvoicesIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<InvoicesPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<InvoicesSetInput>;
  /** filter the rows which have to be updated */
  where: InvoicesBoolExp;
};

/** aggregate varPop on columns */
export type InvoicesVarPopFields = {
  __typename?: 'InvoicesVarPopFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "invoices" */
export type InvoicesVarPopOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type InvoicesVarSampFields = {
  __typename?: 'InvoicesVarSampFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "invoices" */
export type InvoicesVarSampOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type InvoicesVarianceFields = {
  __typename?: 'InvoicesVarianceFields';
  amountDue?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  amountRemaining?: Maybe<Scalars['Float']['output']>;
  attemptCount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "invoices" */
export type InvoicesVarianceOrderBy = {
  amountDue?: InputMaybe<OrderBy>;
  amountPaid?: InputMaybe<OrderBy>;
  amountRemaining?: InputMaybe<OrderBy>;
  attemptCount?: InputMaybe<OrderBy>;
};

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _hasKey?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** columns and relationships of "provider_type" */
export type ProviderType = {
  __typename?: 'ProviderType';
  value: Scalars['String']['output'];
};

/** aggregated selection of "provider_type" */
export type ProviderTypeAggregate = {
  __typename?: 'ProviderTypeAggregate';
  aggregate?: Maybe<ProviderTypeAggregateFields>;
  nodes: Array<ProviderType>;
};

/** aggregate fields of "provider_type" */
export type ProviderTypeAggregateFields = {
  __typename?: 'ProviderTypeAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<ProviderTypeMaxFields>;
  min?: Maybe<ProviderTypeMinFields>;
};


/** aggregate fields of "provider_type" */
export type ProviderTypeAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ProviderTypeSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "provider_type". All fields are combined with a logical 'AND'. */
export type ProviderTypeBoolExp = {
  _and?: InputMaybe<Array<ProviderTypeBoolExp>>;
  _not?: InputMaybe<ProviderTypeBoolExp>;
  _or?: InputMaybe<Array<ProviderTypeBoolExp>>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "provider_type" */
export enum ProviderTypeConstraint {
  /** unique or primary key constraint on columns "value" */
  ProviderTypePkey = 'provider_type_pkey'
}

/** input type for inserting data into table "provider_type" */
export type ProviderTypeInsertInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type ProviderTypeMaxFields = {
  __typename?: 'ProviderTypeMaxFields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type ProviderTypeMinFields = {
  __typename?: 'ProviderTypeMinFields';
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "provider_type" */
export type ProviderTypeMutationResponse = {
  __typename?: 'ProviderTypeMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<ProviderType>;
};

/** on_conflict condition type for table "provider_type" */
export type ProviderTypeOnConflict = {
  constraint: ProviderTypeConstraint;
  updateColumns?: Array<ProviderTypeUpdateColumn>;
  where?: InputMaybe<ProviderTypeBoolExp>;
};

/** Ordering options when selecting data from "provider_type". */
export type ProviderTypeOrderBy = {
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: provider_type */
export type ProviderTypePkColumnsInput = {
  value: Scalars['String']['input'];
};

/** select columns of table "provider_type" */
export enum ProviderTypeSelectColumn {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "provider_type" */
export type ProviderTypeSetInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "provider_type" */
export type ProviderTypeStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ProviderTypeStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ProviderTypeStreamCursorValueInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "provider_type" */
export enum ProviderTypeUpdateColumn {
  /** column name */
  Value = 'value'
}

export type ProviderTypeUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ProviderTypeSetInput>;
  /** filter the rows which have to be updated */
  where: ProviderTypeBoolExp;
};

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'Sessions';
  createdAt: Scalars['timestamptz']['output'];
  expires: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  sessionToken: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "sessions" */
export type SessionsAggregate = {
  __typename?: 'SessionsAggregate';
  aggregate?: Maybe<SessionsAggregateFields>;
  nodes: Array<Sessions>;
};

export type SessionsAggregateBoolExp = {
  count?: InputMaybe<SessionsAggregateBoolExpCount>;
};

/** aggregate fields of "sessions" */
export type SessionsAggregateFields = {
  __typename?: 'SessionsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<SessionsMaxFields>;
  min?: Maybe<SessionsMinFields>;
};


/** aggregate fields of "sessions" */
export type SessionsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sessions" */
export type SessionsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SessionsMaxOrderBy>;
  min?: InputMaybe<SessionsMinOrderBy>;
};

/** input type for inserting array relation for remote table "sessions" */
export type SessionsArrRelInsertInput = {
  data: Array<SessionsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<SessionsOnConflict>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type SessionsBoolExp = {
  _and?: InputMaybe<Array<SessionsBoolExp>>;
  _not?: InputMaybe<SessionsBoolExp>;
  _or?: InputMaybe<Array<SessionsBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  expires?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  sessionToken?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "sessions" */
export enum SessionsConstraint {
  /** unique or primary key constraint on columns "session_token" */
  SessionsPkey = 'sessions_pkey'
}

/** input type for inserting data into table "sessions" */
export type SessionsInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expires?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type SessionsMaxFields = {
  __typename?: 'SessionsMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  expires?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  sessionToken?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "sessions" */
export type SessionsMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  expires?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  sessionToken?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SessionsMinFields = {
  __typename?: 'SessionsMinFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  expires?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  sessionToken?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "sessions" */
export type SessionsMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  expires?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  sessionToken?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "sessions" */
export type SessionsMutationResponse = {
  __typename?: 'SessionsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>;
};

/** on_conflict condition type for table "sessions" */
export type SessionsOnConflict = {
  constraint: SessionsConstraint;
  updateColumns?: Array<SessionsUpdateColumn>;
  where?: InputMaybe<SessionsBoolExp>;
};

/** Ordering options when selecting data from "sessions". */
export type SessionsOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  expires?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  sessionToken?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: sessions */
export type SessionsPkColumnsInput = {
  sessionToken: Scalars['String']['input'];
};

/** select columns of table "sessions" */
export enum SessionsSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'sessionToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "sessions" */
export type SessionsSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expires?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "sessions" */
export type SessionsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: SessionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SessionsStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expires?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "sessions" */
export enum SessionsUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expires = 'expires',
  /** column name */
  Id = 'id',
  /** column name */
  SessionToken = 'sessionToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type SessionsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SessionsSetInput>;
  /** filter the rows which have to be updated */
  where: SessionsBoolExp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "subscription_statuses" */
export type SubscriptionStatuses = {
  __typename?: 'SubscriptionStatuses';
  description?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** aggregated selection of "subscription_statuses" */
export type SubscriptionStatusesAggregate = {
  __typename?: 'SubscriptionStatusesAggregate';
  aggregate?: Maybe<SubscriptionStatusesAggregateFields>;
  nodes: Array<SubscriptionStatuses>;
};

/** aggregate fields of "subscription_statuses" */
export type SubscriptionStatusesAggregateFields = {
  __typename?: 'SubscriptionStatusesAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<SubscriptionStatusesMaxFields>;
  min?: Maybe<SubscriptionStatusesMinFields>;
};


/** aggregate fields of "subscription_statuses" */
export type SubscriptionStatusesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SubscriptionStatusesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "subscription_statuses". All fields are combined with a logical 'AND'. */
export type SubscriptionStatusesBoolExp = {
  _and?: InputMaybe<Array<SubscriptionStatusesBoolExp>>;
  _not?: InputMaybe<SubscriptionStatusesBoolExp>;
  _or?: InputMaybe<Array<SubscriptionStatusesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  value?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "subscription_statuses" */
export enum SubscriptionStatusesConstraint {
  /** unique or primary key constraint on columns "value" */
  SubscriptionStatusesPkey = 'subscription_statuses_pkey'
}

export enum SubscriptionStatusesEnum {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Incomplete = 'INCOMPLETE',
  IncompleteExpired = 'INCOMPLETE_EXPIRED',
  PastDue = 'PAST_DUE',
  Trialing = 'TRIALING',
  Unpaid = 'UNPAID'
}

/** Boolean expression to compare columns of type "SubscriptionStatusesEnum". All fields are combined with logical 'AND'. */
export type SubscriptionStatusesEnumComparisonExp = {
  _eq?: InputMaybe<SubscriptionStatusesEnum>;
  _in?: InputMaybe<Array<SubscriptionStatusesEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<SubscriptionStatusesEnum>;
  _nin?: InputMaybe<Array<SubscriptionStatusesEnum>>;
};

/** input type for inserting data into table "subscription_statuses" */
export type SubscriptionStatusesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SubscriptionStatusesMaxFields = {
  __typename?: 'SubscriptionStatusesMaxFields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type SubscriptionStatusesMinFields = {
  __typename?: 'SubscriptionStatusesMinFields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "subscription_statuses" */
export type SubscriptionStatusesMutationResponse = {
  __typename?: 'SubscriptionStatusesMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SubscriptionStatuses>;
};

/** on_conflict condition type for table "subscription_statuses" */
export type SubscriptionStatusesOnConflict = {
  constraint: SubscriptionStatusesConstraint;
  updateColumns?: Array<SubscriptionStatusesUpdateColumn>;
  where?: InputMaybe<SubscriptionStatusesBoolExp>;
};

/** Ordering options when selecting data from "subscription_statuses". */
export type SubscriptionStatusesOrderBy = {
  description?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: subscription_statuses */
export type SubscriptionStatusesPkColumnsInput = {
  value: Scalars['String']['input'];
};

/** select columns of table "subscription_statuses" */
export enum SubscriptionStatusesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "subscription_statuses" */
export type SubscriptionStatusesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "subscription_statuses" */
export type SubscriptionStatusesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: SubscriptionStatusesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SubscriptionStatusesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "subscription_statuses" */
export enum SubscriptionStatusesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type SubscriptionStatusesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SubscriptionStatusesSetInput>;
  /** filter the rows which have to be updated */
  where: SubscriptionStatusesBoolExp;
};

/** columns and relationships of "subscriptions" */
export type Subscriptions = {
  __typename?: 'Subscriptions';
  cancelAtPeriodEnd?: Maybe<Scalars['Boolean']['output']>;
  canceledAt?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  checkoutSessions: Array<CheckoutSessions>;
  /** An aggregate relationship */
  checkoutSessionsAggregate: CheckoutSessionsAggregate;
  createdAt: Scalars['timestamptz']['output'];
  currentPeriodEnd: Scalars['timestamptz']['output'];
  currentPeriodStart: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An array relationship */
  invoices: Array<Invoices>;
  /** An aggregate relationship */
  invoicesAggregate: InvoicesAggregate;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  startDate: Scalars['timestamptz']['output'];
  status: SubscriptionStatusesEnum;
  stripeSubscriptionId: Scalars['String']['output'];
  trialEnd?: Maybe<Scalars['timestamptz']['output']>;
  trialStart?: Maybe<Scalars['timestamptz']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};


/** columns and relationships of "subscriptions" */
export type SubscriptionsCheckoutSessionsArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


/** columns and relationships of "subscriptions" */
export type SubscriptionsCheckoutSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


/** columns and relationships of "subscriptions" */
export type SubscriptionsInvoicesArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


/** columns and relationships of "subscriptions" */
export type SubscriptionsInvoicesAggregateArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


/** columns and relationships of "subscriptions" */
export type SubscriptionsMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "subscriptions" */
export type SubscriptionsAggregate = {
  __typename?: 'SubscriptionsAggregate';
  aggregate?: Maybe<SubscriptionsAggregateFields>;
  nodes: Array<Subscriptions>;
};

export type SubscriptionsAggregateBoolExp = {
  bool_and?: InputMaybe<SubscriptionsAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<SubscriptionsAggregateBoolExpBool_Or>;
  count?: InputMaybe<SubscriptionsAggregateBoolExpCount>;
};

/** aggregate fields of "subscriptions" */
export type SubscriptionsAggregateFields = {
  __typename?: 'SubscriptionsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<SubscriptionsMaxFields>;
  min?: Maybe<SubscriptionsMinFields>;
};


/** aggregate fields of "subscriptions" */
export type SubscriptionsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "subscriptions" */
export type SubscriptionsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SubscriptionsMaxOrderBy>;
  min?: InputMaybe<SubscriptionsMinOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type SubscriptionsAppendInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "subscriptions" */
export type SubscriptionsArrRelInsertInput = {
  data: Array<SubscriptionsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<SubscriptionsOnConflict>;
};

/** Boolean expression to filter rows from the table "subscriptions". All fields are combined with a logical 'AND'. */
export type SubscriptionsBoolExp = {
  _and?: InputMaybe<Array<SubscriptionsBoolExp>>;
  _not?: InputMaybe<SubscriptionsBoolExp>;
  _or?: InputMaybe<Array<SubscriptionsBoolExp>>;
  cancelAtPeriodEnd?: InputMaybe<BooleanComparisonExp>;
  canceledAt?: InputMaybe<TimestamptzComparisonExp>;
  checkoutSessions?: InputMaybe<CheckoutSessionsBoolExp>;
  checkoutSessionsAggregate?: InputMaybe<CheckoutSessionsAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  currentPeriodEnd?: InputMaybe<TimestamptzComparisonExp>;
  currentPeriodStart?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  invoices?: InputMaybe<InvoicesBoolExp>;
  invoicesAggregate?: InputMaybe<InvoicesAggregateBoolExp>;
  metadata?: InputMaybe<JsonbComparisonExp>;
  startDate?: InputMaybe<TimestamptzComparisonExp>;
  status?: InputMaybe<SubscriptionStatusesEnumComparisonExp>;
  stripeSubscriptionId?: InputMaybe<StringComparisonExp>;
  trialEnd?: InputMaybe<TimestamptzComparisonExp>;
  trialStart?: InputMaybe<TimestamptzComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "subscriptions" */
export enum SubscriptionsConstraint {
  /** unique or primary key constraint on columns "id" */
  SubscriptionsPkey = 'subscriptions_pkey',
  /** unique or primary key constraint on columns "stripe_subscription_id" */
  SubscriptionsStripeSubscriptionIdKey = 'subscriptions_stripe_subscription_id_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type SubscriptionsDeleteAtPathInput = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type SubscriptionsDeleteElemInput = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type SubscriptionsDeleteKeyInput = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "subscriptions" */
export type SubscriptionsInsertInput = {
  cancelAtPeriodEnd?: InputMaybe<Scalars['Boolean']['input']>;
  canceledAt?: InputMaybe<Scalars['timestamptz']['input']>;
  checkoutSessions?: InputMaybe<CheckoutSessionsArrRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currentPeriodEnd?: InputMaybe<Scalars['timestamptz']['input']>;
  currentPeriodStart?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invoices?: InputMaybe<InvoicesArrRelInsertInput>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  startDate?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<SubscriptionStatusesEnum>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  trialEnd?: InputMaybe<Scalars['timestamptz']['input']>;
  trialStart?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type SubscriptionsMaxFields = {
  __typename?: 'SubscriptionsMaxFields';
  canceledAt?: Maybe<Scalars['timestamptz']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  currentPeriodEnd?: Maybe<Scalars['timestamptz']['output']>;
  currentPeriodStart?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  startDate?: Maybe<Scalars['timestamptz']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  trialEnd?: Maybe<Scalars['timestamptz']['output']>;
  trialStart?: Maybe<Scalars['timestamptz']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "subscriptions" */
export type SubscriptionsMaxOrderBy = {
  canceledAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  currentPeriodEnd?: InputMaybe<OrderBy>;
  currentPeriodStart?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  startDate?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  trialEnd?: InputMaybe<OrderBy>;
  trialStart?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SubscriptionsMinFields = {
  __typename?: 'SubscriptionsMinFields';
  canceledAt?: Maybe<Scalars['timestamptz']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  currentPeriodEnd?: Maybe<Scalars['timestamptz']['output']>;
  currentPeriodStart?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  startDate?: Maybe<Scalars['timestamptz']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  trialEnd?: Maybe<Scalars['timestamptz']['output']>;
  trialStart?: Maybe<Scalars['timestamptz']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "subscriptions" */
export type SubscriptionsMinOrderBy = {
  canceledAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  currentPeriodEnd?: InputMaybe<OrderBy>;
  currentPeriodStart?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  startDate?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  trialEnd?: InputMaybe<OrderBy>;
  trialStart?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "subscriptions" */
export type SubscriptionsMutationResponse = {
  __typename?: 'SubscriptionsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Subscriptions>;
};

/** input type for inserting object relation for remote table "subscriptions" */
export type SubscriptionsObjRelInsertInput = {
  data: SubscriptionsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<SubscriptionsOnConflict>;
};

/** on_conflict condition type for table "subscriptions" */
export type SubscriptionsOnConflict = {
  constraint: SubscriptionsConstraint;
  updateColumns?: Array<SubscriptionsUpdateColumn>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};

/** Ordering options when selecting data from "subscriptions". */
export type SubscriptionsOrderBy = {
  cancelAtPeriodEnd?: InputMaybe<OrderBy>;
  canceledAt?: InputMaybe<OrderBy>;
  checkoutSessionsAggregate?: InputMaybe<CheckoutSessionsAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  currentPeriodEnd?: InputMaybe<OrderBy>;
  currentPeriodStart?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoicesAggregate?: InputMaybe<InvoicesAggregateOrderBy>;
  metadata?: InputMaybe<OrderBy>;
  startDate?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  trialEnd?: InputMaybe<OrderBy>;
  trialStart?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: subscriptions */
export type SubscriptionsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type SubscriptionsPrependInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "subscriptions" */
export enum SubscriptionsSelectColumn {
  /** column name */
  CancelAtPeriodEnd = 'cancelAtPeriodEnd',
  /** column name */
  CanceledAt = 'canceledAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentPeriodEnd = 'currentPeriodEnd',
  /** column name */
  CurrentPeriodStart = 'currentPeriodStart',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  StartDate = 'startDate',
  /** column name */
  Status = 'status',
  /** column name */
  StripeSubscriptionId = 'stripeSubscriptionId',
  /** column name */
  TrialEnd = 'trialEnd',
  /** column name */
  TrialStart = 'trialStart',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** select "subscriptionsAggregateBoolExpBool_andArgumentsColumns" columns of table "subscriptions" */
export enum SubscriptionsSelectColumnSubscriptionsAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  CancelAtPeriodEnd = 'cancelAtPeriodEnd'
}

/** select "subscriptionsAggregateBoolExpBool_orArgumentsColumns" columns of table "subscriptions" */
export enum SubscriptionsSelectColumnSubscriptionsAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  CancelAtPeriodEnd = 'cancelAtPeriodEnd'
}

/** input type for updating data in table "subscriptions" */
export type SubscriptionsSetInput = {
  cancelAtPeriodEnd?: InputMaybe<Scalars['Boolean']['input']>;
  canceledAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currentPeriodEnd?: InputMaybe<Scalars['timestamptz']['input']>;
  currentPeriodStart?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  startDate?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<SubscriptionStatusesEnum>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  trialEnd?: InputMaybe<Scalars['timestamptz']['input']>;
  trialStart?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "subscriptions" */
export type SubscriptionsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: SubscriptionsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SubscriptionsStreamCursorValueInput = {
  cancelAtPeriodEnd?: InputMaybe<Scalars['Boolean']['input']>;
  canceledAt?: InputMaybe<Scalars['timestamptz']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currentPeriodEnd?: InputMaybe<Scalars['timestamptz']['input']>;
  currentPeriodStart?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  startDate?: InputMaybe<Scalars['timestamptz']['input']>;
  status?: InputMaybe<SubscriptionStatusesEnum>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  trialEnd?: InputMaybe<Scalars['timestamptz']['input']>;
  trialStart?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "subscriptions" */
export enum SubscriptionsUpdateColumn {
  /** column name */
  CancelAtPeriodEnd = 'cancelAtPeriodEnd',
  /** column name */
  CanceledAt = 'canceledAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentPeriodEnd = 'currentPeriodEnd',
  /** column name */
  CurrentPeriodStart = 'currentPeriodStart',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  StartDate = 'startDate',
  /** column name */
  Status = 'status',
  /** column name */
  StripeSubscriptionId = 'stripeSubscriptionId',
  /** column name */
  TrialEnd = 'trialEnd',
  /** column name */
  TrialStart = 'trialStart',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type SubscriptionsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<SubscriptionsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<SubscriptionsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<SubscriptionsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<SubscriptionsDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<SubscriptionsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SubscriptionsSetInput>;
  /** filter the rows which have to be updated */
  where: SubscriptionsBoolExp;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accountsAggregate: AccountsAggregate;
  /** An array relationship */
  checkoutSessions: Array<CheckoutSessions>;
  /** An aggregate relationship */
  checkoutSessionsAggregate: CheckoutSessionsAggregate;
  createdAt: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  image?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  invoices: Array<Invoices>;
  /** An aggregate relationship */
  invoicesAggregate: InvoicesAggregate;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessionsAggregate: SessionsAggregate;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  subscriptions: Array<Subscriptions>;
  /** An aggregate relationship */
  subscriptionsAggregate: SubscriptionsAggregate;
  updatedAt: Scalars['timestamptz']['output'];
};


/** columns and relationships of "users" */
export type UsersAccountsArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersCheckoutSessionsArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersCheckoutSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersInvoicesArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersInvoicesAggregateArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersSessionsArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersSubscriptionsArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersSubscriptionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  accounts?: InputMaybe<AccountsBoolExp>;
  accountsAggregate?: InputMaybe<AccountsAggregateBoolExp>;
  checkoutSessions?: InputMaybe<CheckoutSessionsBoolExp>;
  checkoutSessionsAggregate?: InputMaybe<CheckoutSessionsAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  emailVerified?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  image?: InputMaybe<StringComparisonExp>;
  invoices?: InputMaybe<InvoicesBoolExp>;
  invoicesAggregate?: InputMaybe<InvoicesAggregateBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
  sessions?: InputMaybe<SessionsBoolExp>;
  sessionsAggregate?: InputMaybe<SessionsAggregateBoolExp>;
  stripeCustomerId?: InputMaybe<StringComparisonExp>;
  subscriptions?: InputMaybe<SubscriptionsBoolExp>;
  subscriptionsAggregate?: InputMaybe<SubscriptionsAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "stripe_customer_id" */
  UsersStripeCustomerIdKey = 'users_stripe_customer_id_key'
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  accounts?: InputMaybe<AccountsArrRelInsertInput>;
  checkoutSessions?: InputMaybe<CheckoutSessionsArrRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  invoices?: InputMaybe<InvoicesArrRelInsertInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<SessionsArrRelInsertInput>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  subscriptions?: InputMaybe<SubscriptionsArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  updateColumns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  accountsAggregate?: InputMaybe<AccountsAggregateOrderBy>;
  checkoutSessionsAggregate?: InputMaybe<CheckoutSessionsAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  emailVerified?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image?: InputMaybe<OrderBy>;
  invoicesAggregate?: InputMaybe<InvoicesAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  sessionsAggregate?: InputMaybe<SessionsAggregateOrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  subscriptionsAggregate?: InputMaybe<SubscriptionsAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  StripeCustomerId = 'stripeCustomerId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "verification_tokens" */
export type VerificationTokens = {
  __typename?: 'VerificationTokens';
  expires: Scalars['timestamptz']['output'];
  identifier: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

/** aggregated selection of "verification_tokens" */
export type VerificationTokensAggregate = {
  __typename?: 'VerificationTokensAggregate';
  aggregate?: Maybe<VerificationTokensAggregateFields>;
  nodes: Array<VerificationTokens>;
};

/** aggregate fields of "verification_tokens" */
export type VerificationTokensAggregateFields = {
  __typename?: 'VerificationTokensAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<VerificationTokensMaxFields>;
  min?: Maybe<VerificationTokensMinFields>;
};


/** aggregate fields of "verification_tokens" */
export type VerificationTokensAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<VerificationTokensSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "verification_tokens". All fields are combined with a logical 'AND'. */
export type VerificationTokensBoolExp = {
  _and?: InputMaybe<Array<VerificationTokensBoolExp>>;
  _not?: InputMaybe<VerificationTokensBoolExp>;
  _or?: InputMaybe<Array<VerificationTokensBoolExp>>;
  expires?: InputMaybe<TimestamptzComparisonExp>;
  identifier?: InputMaybe<StringComparisonExp>;
  token?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "verification_tokens" */
export enum VerificationTokensConstraint {
  /** unique or primary key constraint on columns "token" */
  VerificationTokensPkey = 'verification_tokens_pkey'
}

/** input type for inserting data into table "verification_tokens" */
export type VerificationTokensInsertInput = {
  expires?: InputMaybe<Scalars['timestamptz']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type VerificationTokensMaxFields = {
  __typename?: 'VerificationTokensMaxFields';
  expires?: Maybe<Scalars['timestamptz']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type VerificationTokensMinFields = {
  __typename?: 'VerificationTokensMinFields';
  expires?: Maybe<Scalars['timestamptz']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "verification_tokens" */
export type VerificationTokensMutationResponse = {
  __typename?: 'VerificationTokensMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<VerificationTokens>;
};

/** on_conflict condition type for table "verification_tokens" */
export type VerificationTokensOnConflict = {
  constraint: VerificationTokensConstraint;
  updateColumns?: Array<VerificationTokensUpdateColumn>;
  where?: InputMaybe<VerificationTokensBoolExp>;
};

/** Ordering options when selecting data from "verification_tokens". */
export type VerificationTokensOrderBy = {
  expires?: InputMaybe<OrderBy>;
  identifier?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: verification_tokens */
export type VerificationTokensPkColumnsInput = {
  token: Scalars['String']['input'];
};

/** select columns of table "verification_tokens" */
export enum VerificationTokensSelectColumn {
  /** column name */
  Expires = 'expires',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Token = 'token'
}

/** input type for updating data in table "verification_tokens" */
export type VerificationTokensSetInput = {
  expires?: InputMaybe<Scalars['timestamptz']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "verification_tokens" */
export type VerificationTokensStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: VerificationTokensStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type VerificationTokensStreamCursorValueInput = {
  expires?: InputMaybe<Scalars['timestamptz']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "verification_tokens" */
export enum VerificationTokensUpdateColumn {
  /** column name */
  Expires = 'expires',
  /** column name */
  Identifier = 'identifier',
  /** column name */
  Token = 'token'
}

export type VerificationTokensUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<VerificationTokensSetInput>;
  /** filter the rows which have to be updated */
  where: VerificationTokensBoolExp;
};

export type AccountsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<AccountsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AccountsBoolExp>;
  predicate: IntComparisonExp;
};

export type CheckoutSessionsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CheckoutSessionsBoolExp>;
  predicate: IntComparisonExp;
};

export type InvoicesAggregateBoolExpBool_And = {
  arguments: InvoicesSelectColumnInvoicesAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<InvoicesBoolExp>;
  predicate: BooleanComparisonExp;
};

export type InvoicesAggregateBoolExpBool_Or = {
  arguments: InvoicesSelectColumnInvoicesAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<InvoicesBoolExp>;
  predicate: BooleanComparisonExp;
};

export type InvoicesAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<InvoicesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<InvoicesBoolExp>;
  predicate: IntComparisonExp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "accounts" */
  deleteAccounts?: Maybe<AccountsMutationResponse>;
  /** delete single row from the table: "accounts" */
  deleteAccountsByPk?: Maybe<Accounts>;
  /** delete data from the table: "checkout_session_statuses" */
  deleteCheckoutSessionStatuses?: Maybe<CheckoutSessionStatusesMutationResponse>;
  /** delete single row from the table: "checkout_session_statuses" */
  deleteCheckoutSessionStatusesByPk?: Maybe<CheckoutSessionStatuses>;
  /** delete data from the table: "checkout_sessions" */
  deleteCheckoutSessions?: Maybe<CheckoutSessionsMutationResponse>;
  /** delete single row from the table: "checkout_sessions" */
  deleteCheckoutSessionsByPk?: Maybe<CheckoutSessions>;
  /** delete data from the table: "invoice_statuses" */
  deleteInvoiceStatuses?: Maybe<InvoiceStatusesMutationResponse>;
  /** delete single row from the table: "invoice_statuses" */
  deleteInvoiceStatusesByPk?: Maybe<InvoiceStatuses>;
  /** delete data from the table: "invoices" */
  deleteInvoices?: Maybe<InvoicesMutationResponse>;
  /** delete single row from the table: "invoices" */
  deleteInvoicesByPk?: Maybe<Invoices>;
  /** delete data from the table: "provider_type" */
  deleteProviderType?: Maybe<ProviderTypeMutationResponse>;
  /** delete single row from the table: "provider_type" */
  deleteProviderTypeByPk?: Maybe<ProviderType>;
  /** delete data from the table: "sessions" */
  deleteSessions?: Maybe<SessionsMutationResponse>;
  /** delete single row from the table: "sessions" */
  deleteSessionsByPk?: Maybe<Sessions>;
  /** delete data from the table: "subscription_statuses" */
  deleteSubscriptionStatuses?: Maybe<SubscriptionStatusesMutationResponse>;
  /** delete single row from the table: "subscription_statuses" */
  deleteSubscriptionStatusesByPk?: Maybe<SubscriptionStatuses>;
  /** delete data from the table: "subscriptions" */
  deleteSubscriptions?: Maybe<SubscriptionsMutationResponse>;
  /** delete single row from the table: "subscriptions" */
  deleteSubscriptionsByPk?: Maybe<Subscriptions>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** delete data from the table: "verification_tokens" */
  deleteVerificationTokens?: Maybe<VerificationTokensMutationResponse>;
  /** delete single row from the table: "verification_tokens" */
  deleteVerificationTokensByPk?: Maybe<VerificationTokens>;
  /** insert data into the table: "accounts" */
  insertAccounts?: Maybe<AccountsMutationResponse>;
  /** insert a single row into the table: "accounts" */
  insertAccountsOne?: Maybe<Accounts>;
  /** insert data into the table: "checkout_session_statuses" */
  insertCheckoutSessionStatuses?: Maybe<CheckoutSessionStatusesMutationResponse>;
  /** insert a single row into the table: "checkout_session_statuses" */
  insertCheckoutSessionStatusesOne?: Maybe<CheckoutSessionStatuses>;
  /** insert data into the table: "checkout_sessions" */
  insertCheckoutSessions?: Maybe<CheckoutSessionsMutationResponse>;
  /** insert a single row into the table: "checkout_sessions" */
  insertCheckoutSessionsOne?: Maybe<CheckoutSessions>;
  /** insert data into the table: "invoice_statuses" */
  insertInvoiceStatuses?: Maybe<InvoiceStatusesMutationResponse>;
  /** insert a single row into the table: "invoice_statuses" */
  insertInvoiceStatusesOne?: Maybe<InvoiceStatuses>;
  /** insert data into the table: "invoices" */
  insertInvoices?: Maybe<InvoicesMutationResponse>;
  /** insert a single row into the table: "invoices" */
  insertInvoicesOne?: Maybe<Invoices>;
  /** insert data into the table: "provider_type" */
  insertProviderType?: Maybe<ProviderTypeMutationResponse>;
  /** insert a single row into the table: "provider_type" */
  insertProviderTypeOne?: Maybe<ProviderType>;
  /** insert data into the table: "sessions" */
  insertSessions?: Maybe<SessionsMutationResponse>;
  /** insert a single row into the table: "sessions" */
  insertSessionsOne?: Maybe<Sessions>;
  /** insert data into the table: "subscription_statuses" */
  insertSubscriptionStatuses?: Maybe<SubscriptionStatusesMutationResponse>;
  /** insert a single row into the table: "subscription_statuses" */
  insertSubscriptionStatusesOne?: Maybe<SubscriptionStatuses>;
  /** insert data into the table: "subscriptions" */
  insertSubscriptions?: Maybe<SubscriptionsMutationResponse>;
  /** insert a single row into the table: "subscriptions" */
  insertSubscriptionsOne?: Maybe<Subscriptions>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** insert data into the table: "verification_tokens" */
  insertVerificationTokens?: Maybe<VerificationTokensMutationResponse>;
  /** insert a single row into the table: "verification_tokens" */
  insertVerificationTokensOne?: Maybe<VerificationTokens>;
  /** update data of the table: "accounts" */
  updateAccounts?: Maybe<AccountsMutationResponse>;
  /** update single row of the table: "accounts" */
  updateAccountsByPk?: Maybe<Accounts>;
  /** update multiples rows of table: "accounts" */
  updateAccountsMany?: Maybe<Array<Maybe<AccountsMutationResponse>>>;
  /** update data of the table: "checkout_session_statuses" */
  updateCheckoutSessionStatuses?: Maybe<CheckoutSessionStatusesMutationResponse>;
  /** update single row of the table: "checkout_session_statuses" */
  updateCheckoutSessionStatusesByPk?: Maybe<CheckoutSessionStatuses>;
  /** update multiples rows of table: "checkout_session_statuses" */
  updateCheckoutSessionStatusesMany?: Maybe<Array<Maybe<CheckoutSessionStatusesMutationResponse>>>;
  /** update data of the table: "checkout_sessions" */
  updateCheckoutSessions?: Maybe<CheckoutSessionsMutationResponse>;
  /** update single row of the table: "checkout_sessions" */
  updateCheckoutSessionsByPk?: Maybe<CheckoutSessions>;
  /** update multiples rows of table: "checkout_sessions" */
  updateCheckoutSessionsMany?: Maybe<Array<Maybe<CheckoutSessionsMutationResponse>>>;
  /** update data of the table: "invoice_statuses" */
  updateInvoiceStatuses?: Maybe<InvoiceStatusesMutationResponse>;
  /** update single row of the table: "invoice_statuses" */
  updateInvoiceStatusesByPk?: Maybe<InvoiceStatuses>;
  /** update multiples rows of table: "invoice_statuses" */
  updateInvoiceStatusesMany?: Maybe<Array<Maybe<InvoiceStatusesMutationResponse>>>;
  /** update data of the table: "invoices" */
  updateInvoices?: Maybe<InvoicesMutationResponse>;
  /** update single row of the table: "invoices" */
  updateInvoicesByPk?: Maybe<Invoices>;
  /** update multiples rows of table: "invoices" */
  updateInvoicesMany?: Maybe<Array<Maybe<InvoicesMutationResponse>>>;
  /** update data of the table: "provider_type" */
  updateProviderType?: Maybe<ProviderTypeMutationResponse>;
  /** update single row of the table: "provider_type" */
  updateProviderTypeByPk?: Maybe<ProviderType>;
  /** update multiples rows of table: "provider_type" */
  updateProviderTypeMany?: Maybe<Array<Maybe<ProviderTypeMutationResponse>>>;
  /** update data of the table: "sessions" */
  updateSessions?: Maybe<SessionsMutationResponse>;
  /** update single row of the table: "sessions" */
  updateSessionsByPk?: Maybe<Sessions>;
  /** update multiples rows of table: "sessions" */
  updateSessionsMany?: Maybe<Array<Maybe<SessionsMutationResponse>>>;
  /** update data of the table: "subscription_statuses" */
  updateSubscriptionStatuses?: Maybe<SubscriptionStatusesMutationResponse>;
  /** update single row of the table: "subscription_statuses" */
  updateSubscriptionStatusesByPk?: Maybe<SubscriptionStatuses>;
  /** update multiples rows of table: "subscription_statuses" */
  updateSubscriptionStatusesMany?: Maybe<Array<Maybe<SubscriptionStatusesMutationResponse>>>;
  /** update data of the table: "subscriptions" */
  updateSubscriptions?: Maybe<SubscriptionsMutationResponse>;
  /** update single row of the table: "subscriptions" */
  updateSubscriptionsByPk?: Maybe<Subscriptions>;
  /** update multiples rows of table: "subscriptions" */
  updateSubscriptionsMany?: Maybe<Array<Maybe<SubscriptionsMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
  /** update data of the table: "verification_tokens" */
  updateVerificationTokens?: Maybe<VerificationTokensMutationResponse>;
  /** update single row of the table: "verification_tokens" */
  updateVerificationTokensByPk?: Maybe<VerificationTokens>;
  /** update multiples rows of table: "verification_tokens" */
  updateVerificationTokensMany?: Maybe<Array<Maybe<VerificationTokensMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteAccountsArgs = {
  where: AccountsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAccountsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCheckoutSessionStatusesArgs = {
  where: CheckoutSessionStatusesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCheckoutSessionStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteCheckoutSessionsArgs = {
  where: CheckoutSessionsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCheckoutSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteInvoiceStatusesArgs = {
  where: InvoiceStatusesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteInvoiceStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteInvoicesArgs = {
  where: InvoicesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteInvoicesByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteProviderTypeArgs = {
  where: ProviderTypeBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProviderTypeByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSessionsArgs = {
  where: SessionsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteSessionsByPkArgs = {
  sessionToken: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSubscriptionStatusesArgs = {
  where: SubscriptionStatusesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteSubscriptionStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSubscriptionsArgs = {
  where: SubscriptionsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteSubscriptionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteVerificationTokensArgs = {
  where: VerificationTokensBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteVerificationTokensByPkArgs = {
  token: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootInsertAccountsArgs = {
  objects: Array<AccountsInsertInput>;
  onConflict?: InputMaybe<AccountsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAccountsOneArgs = {
  object: AccountsInsertInput;
  onConflict?: InputMaybe<AccountsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCheckoutSessionStatusesArgs = {
  objects: Array<CheckoutSessionStatusesInsertInput>;
  onConflict?: InputMaybe<CheckoutSessionStatusesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCheckoutSessionStatusesOneArgs = {
  object: CheckoutSessionStatusesInsertInput;
  onConflict?: InputMaybe<CheckoutSessionStatusesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCheckoutSessionsArgs = {
  objects: Array<CheckoutSessionsInsertInput>;
  onConflict?: InputMaybe<CheckoutSessionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCheckoutSessionsOneArgs = {
  object: CheckoutSessionsInsertInput;
  onConflict?: InputMaybe<CheckoutSessionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertInvoiceStatusesArgs = {
  objects: Array<InvoiceStatusesInsertInput>;
  onConflict?: InputMaybe<InvoiceStatusesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertInvoiceStatusesOneArgs = {
  object: InvoiceStatusesInsertInput;
  onConflict?: InputMaybe<InvoiceStatusesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertInvoicesArgs = {
  objects: Array<InvoicesInsertInput>;
  onConflict?: InputMaybe<InvoicesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertInvoicesOneArgs = {
  object: InvoicesInsertInput;
  onConflict?: InputMaybe<InvoicesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProviderTypeArgs = {
  objects: Array<ProviderTypeInsertInput>;
  onConflict?: InputMaybe<ProviderTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProviderTypeOneArgs = {
  object: ProviderTypeInsertInput;
  onConflict?: InputMaybe<ProviderTypeOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSessionsArgs = {
  objects: Array<SessionsInsertInput>;
  onConflict?: InputMaybe<SessionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSessionsOneArgs = {
  object: SessionsInsertInput;
  onConflict?: InputMaybe<SessionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSubscriptionStatusesArgs = {
  objects: Array<SubscriptionStatusesInsertInput>;
  onConflict?: InputMaybe<SubscriptionStatusesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSubscriptionStatusesOneArgs = {
  object: SubscriptionStatusesInsertInput;
  onConflict?: InputMaybe<SubscriptionStatusesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSubscriptionsArgs = {
  objects: Array<SubscriptionsInsertInput>;
  onConflict?: InputMaybe<SubscriptionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSubscriptionsOneArgs = {
  object: SubscriptionsInsertInput;
  onConflict?: InputMaybe<SubscriptionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertVerificationTokensArgs = {
  objects: Array<VerificationTokensInsertInput>;
  onConflict?: InputMaybe<VerificationTokensOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertVerificationTokensOneArgs = {
  object: VerificationTokensInsertInput;
  onConflict?: InputMaybe<VerificationTokensOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateAccountsArgs = {
  _inc?: InputMaybe<AccountsIncInput>;
  _set?: InputMaybe<AccountsSetInput>;
  where: AccountsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAccountsByPkArgs = {
  _inc?: InputMaybe<AccountsIncInput>;
  _set?: InputMaybe<AccountsSetInput>;
  pkColumns: AccountsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAccountsManyArgs = {
  updates: Array<AccountsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCheckoutSessionStatusesArgs = {
  _set?: InputMaybe<CheckoutSessionStatusesSetInput>;
  where: CheckoutSessionStatusesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCheckoutSessionStatusesByPkArgs = {
  _set?: InputMaybe<CheckoutSessionStatusesSetInput>;
  pkColumns: CheckoutSessionStatusesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCheckoutSessionStatusesManyArgs = {
  updates: Array<CheckoutSessionStatusesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCheckoutSessionsArgs = {
  _append?: InputMaybe<CheckoutSessionsAppendInput>;
  _deleteAtPath?: InputMaybe<CheckoutSessionsDeleteAtPathInput>;
  _deleteElem?: InputMaybe<CheckoutSessionsDeleteElemInput>;
  _deleteKey?: InputMaybe<CheckoutSessionsDeleteKeyInput>;
  _inc?: InputMaybe<CheckoutSessionsIncInput>;
  _prepend?: InputMaybe<CheckoutSessionsPrependInput>;
  _set?: InputMaybe<CheckoutSessionsSetInput>;
  where: CheckoutSessionsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCheckoutSessionsByPkArgs = {
  _append?: InputMaybe<CheckoutSessionsAppendInput>;
  _deleteAtPath?: InputMaybe<CheckoutSessionsDeleteAtPathInput>;
  _deleteElem?: InputMaybe<CheckoutSessionsDeleteElemInput>;
  _deleteKey?: InputMaybe<CheckoutSessionsDeleteKeyInput>;
  _inc?: InputMaybe<CheckoutSessionsIncInput>;
  _prepend?: InputMaybe<CheckoutSessionsPrependInput>;
  _set?: InputMaybe<CheckoutSessionsSetInput>;
  pkColumns: CheckoutSessionsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCheckoutSessionsManyArgs = {
  updates: Array<CheckoutSessionsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateInvoiceStatusesArgs = {
  _set?: InputMaybe<InvoiceStatusesSetInput>;
  where: InvoiceStatusesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateInvoiceStatusesByPkArgs = {
  _set?: InputMaybe<InvoiceStatusesSetInput>;
  pkColumns: InvoiceStatusesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateInvoiceStatusesManyArgs = {
  updates: Array<InvoiceStatusesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateInvoicesArgs = {
  _append?: InputMaybe<InvoicesAppendInput>;
  _deleteAtPath?: InputMaybe<InvoicesDeleteAtPathInput>;
  _deleteElem?: InputMaybe<InvoicesDeleteElemInput>;
  _deleteKey?: InputMaybe<InvoicesDeleteKeyInput>;
  _inc?: InputMaybe<InvoicesIncInput>;
  _prepend?: InputMaybe<InvoicesPrependInput>;
  _set?: InputMaybe<InvoicesSetInput>;
  where: InvoicesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateInvoicesByPkArgs = {
  _append?: InputMaybe<InvoicesAppendInput>;
  _deleteAtPath?: InputMaybe<InvoicesDeleteAtPathInput>;
  _deleteElem?: InputMaybe<InvoicesDeleteElemInput>;
  _deleteKey?: InputMaybe<InvoicesDeleteKeyInput>;
  _inc?: InputMaybe<InvoicesIncInput>;
  _prepend?: InputMaybe<InvoicesPrependInput>;
  _set?: InputMaybe<InvoicesSetInput>;
  pkColumns: InvoicesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateInvoicesManyArgs = {
  updates: Array<InvoicesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProviderTypeArgs = {
  _set?: InputMaybe<ProviderTypeSetInput>;
  where: ProviderTypeBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProviderTypeByPkArgs = {
  _set?: InputMaybe<ProviderTypeSetInput>;
  pkColumns: ProviderTypePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProviderTypeManyArgs = {
  updates: Array<ProviderTypeUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateSessionsArgs = {
  _set?: InputMaybe<SessionsSetInput>;
  where: SessionsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateSessionsByPkArgs = {
  _set?: InputMaybe<SessionsSetInput>;
  pkColumns: SessionsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateSessionsManyArgs = {
  updates: Array<SessionsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusesArgs = {
  _set?: InputMaybe<SubscriptionStatusesSetInput>;
  where: SubscriptionStatusesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusesByPkArgs = {
  _set?: InputMaybe<SubscriptionStatusesSetInput>;
  pkColumns: SubscriptionStatusesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusesManyArgs = {
  updates: Array<SubscriptionStatusesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionsArgs = {
  _append?: InputMaybe<SubscriptionsAppendInput>;
  _deleteAtPath?: InputMaybe<SubscriptionsDeleteAtPathInput>;
  _deleteElem?: InputMaybe<SubscriptionsDeleteElemInput>;
  _deleteKey?: InputMaybe<SubscriptionsDeleteKeyInput>;
  _prepend?: InputMaybe<SubscriptionsPrependInput>;
  _set?: InputMaybe<SubscriptionsSetInput>;
  where: SubscriptionsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionsByPkArgs = {
  _append?: InputMaybe<SubscriptionsAppendInput>;
  _deleteAtPath?: InputMaybe<SubscriptionsDeleteAtPathInput>;
  _deleteElem?: InputMaybe<SubscriptionsDeleteElemInput>;
  _deleteKey?: InputMaybe<SubscriptionsDeleteKeyInput>;
  _prepend?: InputMaybe<SubscriptionsPrependInput>;
  _set?: InputMaybe<SubscriptionsSetInput>;
  pkColumns: SubscriptionsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionsManyArgs = {
  updates: Array<SubscriptionsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _set?: InputMaybe<UsersSetInput>;
  pkColumns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateVerificationTokensArgs = {
  _set?: InputMaybe<VerificationTokensSetInput>;
  where: VerificationTokensBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateVerificationTokensByPkArgs = {
  _set?: InputMaybe<VerificationTokensSetInput>;
  pkColumns: VerificationTokensPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateVerificationTokensManyArgs = {
  updates: Array<VerificationTokensUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accountsAggregate: AccountsAggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accountsByPk?: Maybe<Accounts>;
  /** fetch data from the table: "checkout_session_statuses" */
  checkoutSessionStatuses: Array<CheckoutSessionStatuses>;
  /** fetch aggregated fields from the table: "checkout_session_statuses" */
  checkoutSessionStatusesAggregate: CheckoutSessionStatusesAggregate;
  /** fetch data from the table: "checkout_session_statuses" using primary key columns */
  checkoutSessionStatusesByPk?: Maybe<CheckoutSessionStatuses>;
  /** An array relationship */
  checkoutSessions: Array<CheckoutSessions>;
  /** An aggregate relationship */
  checkoutSessionsAggregate: CheckoutSessionsAggregate;
  /** fetch data from the table: "checkout_sessions" using primary key columns */
  checkoutSessionsByPk?: Maybe<CheckoutSessions>;
  /** fetch data from the table: "invoice_statuses" */
  invoiceStatuses: Array<InvoiceStatuses>;
  /** fetch aggregated fields from the table: "invoice_statuses" */
  invoiceStatusesAggregate: InvoiceStatusesAggregate;
  /** fetch data from the table: "invoice_statuses" using primary key columns */
  invoiceStatusesByPk?: Maybe<InvoiceStatuses>;
  /** An array relationship */
  invoices: Array<Invoices>;
  /** An aggregate relationship */
  invoicesAggregate: InvoicesAggregate;
  /** fetch data from the table: "invoices" using primary key columns */
  invoicesByPk?: Maybe<Invoices>;
  /** fetch data from the table: "provider_type" */
  providerType: Array<ProviderType>;
  /** fetch aggregated fields from the table: "provider_type" */
  providerTypeAggregate: ProviderTypeAggregate;
  /** fetch data from the table: "provider_type" using primary key columns */
  providerTypeByPk?: Maybe<ProviderType>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessionsAggregate: SessionsAggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessionsByPk?: Maybe<Sessions>;
  /** fetch data from the table: "subscription_statuses" */
  subscriptionStatuses: Array<SubscriptionStatuses>;
  /** fetch aggregated fields from the table: "subscription_statuses" */
  subscriptionStatusesAggregate: SubscriptionStatusesAggregate;
  /** fetch data from the table: "subscription_statuses" using primary key columns */
  subscriptionStatusesByPk?: Maybe<SubscriptionStatuses>;
  /** An array relationship */
  subscriptions: Array<Subscriptions>;
  /** An aggregate relationship */
  subscriptionsAggregate: SubscriptionsAggregate;
  /** fetch data from the table: "subscriptions" using primary key columns */
  subscriptionsByPk?: Maybe<Subscriptions>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table: "verification_tokens" */
  verificationTokens: Array<VerificationTokens>;
  /** fetch aggregated fields from the table: "verification_tokens" */
  verificationTokensAggregate: VerificationTokensAggregate;
  /** fetch data from the table: "verification_tokens" using primary key columns */
  verificationTokensByPk?: Maybe<VerificationTokens>;
};


export type Query_RootAccountsArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Query_RootAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Query_RootAccountsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCheckoutSessionStatusesArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionStatusesOrderBy>>;
  where?: InputMaybe<CheckoutSessionStatusesBoolExp>;
};


export type Query_RootCheckoutSessionStatusesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionStatusesOrderBy>>;
  where?: InputMaybe<CheckoutSessionStatusesBoolExp>;
};


export type Query_RootCheckoutSessionStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootCheckoutSessionsArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


export type Query_RootCheckoutSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


export type Query_RootCheckoutSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvoiceStatusesArgs = {
  distinctOn?: InputMaybe<Array<InvoiceStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceStatusesOrderBy>>;
  where?: InputMaybe<InvoiceStatusesBoolExp>;
};


export type Query_RootInvoiceStatusesAggregateArgs = {
  distinctOn?: InputMaybe<Array<InvoiceStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceStatusesOrderBy>>;
  where?: InputMaybe<InvoiceStatusesBoolExp>;
};


export type Query_RootInvoiceStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootInvoicesArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


export type Query_RootInvoicesAggregateArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


export type Query_RootInvoicesByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootProviderTypeArgs = {
  distinctOn?: InputMaybe<Array<ProviderTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProviderTypeOrderBy>>;
  where?: InputMaybe<ProviderTypeBoolExp>;
};


export type Query_RootProviderTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProviderTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProviderTypeOrderBy>>;
  where?: InputMaybe<ProviderTypeBoolExp>;
};


export type Query_RootProviderTypeByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootSessionsArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type Query_RootSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type Query_RootSessionsByPkArgs = {
  sessionToken: Scalars['String']['input'];
};


export type Query_RootSubscriptionStatusesArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusesOrderBy>>;
  where?: InputMaybe<SubscriptionStatusesBoolExp>;
};


export type Query_RootSubscriptionStatusesAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusesOrderBy>>;
  where?: InputMaybe<SubscriptionStatusesBoolExp>;
};


export type Query_RootSubscriptionStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootSubscriptionsArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};


export type Query_RootSubscriptionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};


export type Query_RootSubscriptionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootVerificationTokensArgs = {
  distinctOn?: InputMaybe<Array<VerificationTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VerificationTokensOrderBy>>;
  where?: InputMaybe<VerificationTokensBoolExp>;
};


export type Query_RootVerificationTokensAggregateArgs = {
  distinctOn?: InputMaybe<Array<VerificationTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VerificationTokensOrderBy>>;
  where?: InputMaybe<VerificationTokensBoolExp>;
};


export type Query_RootVerificationTokensByPkArgs = {
  token: Scalars['String']['input'];
};

export type SessionsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SessionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SessionsBoolExp>;
  predicate: IntComparisonExp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  accounts: Array<Accounts>;
  /** An aggregate relationship */
  accountsAggregate: AccountsAggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accountsByPk?: Maybe<Accounts>;
  /** fetch data from the table in a streaming manner: "accounts" */
  accountsStream: Array<Accounts>;
  /** fetch data from the table: "checkout_session_statuses" */
  checkoutSessionStatuses: Array<CheckoutSessionStatuses>;
  /** fetch aggregated fields from the table: "checkout_session_statuses" */
  checkoutSessionStatusesAggregate: CheckoutSessionStatusesAggregate;
  /** fetch data from the table: "checkout_session_statuses" using primary key columns */
  checkoutSessionStatusesByPk?: Maybe<CheckoutSessionStatuses>;
  /** fetch data from the table in a streaming manner: "checkout_session_statuses" */
  checkoutSessionStatusesStream: Array<CheckoutSessionStatuses>;
  /** An array relationship */
  checkoutSessions: Array<CheckoutSessions>;
  /** An aggregate relationship */
  checkoutSessionsAggregate: CheckoutSessionsAggregate;
  /** fetch data from the table: "checkout_sessions" using primary key columns */
  checkoutSessionsByPk?: Maybe<CheckoutSessions>;
  /** fetch data from the table in a streaming manner: "checkout_sessions" */
  checkoutSessionsStream: Array<CheckoutSessions>;
  /** fetch data from the table: "invoice_statuses" */
  invoiceStatuses: Array<InvoiceStatuses>;
  /** fetch aggregated fields from the table: "invoice_statuses" */
  invoiceStatusesAggregate: InvoiceStatusesAggregate;
  /** fetch data from the table: "invoice_statuses" using primary key columns */
  invoiceStatusesByPk?: Maybe<InvoiceStatuses>;
  /** fetch data from the table in a streaming manner: "invoice_statuses" */
  invoiceStatusesStream: Array<InvoiceStatuses>;
  /** An array relationship */
  invoices: Array<Invoices>;
  /** An aggregate relationship */
  invoicesAggregate: InvoicesAggregate;
  /** fetch data from the table: "invoices" using primary key columns */
  invoicesByPk?: Maybe<Invoices>;
  /** fetch data from the table in a streaming manner: "invoices" */
  invoicesStream: Array<Invoices>;
  /** fetch data from the table: "provider_type" */
  providerType: Array<ProviderType>;
  /** fetch aggregated fields from the table: "provider_type" */
  providerTypeAggregate: ProviderTypeAggregate;
  /** fetch data from the table: "provider_type" using primary key columns */
  providerTypeByPk?: Maybe<ProviderType>;
  /** fetch data from the table in a streaming manner: "provider_type" */
  providerTypeStream: Array<ProviderType>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessionsAggregate: SessionsAggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessionsByPk?: Maybe<Sessions>;
  /** fetch data from the table in a streaming manner: "sessions" */
  sessionsStream: Array<Sessions>;
  /** fetch data from the table: "subscription_statuses" */
  subscriptionStatuses: Array<SubscriptionStatuses>;
  /** fetch aggregated fields from the table: "subscription_statuses" */
  subscriptionStatusesAggregate: SubscriptionStatusesAggregate;
  /** fetch data from the table: "subscription_statuses" using primary key columns */
  subscriptionStatusesByPk?: Maybe<SubscriptionStatuses>;
  /** fetch data from the table in a streaming manner: "subscription_statuses" */
  subscriptionStatusesStream: Array<SubscriptionStatuses>;
  /** An array relationship */
  subscriptions: Array<Subscriptions>;
  /** An aggregate relationship */
  subscriptionsAggregate: SubscriptionsAggregate;
  /** fetch data from the table: "subscriptions" using primary key columns */
  subscriptionsByPk?: Maybe<Subscriptions>;
  /** fetch data from the table in a streaming manner: "subscriptions" */
  subscriptionsStream: Array<Subscriptions>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
  /** fetch data from the table: "verification_tokens" */
  verificationTokens: Array<VerificationTokens>;
  /** fetch aggregated fields from the table: "verification_tokens" */
  verificationTokensAggregate: VerificationTokensAggregate;
  /** fetch data from the table: "verification_tokens" using primary key columns */
  verificationTokensByPk?: Maybe<VerificationTokens>;
  /** fetch data from the table in a streaming manner: "verification_tokens" */
  verificationTokensStream: Array<VerificationTokens>;
};


export type Subscription_RootAccountsArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Subscription_RootAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Subscription_RootAccountsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAccountsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AccountsStreamCursorInput>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Subscription_RootCheckoutSessionStatusesArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionStatusesOrderBy>>;
  where?: InputMaybe<CheckoutSessionStatusesBoolExp>;
};


export type Subscription_RootCheckoutSessionStatusesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionStatusesOrderBy>>;
  where?: InputMaybe<CheckoutSessionStatusesBoolExp>;
};


export type Subscription_RootCheckoutSessionStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootCheckoutSessionStatusesStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CheckoutSessionStatusesStreamCursorInput>>;
  where?: InputMaybe<CheckoutSessionStatusesBoolExp>;
};


export type Subscription_RootCheckoutSessionsArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


export type Subscription_RootCheckoutSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CheckoutSessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CheckoutSessionsOrderBy>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


export type Subscription_RootCheckoutSessionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCheckoutSessionsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CheckoutSessionsStreamCursorInput>>;
  where?: InputMaybe<CheckoutSessionsBoolExp>;
};


export type Subscription_RootInvoiceStatusesArgs = {
  distinctOn?: InputMaybe<Array<InvoiceStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceStatusesOrderBy>>;
  where?: InputMaybe<InvoiceStatusesBoolExp>;
};


export type Subscription_RootInvoiceStatusesAggregateArgs = {
  distinctOn?: InputMaybe<Array<InvoiceStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoiceStatusesOrderBy>>;
  where?: InputMaybe<InvoiceStatusesBoolExp>;
};


export type Subscription_RootInvoiceStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootInvoiceStatusesStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<InvoiceStatusesStreamCursorInput>>;
  where?: InputMaybe<InvoiceStatusesBoolExp>;
};


export type Subscription_RootInvoicesArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


export type Subscription_RootInvoicesAggregateArgs = {
  distinctOn?: InputMaybe<Array<InvoicesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvoicesOrderBy>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


export type Subscription_RootInvoicesByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvoicesStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<InvoicesStreamCursorInput>>;
  where?: InputMaybe<InvoicesBoolExp>;
};


export type Subscription_RootProviderTypeArgs = {
  distinctOn?: InputMaybe<Array<ProviderTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProviderTypeOrderBy>>;
  where?: InputMaybe<ProviderTypeBoolExp>;
};


export type Subscription_RootProviderTypeAggregateArgs = {
  distinctOn?: InputMaybe<Array<ProviderTypeSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProviderTypeOrderBy>>;
  where?: InputMaybe<ProviderTypeBoolExp>;
};


export type Subscription_RootProviderTypeByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootProviderTypeStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ProviderTypeStreamCursorInput>>;
  where?: InputMaybe<ProviderTypeBoolExp>;
};


export type Subscription_RootSessionsArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type Subscription_RootSessionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SessionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type Subscription_RootSessionsByPkArgs = {
  sessionToken: Scalars['String']['input'];
};


export type Subscription_RootSessionsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SessionsStreamCursorInput>>;
  where?: InputMaybe<SessionsBoolExp>;
};


export type Subscription_RootSubscriptionStatusesArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusesOrderBy>>;
  where?: InputMaybe<SubscriptionStatusesBoolExp>;
};


export type Subscription_RootSubscriptionStatusesAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusesOrderBy>>;
  where?: InputMaybe<SubscriptionStatusesBoolExp>;
};


export type Subscription_RootSubscriptionStatusesByPkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootSubscriptionStatusesStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SubscriptionStatusesStreamCursorInput>>;
  where?: InputMaybe<SubscriptionStatusesBoolExp>;
};


export type Subscription_RootSubscriptionsArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};


export type Subscription_RootSubscriptionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionsOrderBy>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};


export type Subscription_RootSubscriptionsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSubscriptionsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SubscriptionsStreamCursorInput>>;
  where?: InputMaybe<SubscriptionsBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootVerificationTokensArgs = {
  distinctOn?: InputMaybe<Array<VerificationTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VerificationTokensOrderBy>>;
  where?: InputMaybe<VerificationTokensBoolExp>;
};


export type Subscription_RootVerificationTokensAggregateArgs = {
  distinctOn?: InputMaybe<Array<VerificationTokensSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VerificationTokensOrderBy>>;
  where?: InputMaybe<VerificationTokensBoolExp>;
};


export type Subscription_RootVerificationTokensByPkArgs = {
  token: Scalars['String']['input'];
};


export type Subscription_RootVerificationTokensStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<VerificationTokensStreamCursorInput>>;
  where?: InputMaybe<VerificationTokensBoolExp>;
};

export type SubscriptionsAggregateBoolExpBool_And = {
  arguments: SubscriptionsSelectColumnSubscriptionsAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SubscriptionsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type SubscriptionsAggregateBoolExpBool_Or = {
  arguments: SubscriptionsSelectColumnSubscriptionsAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SubscriptionsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type SubscriptionsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SubscriptionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SubscriptionsBoolExp>;
  predicate: IntComparisonExp;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'Users', id: any }> };


export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;