import fs from 'node:fs';

const eventPath = process.env.GITHUB_EVENT_PATH;
const eventJson = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
const prTitle = eventJson.pull_request.title;

const isValidType = (title) =>
  /^(feat|fix|chore|refactor)(\([a-zA-Z0-9-]+\))?:\s[a-z0-9].*$/.test(title);

const validateTitle = (title) => {
  if (!isValidType(title)) {
    console.error(
      `PR title does not follow the required format "[type]: [title]".
- Example: "fix: email compatibility issue"
- Allowed types: 'feat', 'fix', 'chore', 'refactor'
- First letter of the title portion (after the colon) must be lowercased`,
    );
    process.exit(1);
  }

  console.info('PR title is valid');
};

validateTitle(prTitle);
