import {
  Cross1Icon,
  Cross2Icon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import './SlackInputCard.scss';
import {
  CredentialConnectionCardProps,
  CredentialKeyProps,
  IntegrationPhaseProps,
} from '../../../models/credentials';
import { useState } from 'react';
import { AxiosError } from 'axios';
import useUpdateUserConfiguration from '../../../mutations/useUpdateUserConfiguration';
import { RotatingLines } from 'react-loader-spinner';
import { Button, Code } from '@radix-ui/themes';

const SlackInputCard: React.FC<CredentialConnectionCardProps> = ({
  setOpenDialog,
  data,
  setIntegrationPhase,
  isEdit,
  setIsEdit,
  setShowInfoPage,
  setShowCurrentInfoPage,
}) => {
  const updateSlackUrl = useUpdateUserConfiguration();
  const [slackWebHookUrl, setSlackWebHookUrl] =
    useState<CredentialKeyProps | null>(data ? data : null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const handleNext = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (slackWebHookUrl) {
        await updateSlackUrl.mutateAsync({
          slack_webhook: slackWebHookUrl.slack_webhook,
        });
      }
      setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
      setOpenDialog(false);
      setIsEdit(false);
    } catch (err) {
      setErrMsg((err as AxiosError).response?.data as string);
    }

    setIsLoading(false);
  };

  const handleDisconnect = async (): Promise<void> => {
    try {
      await updateSlackUrl.mutateAsync({
        slack_webhook: '',
      });
      setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="SlackDialogContent">
      <div className="DialogTitle">
        Slack Credentials
        <QuestionMarkCircledIcon
          onClick={() => {
            setShowInfoPage(true);
            setShowCurrentInfoPage(IntegrationPhaseProps.SLACK);
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
        Enter your Slack webhook URL here to receive AWS cost notifications in
        your Slack channel.
      </div>
      <fieldset className="Fieldset">
        <label className="Label" htmlFor="name">
          Slack Webhook url
        </label>
        <input
          className="Input"
          placeholder="Please Enter Slack Webhook url."
          defaultValue={data && data.slack_webhook ? data.slack_webhook : ''}
          onChange={(e) => {
            setSlackWebHookUrl({ ...data, slack_webhook: e.target.value });
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
            disabled={isLoading || (!isEdit && !slackWebHookUrl?.slack_webhook)}
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
              'Finish'
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
            setIntegrationPhase(IntegrationPhaseProps.AWS);
            setIsEdit(false);
          }}
        >
          <Cross2Icon />
        </button>
      </div>
    </div>
  );
};

export default SlackInputCard;
