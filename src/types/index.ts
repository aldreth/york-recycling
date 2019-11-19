export type CollectionInfo = {
  UPRN: number | null;
  ShortAddress: string | null;
  PropertyNumber: string | null;
  PropertyName: string | null;
  Street: string | null;
  Locality: null;
  Postcode: string | null;
  WasteType: string | null;
  WasteTypeDescription: string | null;
  CollectionAvailable: string | null;
  NextCollection: string | null;
  LastCollection: string | null;
  CollectionDay: string | null;
  CollectionDayFull: string | null;
  BinType: string | null;
  BinTypeDescription: string | null;
  MaterialsCollected: string | null;
  Provider: string | null;
  RoundNumber: string | null;
  RoundNumberDescription: string | null;
  AlternativeRoundNumber: string | null;
  AlternativeRoundNumberDescription: string | null;
  ProviderShort: string | null;
  Ward: string | null;
  CollectionCalendar: string | null;
  CollectionTypeDescription: string | null;
  ImageName: string | null;
  CollectionFrequency: string | null;
  CollectionFrequencyShort: string | null;
  CollectionPoint: string | null;
  CollectionPointDescription: string | null;
  CollectionPointLocation: null;
  NumberOfBins: string | null;
  SaonNo: string | null;
  SaonName: string | null;
  CollectionType: string | null;
  Frequency: {
    ExcludeSunday: boolean | null;
    FrequencyInDays: number | null;
    StartingWeekNumber: number | null;
  };
  CollectionDayOfWeek: number | null;
  timestamp: number | null;
};

export type CollectionInfoData = {
  fetched: boolean;
  collectionInfo: CollectionInfo[];
};

export type Household = {
  Uprn: number | null;
  ShortAddress?: string;
  PropertyNumber?: string;
  PropertyName?: string;
  SaonName?: string;
  SaonNo?: string;
  Street?: string;
  Locality?: string;
  Postcode?: string;
  CollectionPoint?: string;
};

export type HouseholdsData = {
  fetched: boolean;
  households: Household[];
};
