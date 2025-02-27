import styles from "../../styles/Resume.module.css";
import res from "../../data/resume.json";
import { getMonthAndYear } from "../../app/commands";
import Head from "next/head";
import React from "react";

function sortDate(items) {
  return items.sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
    const dateB = b.endDate ? new Date(b.endDate).getTime() : Infinity;
    return dateB - dateA;
  });
}

export default function Home() {
  const resume = res;
  const fullName = resume.basics.name;
  const commandName = fullName.split(" ")[0].toLowerCase();
  const rel = "noreferrer noopener nofollow";
  const pageTitle = `${fullName} - Resume`;
  const isProduction = process.env.NODE_ENV === "production";
  const emailContent = isProduction ? "REDACTED" : resume.basics.email;
  const emailHref = isProduction
    ? ""
    : `mailto:${resume.basics.email}?Subject=You're%20Hired!`;

  const techWriterWork = [7, 6, 5];
  const techWriterWorkHighlights = {
    7: [0, 1, 2, 3, 4, 5, 6, 7, 8], // tiledb
    6: [0, 1, 3, 4, 6], // crl, se
    5: [0, 1, 2, 3], // crl, writer
    // 4: [0, 2],
    // 2: [1, 2, 4, 5],
  };
  const techWriterSkills = [0, 1, 2, 3, 4];
  const techWriterSkillsKeywords = {
    0: [0, 1, 2, 3, 4, 5], // tech writing
    1: [0, 1, 2, 3, 4], // soft skills
    2: [0, 1, 2, 3], // information architecture
    3: [0, 1, 2, 3, 4, 5, 6, 7, 8], // software development
    4: [0, 1, 2, 3, 4, 5], // system administration
    // 6: [1, 2, 3], // web development
  };

  const work = techWriterWork;
  const workHighlights = techWriterWorkHighlights;
  const skills = techWriterSkills;
  const skillsKeywords = techWriterSkillsKeywords;

  // const work = softwareEngineerWork;
  // const workHighlights = softwareEngineerWorkHighlights;
  // const skills = softwareEngineerSkills;
  // const skillsKeywords = softwareEngineerSkillsKeywords;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className={styles.body}>
        <div className={styles.headercontainer}>
          <pre className={styles.manheader_left}>
            {fullName.toUpperCase()}(9)
          </pre>
          <pre className={styles.manheader_right}>
            {fullName.toUpperCase()}(9)
          </pre>
        </div>
        <p className={styles.header}>NAME</p>
        <p className={styles.subtext}>
          {fullName} - {resume.basics.label} - {resume.basics.pronouns} -{" "}
          {resume.basics.location}
        </p>
        <p className={styles.hiddenATS}>Name: {fullName}</p>
        <p className={styles.hiddenATS}>Title: {resume.basics.label}</p>
        <p className={styles.hiddenATS}>Pronouns: {resume.basics.pronouns}</p>
        <p className={styles.hiddenATS}>Address: {resume.basics.location}</p>
        <p className={styles.header}>SYNOPSIS</p>
        <p className={styles.subtext}>
          <b>{commandName}</b> COMMAND [ARG...]
        </p>

        <p className={styles.header}>DESCRIPTION</p>
        <p className={styles.subtext}>
          Experienced technical writer and software engineer with expertise in
          documentation strategy, automation, and knowledge management. Proven
          ability to collaborate with cross-functional teams and improve content
          quality and discoverability.
        </p>
        <h2 className={styles.hiddenATS}>Summary</h2>
        <p className={styles.hiddenATS}>
          Additional Keywords: Technical Documentation, API Documentation,
          Agile, Scrum, Cross-functional Collaboration, DevOps, Content
          Strategy, UX Writing, Version Control, Git, CI/CD, Python Scripting,
          Technical Editing, Developer Documentation, Knowledge Management,
          Stakeholder Communication
        </p>
        <h2 className={styles.hiddenATS}>Work Experience</h2>
        <p className={styles.header}>COMMANDS</p>

        <p className={styles.subtext}>
          <b>work</b>
        </p>
        <p className={styles.hiddenATS}>
          Experience Section: Below is a list of professional work experience.
        </p>

        {work.map((val, idx) => (
          <div key={idx}>
            <p className={styles.doublesubtext_bullet}>
              {resume.work[val].position},{" "}
              <a
                className={styles.link}
                href={resume.work[val].url}
                target="_blank"
                rel={rel}
              >
                {resume.work[val].name}
              </a>{" "}
              ({getMonthAndYear(resume.work[val].startDate)} -{" "}
              {getMonthAndYear(resume.work[val].endDate)})
            </p>
            <p className={styles.triplesubtext}>
              {resume.work[val].summary}. Highlights:
            </p>
            {workHighlights[val].map((val2, idx2) => (
              <p key={idx2} className={styles.triplesubtext_bullet}>
                {resume.work[val].highlights[val2]}
              </p>
            ))}
            <br />
          </div>
        ))}
        <h2 className={styles.hiddenATS}>Skills</h2>
        <p className={styles.subtext}>
          <b>skills</b>
        </p>
        {skills.map((i, idx) => (
          <div key={idx}>
            <p className={styles.doublesubtext_bullet}>
              {resume.skills[i].name} ({resume.skills[i].level}) -{" "}
              {skillsKeywords[i]
                .map((x) => resume.skills[i].keywords[x])
                .join(", ")}{" "}
            </p>
          </div>
        ))}
        <p className={styles.hiddenATS}>
          Additional Keywords: Technical Documentation, API Documentation,
          Agile, Scrum, Cross-functional Collaboration, DevOps, Content
          Strategy, UX Writing
        </p>

        <br />
        <h2 className={styles.hiddenATS}>Volunteer Work</h2>
        <p className={styles.subtext}>
          <b>volunteer</b>
        </p>
        {sortDate(resume.volunteer).map((item, idx) => (
          <div key={idx}>
            <p className={styles.doublesubtext_bullet}>
              {item.position},{" "}
              <a
                className={styles.link}
                href={item.url}
                target="_blank"
                rel={rel}
              >
                {item.organization}
              </a>{" "}
              ({getMonthAndYear(item.startDate)} -{" "}
              {getMonthAndYear(item.endDate)})
            </p>
            <p className={styles.triplesubtext}>{item.summaryShort}</p>
          </div>
        ))}
        <br />
        <h2 className={styles.hiddenATS}>Education</h2>
        <p className={styles.subtext}>
          <b>education</b>
        </p>
        {sortDate(resume.education).map((item, idx) => (
          <div key={idx}>
            <p className={styles.doublesubtext_bullet}>
              {item.studyTypeShort}, {item.area},{" "}
              <a
                className={styles.link}
                href={item.url}
                target="_blank"
                rel={rel}
              >
                {item.institution}
              </a>
              {item.score !== undefined && item.honors !== undefined
                ? ` (${item.honors}, GPA ${item.score})`
                : ""}
            </p>
          </div>
        ))}
        <h2 className={styles.hiddenATS}>Contact Information</h2>
        <p className={styles.header}>OPTIONS</p>
        <p className={styles.subtext}>
          <b>-v, --verbose</b>
        </p>
        <p className={styles.doublesubtext}>
          Display more details at{" "}
          <a className={styles.link} href={resume.basics.url}>
            {resume.basics.url}
          </a>
        </p>

        <p className={styles.header}>AUTHOR</p>
        <div className={styles.authorcontainer}>
          <p className={styles.authortext}>
            <a className={styles.link} href={emailHref}>
              {emailContent}
            </a>
            {resume.basics.profiles.map((item, idx) => (
              <React.Fragment key={idx}>
                {" • "}
                <a
                  className={styles.link}
                  href={item.url}
                  target="_blank"
                  rel={rel}
                >
                  {item.url}
                </a>
              </React.Fragment>
            ))}
          </p>
        </div>
        <h2 className={styles.hiddenATS}>Contact Information</h2>
        <p className={styles.hiddenATS}>
          Email: {resume.basics.email} | Phone: {resume.basics.phone} | Website:{" "}
          {resume.basics.url}
        </p>
        <div className={styles.hiddenATS}>
          <p>
            LinkedIn:{" "}
            {resume.basics.profiles.find((p) => p.network === "LinkedIn")
              ?.url || "N/A"}
          </p>
          <p>
            GitHub:{" "}
            {resume.basics.profiles.find((p) => p.network === "GitHub")?.url ||
              "N/A"}
          </p>
          <p>Website: {resume.basics.url}</p>
        </div>
      </div>
    </div>
  );
}
