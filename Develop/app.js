const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = []


inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Please type the manager name"
    },
    {
      type: "input",
      name: "id",
      message: "Please type the manager id"
    }, {
      type: "input",
      name: "email",
      message: "Please type the manager email"
    }, {
      type: "input",
      name: "officenumber",
      message: "Please type the manager office"
    },
    
  ])
  .then(answers => {
    console.log(answers)
    team.push(new Manager(answers.name, answers.id, answers.email, answers.officenumber))
    console.log(team)
    menu()
  })
  .catch(error => {
    if (error.isError) {
      
    } else {
      console.log('Error') 
    }
  });


function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: 'Select a title.',
        choices: ["Intern", "Engineer", "buildHTML"]
      },
      
    ])
    .then(answers => {
      console.log(answers)
      if (answers.choice === "Intern") {
        menuIntern()
        

      } else if (answers.choice === "Engineer") {
        menuEngineer()
        
      } else {

        console.log(team)
        let html = render(team)
        fs.writeFileSync("teamtest.html", render(team), "utf-8")
        console.log(html)
      

      }


    })

}


function menuIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please type the Intern name"
      },
      {
        type: "input",
        name: "id",
        message: "Please type the Intern id"
      }, {
        type: "input",
        name: "email",
        message: "Please type the Intern email"
      }, {
        type: "input",
        name: "school",
        message: "Please type the Intern school "
      },
      
    ])
    .then(answers => {
      console.log(answers)
      team.push(new Intern(answers.name, answers.id, answers.email, answers.school))
      console.log(team)
      menu()
    })

}

function menuEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please type the Engineer name"
      },
      {
        type: "input",
        name: "id",
        message: "Please type the Engineer id"
      },
      {
        type: "input",
        name: "email",
        message: "Please type the Engineer email"
      },
      {
        type: "input",
        name: "GitHub",
        message: "Please type the Engineers' GitHub username "
      },
      
    ])
    .then(answers => {
      console.log(answers)
      team.push(new Engineer(answers.name, answers.id, answers.email, answers.school))
      console.log(team)
      menu()
    })

}

