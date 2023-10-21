import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Terminal.module.css';
import '../styles/globals.css';
import * as commands from '../app/commands.js';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();

    let output = '';

    let commandArr = command.toLowerCase().split(" ");

    if (command === 'clear') {
      setHistory([]);
    } else {
      output = commands.handleCommand(command);
      setHistory([...history, { input: command, output }]);
    }
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
        {commands.resume.basics.name}
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
