const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
    {
        type: "input",
        message: "Enter your GitHub username",
        name: "username"
    },
    {
        type: "input",
        message: "Project Title",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Discription",
        name: "discription"
    }
];

const file = "repoREADME.md";

function writeResponseToFile(emailValue, avatarValue, titleValue, discriptionValue) {

    const messageToAppend = `${titleValue}

[user avatar](${avatarValue})

${discriptionValue}

---

## Installation

npm install

---

## Contributing

${emailValue}`;

    fs.appendFile(file, messageToAppend, 'utf8', function (err) {
        if (err) {
            console.log('Did not work');
        } else {
            fs.readFile(file, (err, repoREADMEText) => {
                if (err) {
                  console.error(err)
                  return
                }
                console.log("repoREADMEText: " + repoREADMEText);
            })
        }
    });
}

function init() {
    inquirer
        .prompt(questions)
    .then(function(response) {
        const { username } = response;
        const { projectTitle } = response;
        const { discription } = response;
        const queryUrl = `https://api.github.com/users/${username}`;
        axios
        .get (queryUrl)
        .then (function(res) {
            const { email } = res.data;
            const { avatar_url } = res.data;
            writeResponseToFile(email, avatar_url, projectTitle, discription);
        });
    });
}

init();