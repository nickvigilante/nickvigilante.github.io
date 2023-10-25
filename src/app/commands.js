import res from '../data/resume.json';

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const resume = res;

export const commandName = resume.basics.name.split(" ")[0].toLowerCase();

const profiles = resume.basics.profiles;

const profileNames = profiles.map(profile => profile.network).reduce((acc, str) => {
    acc[str.toLowerCase()] = str;
    return acc
}, {});

const validCommands = [commandName, 'help', 'welcome', 'clear', 'hello', 'hi'];

const fieldDescriptions = {
    "basics": "Basic information about me",
    "work": "My work experience",
    "volunteer": "My volunteer experience",
    "education": "My education",
    "skills": "My skills",
    "languages": "The languages I speak",
    "interests": "My hobbies and interests"
}

export const handleCommand = function (command) {
    let commandArr = command.toLowerCase().split(" ");
    let commandArrLen = commandArr.length;
    let output = '';
    let verbose = false;
    if (command === output) {
        return '';
    } else if (validCommands.includes(commandArr[0])) {
        if (command === commandName || command === 'help') {
            return helpMain();
        } else if (command === "hello" || command === "hi") {
            return "Hi there!"
        } else if (commandArrLen >= 2 && Object.keys(profileNames).includes(commandArr[1])) {
            return openProfileUrl(commandArr[1])
        } else if (commandArrLen >= 2 && commandArr[0] === commandName) {
            if (commandArrLen == 3) { 
                if (commandArr[2] === "-v" || commandArr[2] === "--verbose")
                {
                    verbose = true;
                } else {
                    output = `${commandName}: unknown flag ${commandArr[2]}`
                }
            }
            switch (commandArr[1]) {
                case "basics":
                    return basics;
                case "work":
                    return work(verbose);
                case "volunteer":
                    return volunteer(verbose);
                case "education":
                    return education(verbose);
                case "skills":
                    return skills(verbose);
                case "languages":
                    return languages();
                case "interests":
                    return interests(verbose);
                case "help":
                    if (commandArrLen > 2) {
                        switch(commandArr[2]) {
                            case "basics":
                                return `Usage: ${commandName} basics`;
                            case "work":
                                return `Usage: ${commandName} work [-v|--verbose]`;
                            case "volunteer":
                                return `Usage: ${commandName} volunteer [-v|--verbose]`;
                            case "education":
                                return `Usage: ${commandName} education [-v|--verbose]`;
                            case "skills":
                                return `Usage: ${commandName} skills [-v|--verbose]`;
                            case "languages":
                                return languages();
                            case "interests":
                                return "this is basics";
                            case "help":
                                return `Usage: ${commandName} help [command]`;
                            default:
                                return `fakesh: unknown option ${commandArr[2]}`
                        }
                    } else {
                        return helpMain();
                    }
                default:
                    output = `${commandName}: invalid command: ${commandArr[1]}\n`;
                    output += helpMain();
                    return output;
            }
        } else if (command === 'welcome') {
            return welcome;
        }
    } else {
        return `fakesh: command not found: ${commandArr[0]}`
    }
}

const openProfileUrl = function (network) {
    const profile = profiles.find(p => p.network.toLowerCase() === network);
    if (profile !== undefined) {
        window.open(profile.url, '_blank');
    }
    return `Going to ${profile.network}...`
}

const helpMain = function () {
    let output = `Usage: ${commandName} command [options]
       ${commandName} help command [options]

Available commands:

`;
    for (let key in resume) {
        output += `- ${key}: ${fieldDescriptions[key]}\n`;
    }
    for (let profile of resume["basics"]["profiles"]) {
        output += `- ${profile.network.toLowerCase()}: Open my ${profileNames[profile.network.toLowerCase()]} profile\n`;
    }

    return output;
};

const basics = `${resume.basics.name}, ${resume.basics.label}\n\n${resume.basics.summary}`

const languages = function() {
    let output = `Spoken languages:\n\n`;
    for (let language of resume["languages"]) {
        output += `- ${language.language} (${language.proficiency})\n`;
    }
    return output;
}

