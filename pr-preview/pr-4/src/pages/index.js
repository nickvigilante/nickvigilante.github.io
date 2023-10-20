import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Terminal.module.css';
import '../styles/globals.css';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();

    let output = '';

    let commandArr = command.toLowerCase().split(" ");

    if (command === 'foo') {
      output = 'bar';
    } else if (command === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else if (command === 'nick') {
      output = `Usage: nick command [options]
       nick help command [options]
Commands:

  github   - Go to Nick's GitHub profile
  linkedin - Go to Nick's LinkedIn profile
`;
    } else if (command === 'nick github') {
      output = 'whatever';
      setHistory([...history, { input: command, output }]);
      window.location.href = 'https://www.github.com/nickvigilante';
      return;
    } else if (command === '') {
      // do nothing
    } else {
      output = `nicksh: command not found: ${command}`
    }

    setHistory([...history, { input: command, output }]);
    setCommand('');
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        Nick Vigilante
      </div>
      <div className={styles.commandBody}>
        {history.map((item, idx) => (
          <div key={idx}>
            <div>
              <span className={styles.prompt}>$</span> {item.input}
            </div>
            {item.output && <div>{item.output}</div>}
          </div>
        ))}
        <div>
          <span className={styles.prompt}>$ </span>
          <input 
            type="text" 
            value={command} 
            onChange={(e) => setCommand(e.target.value)} 
            className={styles.input}
            ref={inputRef}
            onKeyDown={e => e.key === 'Enter' && handleCommand(e)}
          />
        </div>
      </div>
    </div>
  );
}
