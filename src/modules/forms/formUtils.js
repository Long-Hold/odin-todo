import { format } from "date-fns";

export function objectifySubmission(formData) {
    if (formData instanceof FormData === false) {
        throw new TypeError('Passed parameter must be instance of: FormData');
    }
    
    const dataObject = Object.fromEntries(formData);
    return dataObject;
}

export function bundleKeys(dataObject, substring, bundledKey) {
    /**Bundles related data into it's own sub-object that will be appended to the main object.
     * 
     * Parameters:
     *  dataObject - the object to extract data from to bundle
     *  substring - the common string amongst the keys whose value will be bundled
     *  bundledKey - the key name for the nested object that holds the bundled data
     * 
     * The bundledData retains the same key: value names and data after they have been nested,
     * a deep-copy, cloned object is used to perform this process. The bundled key: value pair
     * are deleted after they have been bundled.
     * 
     * The cloned object is returned
     */

    if (dataObject instanceof Object === false || objectIsPrototype(dataObject) === false) {
        throw TypeError('dataObject must be instanceof Object');
    }

    if (typeof(substring) !== 'string' || typeof(bundledKey) !== 'string') {
        const badParameter = (typeof(substring) !== 'string') ? 'substring' : 'bundledKey';
        throw TypeError(`${badParameter} must be of type: String`);
    }

    const clonedObj = structuredClone(dataObject);
    const bundledData = {};
    
    for (const [key, value] of Object.entries(clonedObj)) {
        if (key.startsWith(substring)) {
            // Only adds non-empty fields, but still cleans them up
            if (value.trim()) {
                bundledData[key] = value;
            }
            delete clonedObj[key];
        }
    }

    if (Object.keys(bundledData).length > 0) {
        clonedObj[bundledKey] = {...bundledData};
    }

    return clonedObj;
}

export function removeEmptyFields(formData) {
    if (formData instanceof FormData === false) {
        throw new TypeError(`Expected paramter of type FormData. Received ${typeof(formData)}`);
    }

    const cleanedFormData = new FormData();

    for (const [key, value] of formData.entries()) {
        if (!value.trim()) {
            continue;
        }

        cleanedFormData.append(key, value);
    }

    return cleanedFormData;
}

export function setMinDateToCurrentDate(inputNode) {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    inputNode.setAttribute('min', currentDate);
}

function objectIsPrototype(object) {
    return Object.getPrototypeOf(object) === Object.prototype;
}