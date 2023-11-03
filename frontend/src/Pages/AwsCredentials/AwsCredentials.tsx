import { Badge, Blockquote, Button, Card, Heading } from '@radix-ui/themes';
import './AwsCredentials.scss';
import { useEffect, useState } from 'react';
import AwsInputCard from './AwsInputCard/AwsInputCard';
import SlackInputCard from './SlackInputCard/SlackInputCard';
import { IntegrationPhaseProps } from '../../models/credentials';
import { Pencil1Icon, Cross1Icon } from '@radix-ui/react-icons';
import { Slack } from '../../utils/svg';
import authApis from '../../apis/auth';
import useUpdateUserConfiguration from '../../mutations/useUpdateUserConfiguration';
import AWSInstructions from './AwsInfoPage/AwsInfoPage';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import useGetUserConfiguration from '../../queries/useGetUserConfiguration';
import SlackInfoCard from './SlackInfoPage/SlackInfoCard';

const AwsCredentials: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { data, isLoading } = useGetUserConfiguration();
  const updateUserCredentials = useUpdateUserConfiguration();
  const [integrationPhase, setIntegrationPhase] =
    useState<IntegrationPhaseProps>(IntegrationPhaseProps.DEFAULT);
  const [showInfoPage, setShowInfoPage] = useState(false);
  const [currentInfoPage, setShowCurrentInfoPage] =
    useState<IntegrationPhaseProps>(IntegrationPhaseProps.DEFAULT);

  useEffect(() => {
    if (showInfoPage) {
      setShowCurrentInfoPage(
        integrationPhase === IntegrationPhaseProps.AWS
          ? IntegrationPhaseProps.AWS
          : IntegrationPhaseProps.SLACK,
      );
    }
  }, [integrationPhase]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpenDialog(false);
        setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
        setIsEdit(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);
  const handleDisconnect = async (): Promise<void> => {
    try {
      await updateUserCredentials.mutateAsync({
        access_key: '',
        secret_key: '',
        slack_webhook: '',
        region: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const DefaultCard = (): JSX.Element => {
    return (
      <Card style={{ maxWidth: 400 }}>
        <div className="integration-box">
          <Heading size="4" className="heading">
            Slack Integration for AWS Billing Alerts
          </Heading>
          <Blockquote className="subtext" highContrast color="grass">
            Connect AWS and Slack for real-time cost updates in your channel by
            providing your AWS credentials and the Slack Webhook URL.
          </Blockquote>
          <div className="integrations">
            <div className="integration-label">
              Aws Integration
              <QuestionMarkCircledIcon
                className="question-mark"
                onClick={() => {
                  setShowInfoPage(true);
                  setShowCurrentInfoPage(IntegrationPhaseProps.AWS);
                }}
              />
            </div>
            <div className="icons">
              <Badge
                color={
                  data && data.access_key && data.secret_key ? 'green' : 'red'
                }
              >
                {data && data.access_key && data.secret_key
                  ? 'Connected'
                  : 'Disconnected'}
              </Badge>
              {data &&
                (data.access_key || data.secret_key || data.slack_webhook) && (
                  <Button
                    onClick={() => {
                      setIsEdit(true);
                      setIntegrationPhase(IntegrationPhaseProps.AWS);
                      setOpenDialog(true);
                    }}
                    variant="surface"
                    color="gray"
                    className="edit-btn"
                  >
                    <Pencil1Icon className="edit-icon" />
                  </Button>
                )}
            </div>
          </div>
          <div className="integrations">
            <div className="integration-label">
              Slack Integration
              <QuestionMarkCircledIcon
                className="question-mark"
                onClick={() => {
                  setShowInfoPage(true);
                  setShowCurrentInfoPage(IntegrationPhaseProps.SLACK);
                }}
              />
            </div>
            <div className="icons">
              <Badge color={data && data.slack_webhook ? 'green' : 'red'}>
                {data && data.slack_webhook ? 'Connected' : 'Disconnected'}
              </Badge>
              {data &&
                (data.access_key || data.secret_key || data.slack_webhook) && (
                  <Button
                    onClick={() => {
                      setIsEdit(true);
                      setIntegrationPhase(IntegrationPhaseProps.SLACK);
                      setOpenDialog(true);
                    }}
                    variant="surface"
                    color="gray"
                    className="edit-btn"
                  >
                    <Pencil1Icon className="edit-icon" />
                  </Button>
                )}
            </div>
          </div>
          <Button
            color={
              data &&
              !data.access_key &&
              !data.secret_key &&
              !data.slack_webhook
                ? 'violet'
                : 'red'
            }
            className="btn"
            onClick={() =>
              data &&
              !data.access_key &&
              !data.secret_key &&
              !data.slack_webhook
                ? setIntegrationPhase(IntegrationPhaseProps.AWS)
                : handleDisconnect()
            }
          >
            {data && !data.access_key && !data.secret_key && !data.slack_webhook
              ? 'Integrate'
              : 'Disconnect'}
          </Button>
        </div>
      </Card>
    );
  };

  const handleCase = (): JSX.Element => {
    switch (integrationPhase) {
      case 'AWS':
        return (
          <AwsInputCard
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            data={data}
            setIntegrationPhase={setIntegrationPhase}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setShowInfoPage={setShowInfoPage}
            setShowCurrentInfoPage={setShowCurrentInfoPage}
          />
        );
      case 'SLACK':
        return (
          <SlackInputCard
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            data={data}
            setIntegrationPhase={setIntegrationPhase}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setShowInfoPage={setShowInfoPage}
            setShowCurrentInfoPage={setShowCurrentInfoPage}
          />
        );
      default:
        return DefaultCard();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="AwsCredentials">
        <div className="navbar">
          <div className="nav-items">
            <Slack className="slack" />
          </div>
          <div className="nav-items">
            <Button
              className="cursor-pointer"
              color="red"
              variant="surface"
              onClick={() => {
                authApis.logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        <div
          className={`card-container ${
            showInfoPage ? 'card-open' : 'card-close'
          }`}
        >
          <div
            className={`integration-container ${
              currentInfoPage !== IntegrationPhaseProps.DEFAULT &&
              (showInfoPage
                ? 'integration-container-open'
                : 'integration-container-close')
            }`}
          >
            {handleCase()}
          </div>
          <div
            className={`info-container ${
              currentInfoPage !== IntegrationPhaseProps.DEFAULT &&
              (showInfoPage ? 'grow' : 'shrink')
            }`}
          >
            <div
              className={`info-box ${
                showInfoPage ? 'info-box-open' : 'info-box-close'
              }`}
            >
              <div className="close-container">
                <Cross1Icon
                  className="close"
                  onClick={() => {
                    setIntegrationPhase(IntegrationPhaseProps.DEFAULT);
                    setShowInfoPage(false);
                  }}
                />
              </div>
              <div className="info">
                {currentInfoPage === IntegrationPhaseProps.AWS ? (
                  <AWSInstructions />
                ) : (
                  <SlackInfoCard />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AwsCredentials;
