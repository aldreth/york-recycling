type CollectionInfoDto = {
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
  NextCollection: string;
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
};

type NewCollectionInfoDto = {
  service: string;
  icon: string;
  nextCollection: string;
  frequency: string;
  binDescription: string;
  wasteType: string;
  collectionLocation: string;
  title: string;
};

type CollectionInfo = {
  service: string;
  icon: string;
  title: string;
  wasteTypeDescription: string;
  wasteType: string;
  collectionDay: string;
  collectionFrequency: string;
  collectionPoint: string;
  binDescription: string;
  timestamp: number;
  key: string;
};
