export interface MarketData {
  payload: Payload;
  'ms-stream': string;
}

export interface Payload {
  Property: Property;
  Comps: Comp[];
}

export interface Property {
  status: Status;
  echoed_fields: EchoedFields;
  property: Property2[];
}

export interface Status {
  version: string;
  code: number;
  msg: string;
  total: number;
  page: number;
  pagesize: number;
  transactionID: string;
}

export interface EchoedFields {
  jobID: string;
  loanNumber: string;
  preparedBy: string;
  resellerID: string;
  preparedFor: string;
}

export interface Property2 {
  identifier: Identifier;
  lot: Lot;
  area: Area;
  address: Address;
  location: Location;
  summary: Summary;
  utilities: Utilities;
  sale: Sale;
  building: Building;
  assessment: Assessment;
  vintage: Vintage;
}

export interface Identifier {
  Id: number;
  fips: string;
  apn: string;
  attomId: number;
}

export interface Lot {
  lotNum: string;
  lotSize1: number;
  lotSize2: number;
  zoningType: string;
}

export interface Area {
  countrySecSubd: string;
  subdName: string;
  censusTractIdent: string;
  censusBlockGroup: string;
}

export interface Address {
  country: string;
  countrySubd: string;
  line1: string;
  line2: string;
  locality: string;
  matchCode: string;
  oneLine: string;
  postal1: string;
  postal2: string;
  postal3: string;
}

export interface Location {
  accuracy: string;
  latitude: string;
  longitude: string;
  distance: number;
  geoid: string;
  geoIdV4: GeoIdV4;
}

export interface GeoIdV4 {
  CO: string;
  CS: string;
  DB: string;
  N1: string;
  N2: string;
  N3: string;
  PL: string;
  SB: string;
  ZI: string;
}

export interface Summary {
  absenteeInd: string;
  propClass: string;
  propSubType: string;
  propType: string;
  yearBuilt: number;
  propLandUse: string;
  propIndicator: number;
  legal1: string;
}

export interface Utilities {
  coolingType: string;
  heatingType: string;
}

export interface Sale {
  saleSearchDate: string;
  saleTransDate: string;
  transactionIdent: string;
  saleAmountData: SaleAmountData;
}

export interface SaleAmountData {
  saleAmt: number;
  saleRecDate: string;
  saleDisclosureType: number;
  saleDocNum: string;
  saleTransType: string;
}

export interface Building {
  size: Size;
  rooms: Rooms;
  interior: Interior;
  construction: Construction;
  parking: Parking;
  summary: Summary2;
}

export interface Size {
  bldgSize: number;
  grossSize: number;
  grossSizeAdjusted: number;
  groundFloorSize: number;
  livingSize: number;
  sizeInd: string;
  universalSize: number;
}

export interface Rooms {
  bathsFull: number;
  bathsTotal: number;
  beds: number;
}

export interface Interior {}

export interface Construction {
  condition: string;
  foundationType: string;
}

export interface Parking {
  garageType: string;
  prkgSize: number;
  prkgType: string;
}

export interface Summary2 {
  levels: number;
  storyDesc: string;
  view: string;
  viewCode: string;
}

export interface Assessment {
  appraised: Appraised;
  assessed: Assessed;
  market: Market;
  tax: Tax;
  improvementPercent: number;
  owner: Owner;
  mortgage: Mortgage;
}

export interface Appraised {}

export interface Assessed {
  assdImprValue: number;
  assdLandValue: number;
  assdTtlValue: number;
}

export interface Market {
  mktImprValue: number;
  mktLandValue: number;
  mktTtlValue: number;
}

export interface Tax {
  taxAmt: number;
  taxPerSizeUnit: number;
  taxYear: number;
  exemption: Exemption;
  exemptiontype: Exemptiontype;
}

export interface Exemption {}

export interface Exemptiontype {}

export interface Owner {
  corporateIndicator: string;
  owner1: Owner1;
  owner2: Owner2;
  owner3: Owner3;
  owner4: Owner4;
  absenteeOwnerStatus: string;
  mailingAddressOneLine: string;
}

export interface Owner1 {
  lastName?: string;
  firstNameAndMi?: string;
}

export interface Owner2 {
  lastName?: string;
  firstNameAndMi?: string;
}

export interface Owner3 {
  lastName?: string;
  firstNameAndMi?: string;
}

export interface Owner4 {
  lastName?: string;
  firstNameAndMi?: string;
}

export interface Mortgage {
  FirstConcurrent: FirstConcurrent;
  SecondConcurrent: SecondConcurrent;
}

export interface FirstConcurrent {
  trustDeedDocumentNumber: string;
  amount: number;
  lenderLastName: string;
}

export interface SecondConcurrent {
  amount: number;
}

