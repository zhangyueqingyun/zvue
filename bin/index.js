#!/usr/bin/env node

const {Command} = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora')

const  program = new Command()
program.command('create <projectName>')
    .description('创建项目')
    .action(async (projectName) => {
        console.log(chalk.yellow('\n--------------- zvue ---------------'))
        const result = await inquirer.prompt([{
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称',
            default: projectName,
        }, {
            type: 'list',
            name: 'templateName',
            message: '请选择项目模板',
            choices: [
                `vue3 组件库模板`,
            ]
        }])

        let downloadUrl = 'github:zhangyueqingyun/vue-components#main';
        
        const spinner = ora('下载模板中...').start();

        download(downloadUrl, result.projectName, err => {
            if(err) {
                spinner.fail('下载失败')
            } else{
                spinner.succeed('下载成功')   
            }
            
            console.log(chalk.yellow('--------------- zvue ---------------\n'))
        })
    })

program.parse()