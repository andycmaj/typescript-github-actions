# Healthbot scenario sync and approval automation

## What is this?

This repo contains and executes automation that polls a 
Healthbot DEV instance for any scenario changes and creates change approval 
pull requests.

These pull requests can then be approved by anyone listed in the `APPROVERS` [secret](https://github.com/providenceinnovation/github-actions-healthbot/settings/secrets).

Once approved, the changes will be promoted to the environment mapped to the `master` branch (`STAGING`, for now).

## Example

[Example approval PR](https://github.com/providenceinnovation/github-actions-healthbot/pull/11)

## Workflow

The following is the workflow for making Healthbot Scenario changes.

* *CHANGER*: make change in DEV
* *AUTOMATION*: every 5 minutes, automation polls the DEV instance and sees that there was a change and creates a pull request from DEV -> STAGING
* *TESTERS/APPROVERS*: slack is notified that there's a new change detected. APPROVERS test in DEV and either approve or reject the PR.
* either approve or reject
  * *APPROVER*: if approved, merge the PR
    * *AUTOMATION*: the automation will deploy merged changes to STAGING
  * *APPROVER*: if rejected, close the PR
    * *AUTOMATION*: DONE
