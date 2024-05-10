import { handlePath } from '@/utils/index'
import { Command } from 'commander'
import fs from 'fs'

const program = new Command()

program.name('Yuu').description('CLI for convenient tools command').version('1.0.0')
const commandFiles = fs.readdirSync(handlePath('./commands', __dirname)).filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { default: command } = require(handlePath(`./commands/${file}`, __dirname))

  command(program)
}

program.parse()
