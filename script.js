function clearMin() {
    document.getElementById("min").value = "";
    document.getElementById("format").innerHTML = "";
    document.getElementById("ctrl_c").style.display = 'none';
}

function genBuddy() {
    clearFormat();
    var min = document.getElementById("min").value;
    setBrand(min, "BUDDY", "Smart Prepaid", "Smart Prepaid");
}

function genPostpd() {
    clearFormat();
    var min = document.getElementById("min").value;
    setBrand(min, "POSTPD", "Smart Postpaid", "Smart Postpaid");
}

function genTnt() {
    clearFormat();
    var min = document.getElementById("min").value;
    setBrand(min, "TNT", "TNT Prepaid", "TNT");
}

function clearFormat() {
    document.getElementById("format").innerHTML='';
}

function unixTime() {
    // Formatted as MM/DD/YYYY hh:mm:ss
    const setDate = new Date();

    let tempDay = setDate.getDate();
    let tempMonth = setDate.getMonth() + 1;
    let tempYear = setDate.getFullYear();

    var tempDate = tempMonth+'/'+tempDay+'/'+tempYear;

    // Formatted as MM/DD/YYYY hh:mm:ss
    const dateStr = tempDate+' 00:00:00';

    const [dateValues, timeValues] = dateStr.split(' ');

    //console.log(dateValues); // 👉️ "02/24/2022"
    //console.log(timeValues); // 👉️ "09:26:30"

    const [month, day, year] = dateValues.split('/');
    const [hours, minutes, seconds] = timeValues.split(':');

    const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);

    //console.log(date); // 👉️ Thu Feb 24 2022 09:26:30

    // just if needed to get timestamp in Ms
    //const timestampInMs = date.getTime();

    const timestampInSeconds = Math.floor(date.getTime() / 1000);

    return timestampInSeconds;
}

function formatted(min, brand_id, brand_name, brand_description) {
    return `, <br />
    "min": "${min}", <br />
    "brand_id": "${brand_id}", <br />
    "brand_name": "${brand_name}", <br />
    "brand_description": "${brand_description}", <br />
    "is_active": true, <br />
    "creation_timestamp": ${unixTime()}, <br />
    "last_update_timestamp": ${unixTime()}`;
}

function setBrand(min, brand_id, brand_name, brand_description) {
    if (min.length == 0) {
        document.getElementById("format").innerHTML = 'Input Min';
    } else if (/\D/.test(min)) {
        document.getElementById("format").innerHTML = 'Input only a number';
    } else if (min.length < 10) {
        document.getElementById("format").innerHTML = 'Min should be 10-digit: 9xxxxxxxxx';
    } else {
        document.getElementById("format").innerHTML = formatted(min, brand_id, brand_name, brand_description);
        document.getElementById("ctrl_c").style.display = 'block';
        //saveData(min, brand_id, brand_name, brand_description);
    }
}

function saveData(min, brand_id, brand_name, brand_description) {
    
    // This variable stores all the data.
    let data = 
        '\r min: ' + min + ' \r\n ' + 
        'brand_id: ' + brand_id + ' \r\n ' + 
        'brand_name: ' + brand_name + ' \r\n ' + 
        'brand_description: ' + brand_description + ' \r\n ' +
        'is_active: ' + true + ' \r\n ' +
        'creation_timestamp: ' + unixTime() + ' \r\n ' + 
        'last_update_timestamp: ' + unixTime() + ' \r\n\r\n ';
    
    // Convert the text to BLOB.
    // const textToBLOB = new Blob([data], { type: 'text/plain' });
    // const sFileName = 'dataCollectio1n.txt';	   // The file to save the data.

    // let newLink = document.createElement("a");
    // newLink.download = sFileName;

    // if (window.webkitURL != null) {
    //     newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    // }
    // else {
    //     newLink.href = window.URL.createObjectURL(textToBLOB);
    //     newLink.style.display = "none";
    //     document.body.appendChild(newLink);
    // }

    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8",
     });
     saveAs(blob, "download.txt");
}

function ctrlc() {
    var formatted = document.getElementById("format").innerText;
    navigator.clipboard.writeText(formatted);

    $.ajax({
        method: "POST",
        url: "log.php",
        data: { formatted: formatted }
    });
    // .done(function( response ) {
    //     console.log(formatted);
    //   });

    $("#copied").show();
    setTimeout(function() { $("#copied").hide(); }, 5000);
}