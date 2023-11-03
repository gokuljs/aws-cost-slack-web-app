import { ScrollArea, Text } from '@radix-ui/themes';
import './SlackInfoCard.scss';
const SlackInfoCard: React.FC = () => {
  return (
    <ScrollArea type="auto" scrollbars="vertical">
      <Text>
        <div className="instructions-container">
          <h1 className="heading">Setting Up a Slack Incoming Webhook URL</h1>
          <ol>
            <li>
              <h2>Install Incoming Webhooks App</h2>
              <p>
                Go to the{' '}
                <a
                  className="link"
                  href="https://slack.com/apps/A0F7XDUAZ-incoming-webhooks"
                  target="_blank"
                >
                  Incoming Webhooks page
                </a>{' '}
                on the Slack App Directory.
              </p>
            </li>
            <li>
              <h2>Select a Slack Channel</h2>
              <ol>
                <li>
                  Choose a Slack channel where you want the incoming messages to
                  be posted. This can be an existing channel or a new one that
                  you create.
                </li>
                <li>Click "Add Incoming Webhooks Integration."</li>
              </ol>
            </li>
            <li>
              <h2> Configure the Webhook</h2>
              <ol>
                <li>
                  On the setup page, you can customize the Name, Icon, and Label
                  of the incoming webhook.
                </li>
                <li>
                  Scroll down to find the Webhook URL. This is the URL you will
                  use to send HTTP POST requests to post messages to the
                  selected Slack channel.{' '}
                  <span className="emphasis">Keep this URL secret</span>, as
                  anyone who has it can send messages to your Slack channel.
                </li>
              </ol>
            </li>
            <li>
              <h2> Save Your Settings</h2>
              <p>
                Don't forget to click "Save Settings" on the Slack setup page to
                ensure all your configurations are saved. <br /> <br />
                That's it! You've now set up and tested an incoming webhook for
                Slack. Be sure to secure your Webhook URL and only share it with
                trusted individuals and services.
              </p>
            </li>
          </ol>
        </div>
      </Text>
    </ScrollArea>
  );
};

export default SlackInfoCard;
