/**
 * Node MLB API
 * Author: Eric Stout <https://ericwstout.com>
 * Description: A Node wrapper for the new MLB Stats API.
 * Version: 0.0.1
 * License: MIT
 */

const request = require('request');

// api endpoint
const apiURL = `http://statsapi.mlb.com:80/api/v1/`;
const apiURL11 = `http://statsapi.mlb.com:80/api/v1.1/`;

// Get Current Year
const currentYear = new Date().getFullYear();

/**
 * Get a list of games. If no game date is passed (MM/DD/YYYY), gets the current day
 */
const getGames = function(gameDate = '') {
  request(apiURL+'schedule?sportId=1'+'&date='+gameDate, (error, response, body) => {
    if( error ) {
      return error;
    } else {
      return body;
    }
  })
}

/**
 * Get a list of data about teams
 * Accepts argument for singleTeamId to only return information from one team
 * Possible TODO: Allow to get multiple teams, but not all? Use case??
 * Possible TODO: Add team abbrev for easy call? `getTeams('CLE')`
 */
const getTeams = function(singleTeamId = '') {
  request(apiURL+`teams?sportId=1&teamId=${singleTeamId}`, (error, response, body) => {
    if( error ) {
      return error
    } else {
      return body
    }
  })
}

/**
 * Get Single Game Feed
 */
const getGameFeed = function(gameId) {
  request(apiURL11+`game/${gameId}/feed/live`, (error, response, body) => {
    if( error ) {
      return error
    } else {
      return body
    }
  })
}

/**
 * Get Regular Season Standings
 * Accepts League Parameter (AL/NL), and year (YYYY)
 * If no year, return current year.
 */
const getStandings = function(league, year) {
  let leagueId = '';

  if( league === 'AL' ) {
    leagueId = '103';
  } else if ( league === 'NL' ) {
    leagueId = '104';
  } else if( league !== 'AL' || league !== 'NL' ) {
    return console.error('Please enter a league. Accepted: AL / NL')
  }

  request(`${apiURL}standings?leagueId=${leagueId}&season=${year ? year : currentYear}`, (error, response, body) => {
    if( error ) {
      return error
    } else {
      return body
    }
  })
}

module.exports = {
  getGames,
  getTeams,
  getGameFeed,
  getStandings
}
