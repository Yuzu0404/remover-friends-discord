const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })

const chalk = require('chalk')
const readline = require('readline-sync')
const log = console.log

console.clear()
log(chalk.cyan(`                                                                    
╔╗  ╔╗                               
║╚╗╔╝║                                 
╚╗╚╝╔╝╔╗╔╗╔═══╗╔╗╔╗    ╔═╗╔══╗╔╗╔╗╔══╗╔╗╔╗╔══╗╔═╗
 ╚╗╔╝ ║║║║╠══║║║║║║    ║╔╝║╔╗║║╚╝║║╔╗║║╚╝║║╔╗║║╔╝
  ║║  ║╚╝║║║══╣║╚╝║    ║║ ║║═╣║║║║║╚╝║╚╗╔╝║║═╣║║
  ╚╝  ╚══╝╚═══╝╚══╝    ╚╝ ╚══╝╚╩╩╝╚══╝ ╚╝ ╚══╝╚╝ 
`))

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`)

    const friends = client.relationships.cache.filter(relationshipType => relationshipType === 1) // 1 = friend

    console.log(`\nVous avez ${chalk.bold(friends.size)} amis`)
    console.log('Démarrage du processus de nettoyage de la liste d’amis. Nous ne supprimerons aucun ami sans votre contribution directe!\n')

    for (const friend of friends) {
        const friendId = friend[0]
        const user = await client.users.fetch(friendId, { force: true })

        const yn = readline.keyInYN(`Voulez-vous retirer ${chalk.bold(user.tag)} des amis ?`)
        if (yn) {
            await user.unFriend()
            console.log(` Retirer ${chalk.bold.cyan(user.tag)}`)
        } else {
            console.log(` Passer ${chalk.bold.cyan(user.tag)}`)
        }
    }

    console.log('Vous avez plus personne a retirer de vos amis !')
    process.exit()
})

async function login() {
    const token = readline.question('Token: ', { hideEchoBack: true })

    console.log('connexion en cours')

    client.login(token).catch(err => {
        console.log(chalk.red(err))
        login()
    })
}

login()
