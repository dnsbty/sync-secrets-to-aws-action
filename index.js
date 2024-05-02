import core from '@actions/core';
import { PutSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

async function run() {
  try {
    const secretArn = core.getInput('secret-arn', { required: true });
    const secretsText = core.getInput('secret-values', { required: true });

    // Get secrets into {key: value} object
    const secretStrings = secretsText.split('\n');
    const secrets = secretStrings.reduce((acc, str) => {
      const [key, ...value] = str.split('=');
      acc[key] = value.join('=');
      return acc;
    }, {});

    // Send the secrets to Secrets Manager
    const client = new SecretsManagerClient();
    const command = new PutSecretValueCommand({
      SecretId: secretArn,
      SecretString: JSON.stringify(secrets),
    });
    const { VersionId } = await client.send(command);
    console.log(`Secrets successfully updated with version ID: ${VersionId}`)
  } catch ({ name, message }) {
    switch (name) {
      case 'CredentialsProviderError':
        core.setFailed('AWS credentials could not be found. Please make sure you configured credentials before calling this action.');
        break;
      default:
        core.setFailed(message);
        break;
    }
  }
}

run();
