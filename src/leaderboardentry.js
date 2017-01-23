import React, { PropTypes } from 'react'

const entryStyle = {
}

const LeaderboardEntry = ({name, numBytes, lastUpdated, groups}) => (
	<div style={entryStyle}>
		<div id="name">{name}</div>
		<div id="numbytes">{numBytes/1e9} GB</div>
		<div id="timestamp">Last Updated: {lastUpdated.toString()}</div>
		<div id="groups">Groups: {
			groups.reduce((grouptext, groupname) =>
				grouptext === '' ? groupname : grouptext + ', ' + groupname, '')
		}
		</div>
	</div>
)

LeaderboardEntry.propTypes = {
	name: PropTypes.string.isRequired,
	numBytes: PropTypes.number.isRequired,
	lastUpdate: PropTypes.instanceOf(Date).isRequired,
	groups: PropTypes.instanceOf(Array).isRequired,
}

export default LeaderboardEntry

