import res from '../data/resume.json';

export const resume = res;

export const commandName = resume.basics.name.split(" ")[0].toLowerCase();

const profiles = res.basics.profiles;

const profileNames = profiles.map(profile => profile.network.toLowerCase());

const validCommands = [commandName, 'pwd', 'ls', 'clear', 'man'];

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
    if (command === '') {
        return '';
    } else if (validCommands.includes(commandArr[0])) {
        console.log(profileNames);
        if (command === commandName) {
            return helpMain();
        } else if (commandArrLen >= 2 && profileNames.includes(commandArr[1])) {
            return openProfileUrl(commandArr[1])
        } else if (commandArrLen >= 2 && commandArr[0] === commandName) {
            switch (commandArr[1]) {
                case "basics":
                    return basics;
                case "work":
                    return "this is work";
                case "volunteer":
                    return volunteer();
                case "education":
                    return "this is work";
                case "skills":
                    return "this is basics";
                case "languages":
                    return languages();
                case "interests":
                    return "this is basics";
                case "help":
                    if (commandArrLen > 2) {
                        switch(commandArr[2]) {
                            case "basics":
                                return `Usage: ${commandName} basics`;
                            case "work":
                                return `Usage: ${commandName} work [options]`;
                            case "volunteer":
                                return volunteer();
                            case "education":
                                return "this is work";
                            case "skills":
                                return "this is basics";
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
                    let output = `${commandName}: invalid command: ${commandArr[1]}\n`;
                    output += helpMain();
                    return output;
            }
        }
    } else {
        return `fakesh: command not found: ${commandArr[0]}`
    }
}

export const openProfileUrl = function (network) {
    const profile = profiles.find(p => p.network.toLowerCase() === network);
    if (profile !== undefined) {
        window.open(profile.url, '_blank');
    }
    return `Going to ${profile.network}...`
}

export const helpMain = function () {
    let output = `Usage: ${commandName} command [options]
       ${commandName} help command [options]

Available commands:

`;
    for (let key in resume) {
        output += `- ${key}\n`;
    }
    for (let profile of resume["basics"]["profiles"]) {
        output += `- ${profile.network.toLowerCase()}\n`;
    }

    return output;
};

const basics = `${resume.basics.name}, ${resume.basics.title}\n\n${resume.basics.summary}`

const languages = function () {
    let output = `Spoken languages:\n\n`;
    for (let language of resume["languages"]) {
        output += `- ${language.language} (${language.proficiency})\n`;
    }
    return output;
}

const volunteer = function () {
    let output = `Volunteer work:\n\n`;
    for (let language of resume["languages"]) {
        output += `- ${language.language} (${language.proficiency})\n`;
    }
    return output;
}