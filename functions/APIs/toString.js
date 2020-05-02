// toString.js

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

const fishSizes = ["Smallest", "Small", "Medium", "Large", "Extra Large", 
"Largest", "Large (Fin)", "Extra Large (Fin)", "Largest (Fin)", "Narrow",
]

function hourToString(hour) {
    let result = '';
    if (hour < 0 || hour >= 24) {
        return 'ERROR';
    }
    
    if (hour >= 0 && hour < 12) {
        result = hour.toString() + ' a.m.';
    }
    else {
        hour -= 12;
        result = hour.toString() + ' p.m.'; 
    }
    return result;
};

function monthToString(month) {
    if (month < 0 || month >= 12) {
        return 'ERROR';
    }

    return monthNames[month];
}

function isOdd(num) {
    return num & 1;
}

function prettifyDuration(arrLength, index, result) {
    if (isOdd(index))
    {
        result = result.concat(' - ')
    }
    else
    {
        if ((arrLength > 2) && 
            (index != (arrLength - 1)) && 
            (index != 0))
        {
            result = result.concat(', ')
        }
    }
    return result;
}

function hemisphereStr(monthsMap, hemisphere) {
    let result = '';
    var monthArr = monthsMap.get(hemisphere.toLowerCase()).sort(function(a, b){return a - b});
    monthArr.forEach((month, index) => {
        //result = prettifyDuration(monthArr.length, index, result);
        result = result.concat(monthToString(month));
        if (index != monthArr.length)
        {
            result = result.concat(', ');
        }
    });
    result = result.concat('(' + hemisphere + ')');
    return result;
}

exports.timeToString = (hoursArr) => {
    let result = '';
    //console.log('input: ' + hoursArr);
    hoursArr.forEach((hour, index) => {
        result = prettifyDuration(hoursArr.length, index, result);
        result = result.concat(hourToString(hour));
    }); 
    return result;
};

exports.monthsToString = (monthsObject) => {
    let result = '';
    console.log(typeof monthsObject);
    const monthsMap = new Map(Object.entries(monthsObject));
    result = hemisphereStr(monthsMap, 'Northern');
    result = result.concat('/ ' + hemisphereStr(monthsMap, 'Southern'));
    return result;
};

exports.shadowToString = (shadowSize) => {
    if (shadowSize < 0 || shadowSize >= 10)
    {
        return 'ERROR';
    }
    return fishSizes[shadowSize];
}