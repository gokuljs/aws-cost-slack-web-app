import { ScrollArea, Text } from '@radix-ui/themes';
import './AwsInfoPage.scss';
import { CopyIcon } from '@radix-ui/react-icons';
const AWSInstructions: React.FC = () => {
  const awsConfig = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "iam:ListAccountAliases",
                "ce:GetCostAndUsage"
            ],
            "Resource": "*"
        }
    ]
  }`;

  return (
    <ScrollArea type="auto" scrollbars="vertical">
      <Text>
        <div className="instructions-container">
          <h1 className="heading">
            Instructions for AWS Access Key ID and Secret Access Key
          </h1>
          <ol>
            <li>
              <h2>Sign In to AWS Management Console</h2>
              <p>
                Open your preferred web browser and navigate to the{' '}
                <a
                  className="link"
                  href="https://aws.amazon.com/console/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AWS Management Console
                </a>
                . Enter your login credentials to sign in.
              </p>
            </li>
            <li>
              <h2>Access IAM Console</h2>
              <p>
                In the AWS Management Console, locate the “Find Services” search
                bar. Type{' '}
                <a
                  className="link"
                  href="https://console.aws.amazon.com/iam/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  “IAM”
                </a>{' '}
                and select it from the dropdown menu.
              </p>
            </li>
            <li>
              <h2>Navigate to Users</h2>
              <p>
                In the IAM dashboard, choose “Users” from the navigation pane.
              </p>
            </li>
            <li>
              <h2>Create a New User</h2>
              <ol>
                <li>Click on “Add user”.</li>
                <li>Enter the desired username in the “User name” field.</li>
                <li>Review your settings and click “Create user”.</li>
              </ol>
            </li>
            <li>
              <h2>Add a Custom Inline Policy:</h2>
              <ol>
                <li>
                  After user creation, click on the newly created user’s name to
                  view the user details.
                </li>
                <li>Navigate to the “Permissions” tab.</li>
                <li>
                  Click on the ‘Add Permission’ button, and then select ‘Create
                  Inline Policy.
                </li>
                <li>
                  You will be redirected to the policy creation page. In the
                  Policy Editor tab, select ‘JSON.’ Then, copy and paste the
                  provided JSON policy into the editor, which is provided below.
                </li>
                <li>
                  Click Next give your policy a name, and click ‘Create Policy’.
                </li>
                <li>
                  Once the policy has been created, it will automatically be
                  attached to the IAM user.
                </li>
              </ol>
              <div className="json-box">
                <div className="json-content">
                  <div
                    className="clipboard"
                    onClick={() => {
                      navigator.clipboard.writeText(awsConfig);
                    }}
                  >
                    <CopyIcon />
                  </div>

                  <pre>
                    <code>{awsConfig}</code>
                  </pre>
                </div>
              </div>
            </li>
            <li>
              <h2>Generate Access Keys</h2>
              <ol>
                <li>
                  After user creation, click on the newly created user’s name.
                </li>
                <li>
                  Go to the “Security credentials” tab and in the “Access keys”
                  section, click “Create access key”.
                </li>
                <li>
                  (Optional) Add a description in the “Description” field, and
                  click “Create access key”.
                </li>
                <li>
                  Download the .csv file or copy the “Access key ID” and “Secret
                  access key” and store them securely. Click “Done”.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </Text>
    </ScrollArea>
  );
};

export default AWSInstructions;
