import React from 'react';

import footerStyles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={footerStyles.footerSection}>
      <div className='gridWrapper'>
        <div className={footerStyles.left}>
          <p>Made in Toronto by Derek Murr, <a href='https://twitter.com/derekmurr' target='_blank' rel='noopener noreferrer'>@derekmurr</a></p>
        </div>
        <div className={footerStyles.right}>
          <p>&copy; 2020. Thanks for stopping by!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;