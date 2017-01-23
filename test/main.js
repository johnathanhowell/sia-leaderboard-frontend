import React from 'react'
import { List } from 'immutable'
import { mount } from 'enzyme'
import { jsdom } from 'jsdom'
import { expect } from 'chai'
import Leaderboard from '../src/leaderboard.js'

global.document = jsdom('')
global.window = document.defaultView

const testEntries = List([
	{ name: 'testuser1', numBytes: 1e9, lastUpdated: new Date()},
	{ name: 'testuser2', numBytes: 1e9*5, lastUpdated: new Date()},
	{ name: 'testuser3', numBytes: 1e9*2, lastUpdated: new Date()},
	{ name: 'testuser9', numBytes: 1e9*0.5, lastUpdated:  new Date()},
	{ name: 'testuser5', numBytes: 1e9*0.2, lastUpdated: new Date()},
])

describe('leaderboard', () => {

	const leaderboardComponent = mount(<Leaderboard entries={testEntries} />)
	const leaderboardEntryComponents = leaderboardComponent.find('LeaderboardEntry')

	it('renders a div with correct number of entries', () => {
		expect(leaderboardEntryComponents.length).to.equal(testEntries.size)
	})
	it('properly renders entry names', () => {
		leaderboardEntryComponents.forEach((entry, idx) => {
			expect(entry.find('#name').text()).to.equal(testEntries.get(idx).name)
		})
	})
	it('properly renders entry bytes', () => {
		leaderboardEntryComponents.forEach((entry, idx) => {
			const expectedText = (testEntries.get(idx).numBytes/1e9).toString() + ' GB'
			expect(entry.find('#numbytes').text()).to.equal(expectedText)
		})
	})
	it('properly renders entry timestamps', () => {
		leaderboardEntryComponents.forEach((entry, idx) => {
			expect(entry.find('#timestamp').text()).to.equal('Last Updated: ' + testEntries.get(idx).lastUpdated.toString())
		})
	})
})
