import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Terminal.module.css';
import '../styles/globals.css';
import * as commands from '../app/commands.js';

export default function Home() {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(null);
  const [isHistoryTraversal, setIsHistoryTraversal] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(commands.welcome);

  const handleCommand = (e, skipOutput = false) => {
    e.preventDefault();

    if (command === 'clear') {
      setWelcomeMessage('');
      setHistory([]);
    } else {
      let output = '';
      if (!skipOutput) {
        output = commands.handleCommand(command);
      }
      setHistory(prevHistory => {
        const updatedHistory = [...prevHistory, { input: command, output }]
        return updatedHistory;
      });
    }
    setCommand('');
    scrollToBottom();
    setHistoryIndex(null);
    setIsHistoryTraversal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleCommand(e);
    } else if (e.key === 'ArrowUp') {
        if (!isHistoryTraversal) {
            if (history.length > 0) {
                // Start from the last command and immediately set it
                setHistoryIndex(history.length - 1);
                setCommand(history[history.length - 1].input);
                setIsHistoryTraversal(true);
            }
        } else if (historyIndex > 0) {
            // Go one command up
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCommand(history[newIndex].input);
        }
    } else if (e.key === 'ArrowDown' && isHistoryTraversal) {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCommand(history[newIndex].input);
        } else {
            // If we're at the latest command, just clear the input
            setCommand('');
            setHistoryIndex(null);
            setIsHistoryTraversal(false);
        }
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault(); 
      handleCommand(e, true);
    } else {
        setIsHistoryTraversal(false);
    }
  };


  const handleInputChange = (e) => {
    setCommand(e.target.value);
    if (isHistoryTraversal) {
        setIsHistoryTraversal(false);
    }
  };

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      setTimeout(() => {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }, 0);
    }
  };

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
      <div className={styles.commandBody} ref={terminalBodyRef}>
        {welcomeMessage && <div>{welcomeMessage}</div>}
        {history.map((item, idx) => (
          <div key={idx}>
            <div>
              <span className={styles.prompt}>$</span> {item.input}
            </div>
            {item.output && <div>{item.output}</div>}
          </div>
        ))}
        <div className={styles.container}>
          <span className={styles.prompt}>$ </span>
          <input 
            type="text" 
            value={command} 
            onChange={handleInputChange} 
            className={styles.input}
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