export interface Vintage {
  lastModified: string;
  pubDate: string;
}

export interface Comp {
  '@_StreetAddress'?: string;
  '@_City'?: string;
  '@_State'?: string;
  '@_PostalCode'?: string;
  '@PropertyParcelID'?: string;
  '@SiteMailAddressSameIndicator'?: string;
  '@StandardUseCode_ext'?: string;
  '@StandardUseDescription_ext'?: string;
  '@PrivacyType_ext'?: string;
  PRODUCT_INFO_ext: ProductInfoExt;
  MAILING_ADDRESS_ext?: MailingAddressExt;
  _IDENTIFICATION?: Identification;
  SALES_HISTORY?: SalesHistory;
  _OWNER?: Owner5;
  _LEGAL_DESCRIPTION?: LegalDescription;
  SITE?: Site;
  _TAX?: Tax2;
  STRUCTURE?: Structure;
  SALES_CONTRACT?: SalesContract;
  COMPARABLE_PROPERTY_ext?: ComparablePropertyExt;
}

export interface ProductInfoExt {
  '@ReportID_ext': string;
  '@ReportDescription_ext': string;
  '@Product_ext': string;
  '@RecordNumber_ext': string;
  '@MappingVersion_ext': string;
}

export interface MailingAddressExt {
  '@_StreetAddress': string;
  '@_City': string;
  '@_State': string;
  '@_PostalCode': string;
}

export interface Identification {
  '@RTPropertyID_ext': string;
  '@DQPropertyID_ext': string;
  '@CountyFIPSName_ext': string;
  '@AssessorsParcelIdentifier': string;
  '@AssessorsSecondParcelIdentifier': string;
  '@LongitudeNumber': string;
  '@LatitudeNumber': string;
}

export interface SalesHistory {
  '@PropertySalesAmount': string;
  '@BuyerUnparsedName_ext': string;
  '@RecordedDocumentIdentifier': string;
  '@FullOrPartialTransferValueType_ext': string;
  '@MultipleApnIndicator_ext': string;
  '@SellerUnparsedName': string;
  '@PricePerSquareFootAmount': string;
  '@PropertySalesDate': string;
  LOANS_ext: LoansExt;
}

export interface LoansExt {
  '@SellerCarrybackindicator': string;
  LOAN_ext: LoanExt[];
}

export interface LoanExt {
  '@_Type': string;
  '@TrustDeedDocumentNumber'?: string;
  '@_Amount': string;
}

export interface Owner5 {
  '@_Name': string;
  '@_TypeExt': string;
  '@_Description_ext': string;
  '@_SecondaryOwnerName_ext': string;
}

export interface LegalDescription {
  '@_Type': string;
  '@_TextDescription': string;
}

export interface Site {
  '@PropertyZoningCategoryType': string;
  '@DepthFeetCount': string;
  '@WidthFeetCount': string;
  '@LotSquareFeetCount': string;
}

export interface Tax2 {
  '@_TotalAssessedValueAmount': string;
  '@_AssessorMarketValue_ext': string;
}

export interface Structure {
  '@TotalBathroomCount': string;
  '@TotalBedroomCount': string;
  '@TotalRoomCount': string;
  '@StoriesCount': string;
  '@LivingUnitCount': string;
  '@GrossLivingAreaSquareFeetCount': string;
  ATTIC: Attic;
  BASEMENT: Basement;
  LEVELS: Levels;
  CAR_STORAGE: CarStorage;
  HEATING: Heating;
  COOLING: Cooling;
  EXTERIOR_FEATURE: ExteriorFeature[];
  STRUCTURE_ANALYSIS: StructureAnalysis;
  AMENITY: Amenity;
}

export interface Attic {
  '@SquareFeetCount': string;
}

export interface Basement {
  '@SquareFeetCount': string;
}

export interface Levels {
  LEVEL: Level[];
}

export interface Level {
  '@_Type': string;
  '@SquareFeetCount': string;
}

export interface CarStorage {
  CAR_STORAGE_LOCATION: CarStorageLocation;
}

export interface CarStorageLocation {
  '@SquareFeetCount': string;
  '@_ParkingSpacesCount': string;
  '@_Type': string;
  '@_TypeOtherDescription': string;
}

export interface Heating {
  '@_UnitDescription': string;
}

export interface Cooling {
  '@_UnitDescription': string;
}

export interface ExteriorFeature {
  '@_Type': string;
  '@_TypeOtherDescription': string;
  '@_Description': string;
}

export interface StructureAnalysis {
  '@PropertyStructureBuiltYear': string;
}

export interface Amenity {
  '@_Type': string;
  '@_DetailedDescription': string;
}

export interface SalesContract {
  '@_Date': string;
}

