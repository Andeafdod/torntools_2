"use strict";

let settings, filters, version, api, userdata, torndata, stakeouts, attackHistory, notes, factiondata;
let databaseLoaded = false;
let storageListeners = {
	settings: [],
	filters: [],
	version: [],
	userdata: [],
	stakeouts: [],
	notes: [],
	factiondata: [],
};

async function loadDatabase() {
	if (databaseLoaded) return Promise.resolve();

	const database = await ttStorage.get();

	settings = database.settings;
	filters = database.filters;
	version = database.version;
	api = database.api;
	userdata = database.userdata;
	torndata = database.torndata;
	stakeouts = database.stakeouts;
	attackHistory = database.attackHistory;
	notes = database.notes;
	factiondata = database.factiondata;

	databaseLoaded = true;
	console.log("TT - Database loaded.", database);
}

// noinspection JSDeprecatedSymbols
chrome.storage.onChanged.addListener((changes, area) => {
	if (area === "local") {
		for (let key in changes) {
			switch (key) {
				case "settings":
					console.log("Settings", changes);
					settings = changes.settings.newValue;
					break;
				case "filters":
					filters = changes.filters.newValue;
					break;
				case "version":
					version = changes.version.newValue;
					break;
				case "userdata":
					userdata = changes.userdata.newValue;
					break;
				case "api":
					api = changes.api.newValue;
					break;
				case "torndata":
					torndata = changes.torndata.newValue;
					break;
				case "stakeouts":
					stakeouts = changes.stakeouts.newValue;
					break;
				case "attackHistory":
					attackHistory = changes.attackHistory.newValue;
					break;
				case "notes":
					notes = changes.notes.newValue;
					break;
				case "factiondata":
					factiondata = changes.factiondata.newValue;
					break;
			}
			if (storageListeners[key]) storageListeners[key].forEach((listener) => listener(changes[key].oldValue));
		}
	}
});
