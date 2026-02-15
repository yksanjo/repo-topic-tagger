#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('child_process');

const topicMap = { api: 'rest-api', cli: 'cli-tool', dashboard: 'dashboard', scraper: 'web-scraping', agent: 'ai-agent', mcp: 'mcp-server', quantum: 'quantum-computing' };

async function main() {
  console.log(chalk.cyan('\n🏷️ Repo Topic Tagger v1.0.0\n'));
  const repos = JSON.parse(execSync('gh repo list yksanjo --limit 100 --json name', { encoding: 'utf8' }));
  for (const repo of repos) {
    const tags = [];
    for (const [key, topic] of Object.entries(topicMap)) if (repo.name.includes(key)) tags.push(topic);
    if (tags.length) {
      console.log(chalk.blue(`${repo.name}: ${tags.join(', ')}`));
      try { execSync(`gh repo edit yksanjo/${repo.name} --add-topic ${tags.join(' ')}`, { encoding: 'utf8' }); console.log(chalk.green('✓ Tagged')); } 
      catch { console.log(chalk.red('✗ Failed')); }
    }
  }
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
