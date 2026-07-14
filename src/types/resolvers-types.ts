import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Job as PrismaJob } from '../generated/prisma/client.js';
import type { Context } from '../graphql/context/context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type ApplyForJobInput = {
  id: Scalars['ID']['input'];
};

export type CancleJobApplicationInput = {
  id: Scalars['ID']['input'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateJobInput = {
  companyName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  remote: Scalars['Boolean']['input'];
  salary: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  type: JobType;
};

export type DeleteJobInput = {
  id: Scalars['ID']['input'];
};

export type Job = {
  __typename?: 'Job';
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isApplied?: Maybe<Scalars['Boolean']['output']>;
  location: Scalars['String']['output'];
  remote: Scalars['Boolean']['output'];
  salary: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: JobType;
  updatedAt: Scalars['DateTime']['output'];
};

export type JobConnectionInput = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type JobConnectionResponse = {
  __typename?: 'JobConnectionResponse';
  data: Array<Job>;
  meta: Meta;
};

export enum JobType {
  FullTime = 'FULL_TIME',
  Internship = 'INTERNSHIP',
  PartTime = 'PART_TIME'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Meta = {
  __typename?: 'Meta';
  hasMore: Scalars['Boolean']['output'];
  nextCursor?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  applyForJob: Scalars['Boolean']['output'];
  cancelJobApplication: Scalars['Boolean']['output'];
  createJob: Job;
  deleteJob: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  signup: User;
};


export type MutationApplyForJobArgs = {
  input: ApplyForJobInput;
};


export type MutationCancelJobApplicationArgs = {
  input: CancleJobApplicationInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationDeleteJobArgs = {
  input: DeleteJobInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  appliedJobs: JobConnectionResponse;
  getCompanies: Array<Company>;
  me?: Maybe<User>;
  ownedJobs: JobConnectionResponse;
  searchJobs: SearchJobsResponse;
};


export type QueryAppliedJobsArgs = {
  input: JobConnectionInput;
};


export type QueryOwnedJobsArgs = {
  input: JobConnectionInput;
};


export type QuerySearchJobsArgs = {
  input: SearchJobsInput;
};

export type SearchJobsInput = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SearchJobsResponse = {
  __typename?: 'SearchJobsResponse';
  data: Array<Job>;
  meta: Meta;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};

export type User = {
  __typename?: 'User';
  appliedJobs?: Maybe<Array<Job>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownedJobs?: Maybe<Array<Job>>;
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApplyForJobInput: ApplyForJobInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CancleJobApplicationInput: CancleJobApplicationInput;
  Company: ResolverTypeWrapper<Company>;
  CreateJobInput: CreateJobInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteJobInput: DeleteJobInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Job: ResolverTypeWrapper<PrismaJob>;
  JobConnectionInput: JobConnectionInput;
  JobConnectionResponse: ResolverTypeWrapper<Omit<JobConnectionResponse, 'data'> & { data: Array<ResolversTypes['Job']> }>;
  JobType: JobType;
  LoginInput: LoginInput;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SearchJobsInput: SearchJobsInput;
  SearchJobsResponse: ResolverTypeWrapper<Omit<SearchJobsResponse, 'data'> & { data: Array<ResolversTypes['Job']> }>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<Omit<User, 'appliedJobs' | 'ownedJobs'> & { appliedJobs?: Maybe<Array<ResolversTypes['Job']>>, ownedJobs?: Maybe<Array<ResolversTypes['Job']>> }>;
  UserRole: UserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ApplyForJobInput: ApplyForJobInput;
  Boolean: Scalars['Boolean']['output'];
  CancleJobApplicationInput: CancleJobApplicationInput;
  Company: Company;
  CreateJobInput: CreateJobInput;
  DateTime: Scalars['DateTime']['output'];
  DeleteJobInput: DeleteJobInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Job: PrismaJob;
  JobConnectionInput: JobConnectionInput;
  JobConnectionResponse: Omit<JobConnectionResponse, 'data'> & { data: Array<ResolversParentTypes['Job']> };
  LoginInput: LoginInput;
  Meta: Meta;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  SearchJobsInput: SearchJobsInput;
  SearchJobsResponse: Omit<SearchJobsResponse, 'data'> & { data: Array<ResolversParentTypes['Job']> };
  SignupInput: SignupInput;
  String: Scalars['String']['output'];
  User: Omit<User, 'appliedJobs' | 'ownedJobs'> & { appliedJobs?: Maybe<Array<ResolversParentTypes['Job']>>, ownedJobs?: Maybe<Array<ResolversParentTypes['Job']>> };
};

export type CompanyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type JobResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isApplied?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  remote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  salary?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['JobType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type JobConnectionResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['JobConnectionResponse'] = ResolversParentTypes['JobConnectionResponse']> = {
  data?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
};

export type MetaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  applyForJob?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationApplyForJobArgs, 'input'>>;
  cancelJobApplication?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCancelJobApplicationArgs, 'input'>>;
  createJob?: Resolver<ResolversTypes['Job'], ParentType, ContextType, RequireFields<MutationCreateJobArgs, 'input'>>;
  deleteJob?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteJobArgs, 'input'>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  appliedJobs?: Resolver<ResolversTypes['JobConnectionResponse'], ParentType, ContextType, RequireFields<QueryAppliedJobsArgs, 'input'>>;
  getCompanies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownedJobs?: Resolver<ResolversTypes['JobConnectionResponse'], ParentType, ContextType, RequireFields<QueryOwnedJobsArgs, 'input'>>;
  searchJobs?: Resolver<ResolversTypes['SearchJobsResponse'], ParentType, ContextType, RequireFields<QuerySearchJobsArgs, 'input'>>;
};

export type SearchJobsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchJobsResponse'] = ResolversParentTypes['SearchJobsResponse']> = {
  data?: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  appliedJobs?: Resolver<Maybe<Array<ResolversTypes['Job']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownedJobs?: Resolver<Maybe<Array<ResolversTypes['Job']>>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Company?: CompanyResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Job?: JobResolvers<ContextType>;
  JobConnectionResponse?: JobConnectionResponseResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchJobsResponse?: SearchJobsResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

