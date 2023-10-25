import styles from '../../styles/Resume.module.css';
import res from '../../data/resume.json';
import { getMonthAndYear } from '../../app/commands';

export default function Home() {

    const resume = res;
    const fullName = resume.basics.name;
    const commandName = fullName.split(" ")[0].toLowerCase()
    const label = resume.basics.label;
    const mailHref = `mailto:${resume.basics.email}?Subject=You're%20Hired!`;
    const rel = "noreferrer noopener nofollow";

    const formatArrayToString = function(arr) {
        if (arr.length === 0) {
            return ''; // Return an empty string if the array is empty.
        } else if (arr.length === 1) {
            return arr[0]; // Return the single item if the array has only one element.
        } else {
            // Use Array.join() to concatenate all items with commas and add 'and' before the last item.
            const formattedString = arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
            return formattedString;
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.headercontainer}>
                <pre className={styles.manheader_left}>{fullName.toUpperCase()}(9)</pre>
                <pre className={styles.manheader_right}>{fullName.toUpperCase()}(9)</pre>
            </div>
            <h2 className={styles.header}>NAME</h2>
            <p className={styles.subtext}>{fullName} - {resume.basics.label} - {resume.basics.pronouns}</p>

            <h2 className={styles.header}>SYNOPSIS</h2>
            <p className={styles.subtext}><b>{commandName}</b> COMMAND [ARG...]</p>

            <h2 className={styles.header}>DESCRIPTION</h2>
            <p className={styles.subtext}><b>{commandName}</b> is an advocate for open-source everything, great docs, and making the world a better place.</p>

            <h2 className={styles.header}>COMMANDS</h2>
            <p className={styles.subtext}><b>work</b></p>
            {resume.work.slice(0, 3).map((item, idx) => (
                <div key={idx}>
                    <p className={styles.doublesubtext}>* {item.position}, <a className={styles.link} href={item.url} target='_blank' rel={rel}>{item.name}</a> ({getMonthAndYear(item.startDate)} - {getMonthAndYear(item.endDate)})</p>
                    <p className={styles.triplesubtext}>{item.summary}. Highlights:</p>
                    {item.highlights.slice(0, 3).map((item2, idx2) => (
                        <p key={idx2} className={styles.triplesubtext}>- {item2}</p>
                    ))}
                    <br/>
                </div>
            ))}

            <p className={styles.subtext}><b>skills</b></p>
            {resume.skills.map((item, idx) => (
                <div key={idx}>
                    <p className={styles.doublesubtext}>* {item.name} ({item.level}) - {resume.skills[idx].keywords.join(", ")}</p>
                </div>
            ))}
            <br/>
            <p className={styles.subtext}><b>volunteer</b></p>
            {resume.volunteer.map((item, idx) => (
                <div key={idx}>
                    <p className={styles.doublesubtext}>* {item.position}, <a className={styles.link} href={item.url} target='_blank' rel={rel}>{item.organization}</a>  ({getMonthAndYear(item.startDate)} - {getMonthAndYear(item.endDate)})</p>
                    <p className={styles.triplesubtext}>{item.summary}</p>
                </div>
                
            ))}
            <br/>
            <p className={styles.subtext}><b>education</b></p>
            {resume.education.map((item, idx) => (
                <div key={idx}>
                    <p className={styles.doublesubtext}>* <a className={styles.link} href={item.url} target='_blank' rel={rel}>{item.institution}</a>: {item.studyType}, {item.area}</p>
                    <p className={styles.triplesubtext}>{getMonthAndYear(item.startDate)} - {getMonthAndYear(item.endDate)}{item.score !== undefined ? `, GPA ${item.score}` : ''}{item.honors !== undefined ? `, ${item.honors}` : ''}</p>
                </div>  
            ))}

            <h2 className={styles.header}>OPTIONS</h2>
            <p className={styles.subtext}><b>-v, --verbose</b></p>
            <p className={styles.doublesubtext}>Display more details at <a className={styles.link} href={resume.basics.url}>{resume.basics.url}</a></p>

            <h2 className={styles.header}>AUTHOR</h2>
            <p className={styles.subtext}>E-mail: <a className={styles.link} href={mailHref}>{resume.basics.email}</a> || GitHub: <a className={styles.link} href="https://www.linkedin.com/in/n-i-c-k-v/" target='_blank' rel={rel}>nickvigilante</a> || LinkedIn: <a className={styles.link} href="https://www.linkedin.com/in/n-i-c-k-v/" target='_blank' rel={rel}>{fullName}</a><br/></p>

        </div>
    );
}