const work = function(verbose = false) {
    let w_hist = resume["work"]
    let output;
    if (w_hist.length > 0) {
        output = `Work experience:\n\n`;
        if (verbose === true) {
            output += `---\n\n`;
            for (let w of w_hist) {
                output += `${w.position}, ${w.name}\n`;
                output += `Summary: ${w.summary}\n`
                output += `URL: ${w.url}\n`
                output += `Start Date: ${w.startDate}\n`
                output += `End Date: ${w.endDate}\n`
                output += `Highlights:\n\n`
                for (let h of w.highlights) {
                    output += `- ${h}\n`
                }
                output += `\n---\n\n`
            }
        } else {
            for (let w of w_hist) {
                output += `- ${w.position}, ${w.name} (${getMonthAndYear(w.startDate)} - ${getMonthAndYear(w.endDate)})\n`;
            }
            output += `\nTip: Try adding -v or --verbose at the end to list highlights and detailed dates.\n`
        }
    } else {
        output = "No volunteer work found!"
    }
    return output;
}

const volunteer = function(verbose = false) {
    let v_hist = resume["volunteer"]
    let output;
    if (v_hist.length > 0) {
        output = `Volunteer work:\n\n`;
        if (verbose === true) {
            output += `---\n\n`;
            for (let v of v_hist) {
                output += `${v.position}, ${v.organization}\n`;
                output += `Summary: ${v.summary}\n`
                output += `URL: ${v.url}\n`
                output += `Start Date: ${v.startDate}\n`
                output += `End Date: ${v.endDate}\n`
                output += `Highlights:\n\n`
                for (let h of v.highlights) {
                    output += `- ${h}\n`
                }
                output += `\n---\n\n`
            }
        } else {
            for (let v of v_hist) {
                output += `- ${v.position}, ${v.organization} (${getMonthAndYear(v.startDate)} - ${getMonthAndYear(v.endDate)})\n`;
            }
            output += `\nTip: Try adding -v or --verbose at the end to list highlights and detailed dates.\n`
        }
    } else {
        output = "No volunteer work found!"
    }
    return output;
}

const education = function(verbose = false) {
    let e_hist = resume["education"]
    let output;
    if (e_hist.length > 0) {
        output = `Education:\n\n`;
        if (verbose === true) {
            output += `---\n\n`;
            for (let e of e_hist) {
                output += `${e.studyType}, ${e.area}, ${e.institution}\n`;
                output += `GPA: ${e.score}\n`
                output += `Start Date: ${e.startDate}\n`
                output += `Graduation Date: ${e.endDate}\n`
                output += `URL: ${e.url}\n`
                output += `Classes:\n\n`
                for (let c of e.courses) {
                    output += `- ${c}\n`
                }
                output += `\n---\n\n`
            }
        } else {
            for (let e of e_hist) {
                output += `- ${e.studyType}, ${e.area}, ${e.institution} (${getMonthAndYear(e.startDate)} - ${getMonthAndYear(e.endDate)})\n`;
            }
            output += `\nTip: Try adding -v or --verbose at the end to list more detailed information.\n`
        }
    } else {
        output = "No education found!"
    }
    return output;
}

const interests = function(verbose = false) {
    let iArr = resume['interests'];
    let output;
    if (iArr.length > 0) {
        output = `Interests:\n\n`;
        if (verbose === true) {
            for (let i of iArr) {
                output += `- ${i.name}\n`;
                if (i['keywords'] !== undefined) {
                    for (let k of i.keywords) {
                        output += `  - ${k}\n`
                    }
                }
            }
        } else {
            for (let i of iArr) {
                output += `- ${i.name}\n`;
            }
            output += `\nTip: Try adding -v or --verbose at the end to list more detailed information.\n`
        }
    } else {
        output = "No interests found!"
    }
    return output;
}

const skills = function(verbose = false) {
    let sArr = resume['skills'];
    let output;
    if (sArr.length > 0) {
        output = `Skills:\n\n`;
        if (verbose === true) {
            for (let s of sArr) {
                output += `- ${s.name} (${s.level})`;
                if (s['keywords'] !== undefined) {
                    output += `:\n`
                    for (let k of s.keywords) {
                        output += `  - ${k}\n`
                    }
                } else {
                    output += `\n`;
                }
            }
        } else {
            for (let s of sArr) {
                output += `- ${s.name} (${s.level})\n`;
            }
            output += `\nTip: Try adding -v or --verbose at the end to list more detailed information.\n`
        }
    } else {
        output = "No skills found!"
    }
    return output;
}

export const welcome = `Welcome to my portfolio site! My name is ${resume.basics.name}.

To get started, you can run some basic commands:

${commandName} basics
      Get high-level details about me

${commandName} work -v
      Get my work history

welcome
      Show this message
`

function getMonthAndYear(dateString) {
    const isYearMonthFormat = /^\d{4}-\d{2}$/.test(dateString);
    if (isYearMonthFormat) {
        dateString += '-01';
    }
    const date = new Date(dateString);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${monthName} ${year}`;
}