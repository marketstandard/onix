export enum ApplicationError {
  NoCardOnFileApiToken = 'Must have card on file to generate API token',
  NoCardOnFileApp = 'Must have card on file to use this resource',
  FileDoesNotBelongToUser = 'Requested file does not belong to the user',
  FileDoesNotBelongToOrg = 'Requested file does not belong to the organization',
  FileNotAvailableToPublic = 'Requested file does not have public facing link',
  FileNotUploaded = 'Requested file is not uploaded',
  UserMustBeAdministrator = 'Must be an administrator to access this functionality',
  UnsupportedKeyVersion = 'Unsupported key version',
}
