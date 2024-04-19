# Sync Secrets to AWS Action

This action takes a list of secrets and sends them to AWS Secrets Manager. It
allows you to use Github Secrets as the source of truth for your secrets, and
sync them to Secrets Manager for use in ECS/EKS or other places as part of your
continuous deployment pipeline.

## Prerequisites

This action assumes that you have already logged in to AWS. Typically this will
be done using the [Configure AWS Credentials
action](https://github.com/aws-actions/configure-aws-credentials).

## Inputs

### `secret-arn`

**Required** The ARN of the Secrets Manager secret that should be updated.
*Please note that the secret needs to be created before this action is run for
the first time.*

### `secret-values`

**Required** The secrets that should be sent to Secrets Manager, specified in
KEY=value format with one secret per line. See the example usage.


## Example usage

```yaml
uses: dnsbty/sync-secrets-to-aws-action@v1
with:
  secret-arn: ${{ vars.SECRET_ARN }}
  secret-values: |
    SECRET1=${{ secrets.SECRET1 }}
    SECRET2=${{ secrets.SECRET2 }}
    SECRET3=${{ secrets.SECRET3 }}
```

