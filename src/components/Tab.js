import React from 'react';
import Profile from './Profile';

const Tab = () => {
  const [selected, setSelected] = React.useState('oneoff');

  const isSelected = (name) => {
    return selected.includes(name);
  };

  const handleClick = (e) => {
    console.log('clicked tab', e.target.name);
    setSelected(e.target.name);
  };

  return (
    <>
      <div className="tab-container full-height-content">
        <ul className="nav-tab nav">
          <li
            className={isSelected('oneoff') ? 'active' : ''}
            onClick={handleClick}
          >
            <a href="#oneoff" name="oneoff">
              One-off Donations
            </a>
          </li>
          <li
            className={isSelected('monthly') ? 'active' : ''}
            onClick={handleClick}
          >
            <a href="#monthly" name="monthly">
              Monthly Donations
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className={isSelected('oneoff') ? 'tab-pane active' : 'tab-pane'}
            id="oneoff"
          >
            <Profile />
          </div>
          <div
            className={isSelected('monthly') ? 'tab-pane active' : 'tab-pane'}
            id="monthly"
          >
            <p>Work in progress!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
