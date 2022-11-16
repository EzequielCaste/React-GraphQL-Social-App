import React from 'react';
import {GITHUB_REPOSITORY} from '../lib/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedin, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="ui  vertical footer segment">
      <div className="ui center aligned container horizontal small divided link list">
        <div className="">
          &copy; 2022 Ezequiel Castellanos{' '}
          <a
            href="https://twitter.com/Ezequiel_Caste"
            rel="noopener noreferrer"
            target="_blank"
          >
            
            <FontAwesomeIcon
              size="1x"
              className="text-gray-200"
              icon={faTwitterSquare}
            />

            <i className="fab fa-twitter-square"></i>
          </a>{' '}
          <a
            href="https://www.linkedin.com/in/ezequiel-castellanos"
            rel="noopener noreferrer"
            target="_blank"
          >
            
            <FontAwesomeIcon
              size="1x"
              className="text-gray-200"
              icon={faLinkedin}
            />
          </a>
        </div>
        <a
          href={`${GITHUB_REPOSITORY}`}
          className="font-medium hover:underline"
        >
          View code on GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
