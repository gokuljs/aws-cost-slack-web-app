export enum IntegrationPhaseProps {
  AWS = 'AWS',
  SLACK = 'SLACK',
  DEFAULT = 'DEFAULT',
}

export interface CredentialConnectionCardProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data?: CredentialKeyProps | null;
  setIntegrationPhase: React.Dispatch<IntegrationPhaseProps>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInfoPage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCurrentInfoPage: React.Dispatch<
    React.SetStateAction<IntegrationPhaseProps>
  >;
}

export interface CredentialKeyProps {
  access_key?: string;
  secret_key?: string;
  region?: string;
  slack_webhook?: string;
  timezone?: string;
}
