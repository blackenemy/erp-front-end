export interface RemoteAreaSurchargeFormSectionProps {
  value: {
    remoteZipPrefixes: string[];
    surchargeFlat: number;
  };
  onChange: (value: {
    remoteZipPrefixes: string[];
    surchargeFlat: number;
  }) => void;
  style?: React.CSSProperties;
}
