import styles from '../../styles/Resume.module.css';
import res from '../../data/resume-abridged.json';

export default function Home() {

    const resume = res;
    const fullName = resume.basics.name;
    const commandName = fullName.split(" ")[0].toLowerCase()
    const label = resume.basics.label;

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
            <p className={styles.subtext}>{fullName} - {label}</p>

            <h2 className={styles.header}>SYNOPSIS</h2>
            <p className={styles.subtext}><b>{commandName}</b> COMMAND [ARG...]</p>

            <h2 className={styles.header}>DESCRIPTION</h2>
            <p className={styles.subtext}><b>{commandName}</b> is an advocate for open-source everything, good documentation, and making the world a better place.</p>

            <h2 className={styles.header}>COMMANDS</h2>
            <p className={styles.subtext}><b>work</b></p>
            <p className={styles.doublesubtext}>* Supports {formatArrayToString(resume.skills.find(s => s.name === "Software Development").keywords)}</p>
            <p className={styles.triplesubtext}>--engineer</p>

            <p className={styles.subtext}><b>education</b></p>
            <p className={styles.doublesubtext}>--engineer</p>
            <p className={styles.triplesubtext}>--engineer</p>

            <p className={styles.subtext}>volunteer</p>
            <p className={styles.doublesubtext}>--engineer</p>
            <p className={styles.triplesubtext}>--engineer</p>

            <p className={styles.subtext}>skills</p>
            <p className={styles.doublesubtext}>--engineer</p>
            <p className={styles.triplesubtext}>--engineer</p>

            <p className={styles.subtext}>--engineer</p>
            <p className={styles.doublesubtext}>* Supports {formatArrayToString(resume.skills.find(s => s.name === "Software Development").keywords)}</p>
            <p className={styles.triplesubtext}>--engineer</p>

            <h2 className={styles.header}>OPTIONS</h2>
            <p className={styles.subtext}><b>-v, --verbose</b></p>
            <p className={styles.doublesubtext}>Display more details</p>


            <h2 className={styles.header}>FILES</h2>
            <p className={styles.subtext}>* Formal education</p>
            {resume.education.map((item, idx) => (
                <p key={idx} className={styles.doublesubtext}>- <a className={styles.link} href={item.url}>{item.institution}</a>: {item.studyType}, {item.area}</p>
            ))}

            <h2 className={styles.header}>AUTHOR</h2>
            <p className={styles.subtext}>E-mail: <a className={styles.link} href="mailto:hello@vigiemail.com?Subject=You're%20Hired!">hello@vigiemail.com</a> || GitHub: <a className={styles.link} href="https://www.linkedin.com/in/n-i-c-k-v/">nickvigilante</a> || LinkedIn: <a className={styles.link} href="https://www.linkedin.com/in/n-i-c-k-v/">{fullName}</a><br/></p>

        </div>
    );
}
