import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons';
import './AwsInputCard.scss';
import {
  CredentialConnectionCardProps,
  CredentialKeyProps,
  IntegrationPhaseProps,
} from '../../../models/credentials';
import { useState } from 'react';
import { AxiosError } from 'axios';
import useUpdateUserConfiguration from '../../../mutations/useUpdateUserConfiguration';
import { Button, Code } from '@radix-ui/themes';
import { RotatingLines } from 'react-loader-spinner';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

const AwsInputCard: React.FC<CredentialConnectionCardProps> = ({
  setOpenDialog,
  data,
  setIntegrationPhase,
  isEdit,
  setIsEdit,
  setShowInfoPage,
  setShowCurrentInfoPage,
}) => {
  const [awsCredentials, setAwsCredentials] =
    useState<CredentialKeyProps | null>({ ...data });
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const updateUserCredentials = useUpdateUserConfiguration();
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async (): Promise<void> => {
    setIsLoading(true);
    try {
      setErrMsg(null);
      const updateData =
        isEdit && (!awsCredentials?.access_key || !awsCredentials?.secret_key)
          ? {
              access_key: '',
              secret_key: '',
            }
          : awsCredentials;
      if (updateData) {
        await updateUserCredentials.mutateAsync(updateData);
        setIntegrationPhase(IntegrationPhaseProps.SLACK);
      }
      if (isEdit) {
        setOpenDialog(false);
        setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
      } else {
        setIntegrationPhase(IntegrationPhaseProps.SLACK);
      }
      setIsEdit(false);
    } catch (err) {
      setErrMsg((err as AxiosError).response?.data as string);
    }
    setIsLoading(false);
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      await updateUserCredentials.mutateAsync({
        access_key: '',
        secret_key: '',
      });
      setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AwsInputCard">
      <div className="DialogTitle">
        Aws Credentials
        <QuestionMarkCircledIcon
          onClick={() => {
            setShowInfoPage(true);
            setShowCurrentInfoPage(IntegrationPhaseProps.AWS);
          }}
          className="questionIcon"
        />
        <Cross1Icon
          className="close"
          onClick={() => {
            setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
          }}
        />
      </div>
      <div className="DialogDescription">
        For seamless AWS integration, please enter your AWS Access Key and
        Secret Key accurately.
      </div>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="name">
          Aws Access Key
        </label>
        <input
          className="Input"
          placeholder="Enter your AWS access key here"
          defaultValue={data && data.access_key ? data.access_key : ''}
          onChange={(e) => {
            setAwsCredentials({
              ...awsCredentials,
              access_key: e.target.value,
            });
          }}
        />
      </fieldset>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="username">
          Aws Secret key
        </label>
        <input
          className="Input"
          id="username"
          placeholder="Enter your AWS secret key here"
          defaultValue={data && data.secret_key ? data.secret_key : ''}
          type={isEdit ? 'password' : 'text'}
          onChange={(e) => {
            setAwsCredentials({
              ...awsCredentials,
              secret_key: e.target.value,
            });
          }}
        />
      </fieldset>
      <div className="err-msg">
        <Code className="err-msg" color="red" variant="ghost">
          {errMsg}
        </Code>
      </div>

      <div className="button-container">
        <div className="buttons">
          {isEdit && (
            <Button
              onClick={() => {
                handleDisconnect();
              }}
              className="back-button"
              color="red"
              variant="solid"
            >
              Disconnect
            </Button>
          )}

          <button
            className="Button green"
            disabled={
              isLoading ||
              (!isEdit &&
                (!awsCredentials?.access_key || !awsCredentials?.secret_key))
            }
            onClick={handleNext}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="#4fa94d"
                strokeWidth="5"
                animationDuration="0.75"
                width="26"
                visible={true}
              />
            ) : isEdit ? (
              'Save'
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
      <div>
        <button
          className="IconButton"
          aria-label="Close"
          onClick={() => {
            setOpenDialog(false);
            setIsEdit(false);
          }}
        >
          <Cross2Icon />
        </button>
      </div>
    </div>
  );
};

export default AwsInputCard;