export interface ComparablePropertyExt {
  '@_Sequence': string;
  '@DistanceFromSubjectPropertyMilesCount': string;
  '@_City': string;
  '@_StreetAddress': string;
  '@_State': string;
  '@_PostalCode': string;
  '@StandardUseCode_ext': string;
  '@StandardUseDescription_ext': string;
  '@SiteMailAddressSameIndicator_ext': string;
  '@LatitudeNumber': string;
  '@LongitudeNumber': string;
  _IDENTIFICATION: Identification2;
  SALES_HISTORY: SalesHistory2;
  STRUCTURE: Structure2;
  SITE: Site2;
  _TAX: Tax3;
  _LEGAL_DESCRIPTION: LegalDescription2;
  MAILING_ADDRESS_ext: MailingAddressExt2;
  _OWNER: Owner6;
}

export interface Identification2 {
  '@RTPropertyID_ext': string;
  '@CountyFIPSName_ext': string;
  '@AssessorsSecondParcelIdentifier': string;
  '@DQPropertyID_ext': string;
}

export interface SalesHistory2 {
  '@TransferDate_ext': string;
  '@FullOrPartialTransferValueType_ext': string;
  '@PropertySalesAmount': string;
  '@BuyerUnparsedName_ext': string;
  '@SellerUnparsedName': string;
  '@MultipleApnIndicator_ext': string;
  '@ArmsLengthTransactionIndicatorExt': string;
  '@PricePerSquareFootAmount': string;
  LOANS_ext: LoansExt2;
  LOAN_ext: LoanExt3;
}

export interface LoansExt2 {
  LOAN_ext: LoanExt2[];
}

export interface LoanExt2 {
  '@_Type': string;
  '@TrustDeedDocumentNumber'?: string;
  '@_Amount': string;
}

export interface LoanExt3 {
  '@SellerCarrybackindicator': string;
}

export interface Structure2 {
  '@TotalBathroomCount': string;
  '@TotalBedroomCount': string;
  '@TotalBathroomFullCount_ext': string;
  '@TotalBathroomHalfCount_ext': string;
  '@TotalBathroomQuarterCount_ext': string;
  '@TotalBathroomThreeQuarterCount_ext': string;
  '@TotalRoomCount': string;
  '@StoriesCount': string;
  '@LivingUnitCount': string;
  '@GrossLivingAreaSquareFeetCount': string;
  '@TotalBathroomCountDq_ext': string;
  STRUCTURE_ANALYSIS: StructureAnalysis2;
  CAR_STORAGE: CarStorage2;
  ATTIC: Attic2;
  BASEMENT: Basement2;
  AMENITIES: Amenities;
  EXTERIOR_FEATURE: ExteriorFeature2;
  HEATING: Heating2;
  LEVELS: Levels2;
  COOLING: Cooling2;
}

export interface StructureAnalysis2 {
  '@PropertyStructureBuiltYear': string;
}

export interface CarStorage2 {
  CAR_STORAGE_LOCATION: CarStorageLocation2;
}

export interface CarStorageLocation2 {
  '@SquareFeetCount': string;
  '@_ParkingSpacesCount': string;
  '@_Type': string;
  '@_TypeOtherDescription': string;
}

export interface Attic2 {
  '@SquareFeetCount': string;
}

export interface Basement2 {
  '@SquareFeetCount': string;
  '@_FinishedPercent': string;
}

export interface Amenities {
  AMENITY: Amenity2[];
}

export interface Amenity2 {
  '@_Type': string;
  '@_ExistsIndicator'?: string;
  '@_DetailedDescription'?: string;
}

export interface ExteriorFeature2 {
  '@_Type': string;
  '@_TypeOtherDescription': string;
  '@_Description': string;
}

export interface Heating2 {
  '@_TypeOtherDescription': string;
  '@_UnitDescription': string;
}

export interface Levels2 {
  LEVEL: Level2[];
}

export interface Level2 {
  '@_Type': string;
  '@SquareFeetCount': string;
}

export interface Cooling2 {
  '@_UnitDescription': string;
}

export interface Site2 {
  '@DepthFeetCount': string;
  '@LotSquareFeetCount': string;
  '@WidthFeetCount': string;
  '@PropertyZoningCategoryType': string;
}

export interface Tax3 {
  '@_AssessorFullCashValue_ext': string;
  '@_AssessorMarketValue_ext': string;
  '@_TotalAssessedValueAmount': string;
}

export interface LegalDescription2 {
  '@_Type': string;
  '@_TextDescription': string;
}

export interface MailingAddressExt2 {
  '@_StreetAddress': string;
  '@_City': string;
  '@_State': string;
  '@_PostalCode': string;
}

export interface Owner6 {
  '@_Name': string;
  '@_SecondaryOwnerName_ext': string;
}
