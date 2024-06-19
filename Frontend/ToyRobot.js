import React, { useState, useEffect } from 'react';

import './Toy.css';

const GRID_SIZE = 5;
const directionToArrow = {
  'NORTH': '↑',
  'EAST': '→',
  'SOUTH': '↓',
  'WEST': '←'
};

const Toy = () => {
  const [robot, setRobot] = useState({ x: null, y: null, facing: null });
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null)));
  const [report, setReport] = useState('');
  const [facing, setFacing] = useState('NORTH');

  const handleChange = (event) => {
    setFacing(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          fetch('/api/move', { method: 'POST' })
            .then(response => response.json())
            .then(data => setRobot(data));
          break;
        case 'ArrowLeft':
        case 'a':
          fetch('/api/left', { method: 'POST' })
            .then(response => response.json())
            .then(data => setRobot(data));
          break;
        case 'ArrowRight':
        case 'd':
          fetch('/api/right', { method: 'POST' })
            .then(response => response.json())
            .then(data => setRobot(data));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCellClick = (x, y) => {
    fetch('/api/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ x, y, facing })
    })
      .then(response => response.json())
      .then(data => setRobot(data));
  };

  const handleReportClick = () => {
    fetch('/api/report')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const message = `Robot Position: (${data.x}, ${data.y}), Facing: ${data.facing}`;
          setReport(message);
        }
      })
      .catch(error => {
        console.error('Error fetching report:', error);
      });
  };

  useEffect(() => {
    const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null));
    if (robot.x !== null && robot.y !== null) {
      newGrid[robot.y][robot.x] =  directionToArrow[robot.facing];
    }
    setGrid(newGrid);
  }, [robot]);

  return (
    <div className="Toy" id="toy">
      <h1>Toy Robot Coding Puzzle</h1>
      <h2>Click to place the toy on the grid</h2>
      <h2>Use your arrow keys or W,A,S to control the robot</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="facing">Select facing direction:  </label>
          <select id="facing" value={facing} onChange={handleChange}>
            <option value="NORTH">NORTH</option>
            <option value="EAST">EAST</option>
            <option value="SOUTH">SOUTH</option>
            <option value="WEST">WEST</option>
          </select>
        </form>
      </div>
      <div className="grid">
        {grid.slice().reverse().map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => (
              <div key={x} className="cell" onClick={() => handleCellClick(x, GRID_SIZE - 1 - y)}>
                {cell && <span className="robot">{cell}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button 
            onClick={handleReportClick} 
            type="button" 
            className="bg-orange-400 rounded-sm font-bold px-5 py-2 mb-3 hover:bg-red-500 text-slate-800">
          Report
        </button>
        {report && <div className="report-message">{report}</div>}
      </div>
    </div>
  );
};

export default Toy;