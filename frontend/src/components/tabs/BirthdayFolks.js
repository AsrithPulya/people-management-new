import React from 'react';

export const BirthdayFolks = () => {
   const birthdays = [];  

  return (
    <div>
      {birthdays.length === 0 ? (
        <div>No birthdays found, buddy!</div>  
      ) : (
        <div>
          {/* Here you would map through the birthdays array to display them */}
          {birthdays.map((birthday, index) => (
            <div key={index}>{birthday.name} - {birthday.date}</div>
          ))}
        </div>
      )}
    </div>
  );
};
