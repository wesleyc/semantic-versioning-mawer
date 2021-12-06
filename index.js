function compareVersions(v1, v2) {
	if (!isValidVersionType(v1) || !isValidVersionType(v2)) {
		return 'Invalid version type';
	}
		
	if (!isValidVersionFormat(v1) || !isValidVersionFormat(v2)) {
		return 'Invalid version format';
	}
		
	const fullVersion1 = v1.split('-');
	const fullVersion2 = v2.split('-');
	
	const [coreVersion1, preReleaseVersion1 = ''] = fullVersion1;
	const [coreVersion2, preReleaseVersion2 = ''] = fullVersion2;
	
	let coreVersionResult = compareCoreVersions(coreVersion1, coreVersion2);
	
	switch (coreVersionResult) {
		// version 1 has higher core version
		case 1: 
			return v1;
		// version 2 has higher core version		
		case -1:
			return v2;
		// both versions have the same core version, need to compare pre-release version
		case 0:
			let preReleaseVersionResult = comparePreReleaseVersion(preReleaseVersion1, preReleaseVersion2);
			
			switch (preReleaseVersionResult) {
				case 1:
					return v1;
				case -1:
					return v2;
				case 0:
					return v1;
			}
			
	}
}

function compareCoreVersions(coreVersion1, coreVersion2) {
	const v1Parts = coreVersion1.split('.');
	const v2Parts = coreVersion2.split('.');
	
	for (var i = 0; i < v1Parts.length; ++i) {		
		if (v1Parts[i] === v2Parts[i]) {
			continue;
		}
		else if (v1Parts[i] > v2Parts[i]) {
			return 1;
		}
		else {
			return -1;
		}		
	}
	
	return 0;
}

function comparePreReleaseVersion(preReleaseVersion1, preReleaseVersion2) {
	if (preReleaseVersion1 === '' && preReleaseVersion2 === '') {
		return 1;
	} else if (preReleaseVersion1 === '' && preReleaseVersion2) {
		return 1;
	} else if (preReleaseVersion1 && preReleaseVersion2 === '') {
		return -1;
	} else {
		const preReleaseVersion1Parts = preReleaseVersion1.split('.');
		const preReleaseVersion2Parts = preReleaseVersion2.split('.');
		
		var maxLength = Math.max(preReleaseVersion1Parts.length, preReleaseVersion2Parts.length);
		
		for (var i = 0; i < maxLength; ++i) {
			preReleaseVersion1Parts[i] = preReleaseVersion1Parts[i] === undefined ? '' : preReleaseVersion1Parts[i];
			preReleaseVersion2Parts[i] = preReleaseVersion2Parts[i] === undefined ? '' : preReleaseVersion2Parts[i];
			
			if (preReleaseVersion1Parts[i] === preReleaseVersion2Parts[i]) {
				continue;
			} else if (preReleaseVersion1Parts[i].localeCompare(preReleaseVersion2Parts[i]) === 1)  {
				return 1;
			} else {
				return -1;
			}
		}		
		return 0;
	}
}

function isValidVersionFormat(version) {
	const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
				
	return regex.test(version);
}

function isValidVersionType(version) {		
	return typeof version === 'string';
}

module.exports = compareVersions;