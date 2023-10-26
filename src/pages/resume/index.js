import styles from '../../styles/Resume.module.css';
import res from '../../data/resume.json';
import { getMonthAndYear } from '../../app/commands';
import Head from 'next/head';

export default function Home() {

    const resume = res;
    const fullName = resume.basics.name;
    const commandName = fullName.split(" ")[0].toLowerCase();
    const mailHref = `mailto:${resume.basics.email}?Subject=You're%20Hired!`;
    const rel = "noreferrer noopener nofollow";
    const pageTitle = `${fullName} - Resume`;

    const techWriter = {
        "work": {
            6: [0, 1, 3, 4, 6],
            5: [0, 1, 2, 3, 4],
            4: [0, 2],
            2: [1, 2, 4],
            1: [4, 3]
        },
        "skills": {
            0: [0, 1, 2, 3, 4, 5],
            1: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            2: [0, 1, 2],
            3: [0, 1, 2, 3],
            4: [0, 1, 2],
            5: [0, 1],
            7: [1, 2, 3]
        }
    };
    const softwareEngineer = {
        "work": {
            6: [0, 1, 3, 4, 6],
            5: [0, 1, 2, 3, 4],
            4: [0, 2],
            2: [1, 2, 4],
            1: [4, 3]
        },
        "skills": {
            0: [0, 1, 2, 3, 4, 5],
            1: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            2: [0, 1, 2],
            3: [0, 1, 2, 3],
            4: [0, 1, 2],
            5: [0, 1],
            7: [1, 2, 3]
        }
    };

    const softwareEngineerWork = {
        6: [0, 1, 3, 4, 6],
        5: [0, 1, 2, 3, 4],
        4: [0, 2],
        2: [1, 2, 4],
        1: [4, 3]
    };

    const highlights = techWriter;

    Object.entries(highlights["work"]).map(([key, val], idx) => (
        console.log(`key: ${key}, val: ${val}, idx: ${idx}`)
    ))

    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
            </Head>
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
                {Object.entries(highlights["work"]).map(([key, val], idx) => (
                    <div key={idx}>
                    <p>Key: {key}</p>
                    <p>Value: {val}</p>
                  </div>
                ))}

                for (let ykey in highlights["work"]) {
                        <p>Key: {ykey}, val: {highlights["work"][ykey]}</p>
                }
                {Object.keys(highlights["work"]).map((val, idx) => (
                    <div key={idx}>
                        <p className={styles.doublesubtext}>* {resume.work[val].position}, <a className={styles.link} href={resume.work[val].url} target='_blank' rel={rel}>{resume.work[val].name}</a> ({getMonthAndYear(resume.work[val].startDate)} - {getMonthAndYear(resume.work[val].endDate)})</p>
                        <p className={styles.triplesubtext}>{resume.work[val].summary}. Highlights:</p>
                        {highlights["work"][val].map((val2, idx2) => (
                            <p key={idx2} className={styles.triplesubtext}>- {resume.work[val].highlights[val2]}</p>
                        ))}
                        <br/>
                    </div>
                ))}

                {/* 
                {Object.keys(highlights["work"]).map((val, idx) => (
                    <div key={idx}>
                        <p className={styles.doublesubtext}>* {resume.work[val].position}, <a className={styles.link} href={resume.work[val].url} target='_blank' rel={rel}>{resume.work[val].name}</a> ({getMonthAndYear(resume.work[val].startDate)} - {getMonthAndYear(resume.work[val].endDate)})</p>
                        <p className={styles.triplesubtext}>{resume.work[val].summary}. Highlights:</p>
                        {highlights["work"][val].map((val2, idx2) => (
                            <p key={idx2} className={styles.triplesubtext}>- {resume.work[val].highlights[val2]}</p>
                        ))}
                        <br/>
                    </div>
                ))}
                */}

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
                <div className={styles.authorcontainer}>
                    <p>E-mail: <a className={styles.link} href={mailHref}>{resume.basics.email}</a> </p>
                    {resume.basics.profiles.map((item, idx) => (
                        <p key={idx}>&nbsp;|| {item.network}: <a className={styles.link} href={item.url} target='_blank' rel={rel}>{item.username}</a></p>
                    ))}
                </div>
            </div>
        </div>
    );
}
