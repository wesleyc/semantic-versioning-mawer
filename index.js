/**
 * Compare 2 semantic versioning strings and returns the one with
 * higher precedence.
 * @param  {String} v1 The first semantic versioning string
 * @param  {String} v2 The second semantic versioning string
 * @return {String}    The semantic versioning string with higher precedence
 */
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

/**
 * Compare the core version portion of the semantic versioning strings and return
 * the result.
 * @param  {String} coreVersion1 The first semantic versioning core version string
 * @param  {String} coreVersion2 The second semantic versioning core version string
 * @return {Number}              The comparison result (1 meaning the first string has
 *                               the higher precedence, -1 meaning the second string has
 *                               has the higher precedence, and 0 meaning both strings 
 *                               have equal precedence.
 */
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

/**
 * Compare the pre-release portion of the semantic versioning strings and return
 * the result.
 * @param  {String} preReleaseVersion1 The first semantic versioning pre-release version string
 * @param  {String} preReleaseVersion1 The second semantic versioning pre-release version string
 * @return {Number}                    The comparison result (1 meaning the first string has
 *                                     the higher precedence, -1 meaning the second string has
 *                                     has the higher precedence, and 0 meaning both strings 
 *                                     have equal precedence.
 */
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

/**
 * Validate the semantic versioning string provided is a valid format by using the regular
 * expression supplied by https://semver.org/
 * @param  {String}  version The semantic versioning string to validate against
 * @return {Boolean}         TRUE if the supplied semantic versioning string has a valid format
 *                           FALSE otherwise     
 */
function isValidVersionFormat(version) {
	const regex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
				
	return regex.test(version);
}

/**
 * Validate the semantic versioning string provided is a valid type
 * @param  {String}  version The semantic versioning string to validate against
 * @return {Boolean}         TRUE if the supplied semantic versioning string has a valid type
 *                           FALSE otherwise     
 */
function isValidVersionType(version) {		
	return typeof version === 'string';
}

module.exports = compareVersions;