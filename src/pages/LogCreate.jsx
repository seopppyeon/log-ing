import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { ChevronLeft } from 'lucide-react';
import { strings } from '../constants/strings';
import './LogCreate.css';

const LogCreate = () => {
  const navigate = useNavigate();
  const addLog = useStore((state) => state.addLog);

  const [category, setCategory] = useState('Scuba');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxDepth, setMaxDepth] = useState('');
  
  // Scuba specific
  const [startPressure, setStartPressure] = useState('');
  const [endPressure, setEndPressure] = useState('');

  // Freediving specific
  const [relaxTime, setRelaxTime] = useState('');
  const [eqStatus, setEqStatus] = useState('Good');

  // Training specific
  const [trainingFocus, setTrainingFocus] = useState('Apnea');
  const [duration, setDuration] = useState('');

  const calculateAirConsumption = () => {
    if (!startPressure || !endPressure) return null;
    return parseInt(startPressure) - parseInt(endPressure);
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Simple random creature logic
    const creatures = category === 'Freediving' ? ['whale', 'manta', 'dolphin'] 
                    : category === 'Scuba' ? ['nemo', 'turtle', 'seahorse']
                    : ['octopus', 'squid', 'crab']; // Training creatures
    const randomCreature = creatures[Math.floor(Math.random() * creatures.length)];

    // Create coordinates as percentages (0 to 90%) to keep them on-screen across all devices
    const newLog = {
      id: Date.now().toString(),
      date,
      category,
      location,
      max_depth: maxDepth,
      earned_creature: randomCreature,
      creature_position: { 
        x: Math.random() * 90, 
        y: Math.random() * 90 
      },
      category_data: category === 'Scuba' 
        ? { start_pressure: startPressure, end_pressure: endPressure, consumption: calculateAirConsumption() }
        : category === 'Freediving'
        ? { relax_time: relaxTime, eq_status: eqStatus }
        : { focus: trainingFocus, duration: duration }
    };

    addLog(newLog);
    navigate('/list');
  };

  return (
    <div className="log-create-container">
      <div className="log-create-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2>{strings.create.title}</h2>
      </div>

      <form className="log-form glass-panel" onSubmit={handleSave}>
        <div className="form-group">
          <label>{strings.create.category}</label>
          <div className="category-toggle">
            <button 
              type="button" 
              className={`toggle-btn ${category === 'Scuba' ? 'active' : ''}`}
              onClick={() => setCategory('Scuba')}
            >Scuba</button>
            <button 
              type="button" 
              className={`toggle-btn ${category === 'Freediving' ? 'active' : ''}`}
              onClick={() => setCategory('Freediving')}
            >Freediving</button>
            <button 
              type="button" 
              className={`toggle-btn ${category === 'Training' ? 'active' : ''}`}
              onClick={() => setCategory('Training')}
            >Training</button>
          </div>
        </div>

        <div className="form-group">
          <label>{strings.create.date}</label>
          <input type="date" required className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>{strings.create.location}</label>
          <input type="text" required placeholder={strings.create.locationPlaceholder} className="input-field" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="form-group">
          <label>{strings.create.maxDepth}</label>
          <input type="number" required placeholder={strings.create.depthPlaceholder} className="input-field" value={maxDepth} onChange={(e) => setMaxDepth(e.target.value)} />
        </div>

        {category === 'Scuba' && (
          <div className="category-specific-section">
            <h3>{strings.create.scuba.pressureTitle}</h3>
            <div className="form-row">
              <div className="form-group">
                <label>{strings.create.scuba.start}</label>
                <input type="number" placeholder="200" className="input-field" value={startPressure} onChange={(e) => setStartPressure(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{strings.create.scuba.end}</label>
                <input type="number" placeholder="50" className="input-field" value={endPressure} onChange={(e) => setEndPressure(e.target.value)} />
              </div>
            </div>
            {startPressure && endPressure && (
              <div className="consumption-result">
                {strings.create.scuba.consumption(calculateAirConsumption())}
              </div>
            )}
          </div>
        )}

        {category === 'Freediving' && (
          <div className="category-specific-section">
            <h3>{strings.create.freediving.title}</h3>
            <div className="form-group">
              <label>{strings.create.freediving.relaxTime}</label>
              <input type="number" placeholder="120" className="input-field" value={relaxTime} onChange={(e) => setRelaxTime(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{strings.create.freediving.equalization}</label>
              <select className="input-field" value={eqStatus} onChange={(e) => setEqStatus(e.target.value)}>
                <option value="Good">{strings.create.freediving.eqOptions.good}</option>
                <option value="Left Fail">{strings.create.freediving.eqOptions.leftFail}</option>
                <option value="Right Fail">{strings.create.freediving.eqOptions.rightFail}</option>
              </select>
            </div>
          </div>
        )}

        {category === 'Training' && (
          <div className="category-specific-section">
            <h3>{strings.create.training.title}</h3>
            <div className="form-group">
              <label>{strings.create.training.focus}</label>
              <select className="input-field" value={trainingFocus} onChange={(e) => setTrainingFocus(e.target.value)}>
                <option value="Apnea">{strings.create.training.focusOptions.apnea}</option>
                <option value="Stretching">{strings.create.training.focusOptions.stretching}</option>
                <option value="Cardio">{strings.create.training.focusOptions.cardio}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{strings.create.training.duration}</label>
              <input type="number" placeholder="45" className="input-field" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary submit-btn">{strings.create.saveButton}</button>
      </form>
    </div>
  );
};

export default LogCreate;
