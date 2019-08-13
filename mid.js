let midi = null;
let output = null;
let clear = true;
let launchpadMK2 = [
    81, 82, 83, 84, 85, 86, 87, 88,
    71, 72, 73, 74, 75, 76, 77, 78,
    61, 62, 63, 64, 65, 66, 67, 68,
    51, 52, 53, 54, 55, 56, 57, 58,
    41, 42, 43, 44, 45, 46, 47, 48,
    31, 32, 33, 34, 35, 36, 37, 38,
    21, 22, 23, 24, 25, 26, 27, 28,
    11, 12, 13, 14, 15, 16, 17, 18,
];

function onMIDIMessage(event) {
    let data = event.data,
        cmd = data[0] >> 4,
        channel = data[0] & 0xf,
        type = data[0] & 0xf0,
        note = data[1],
        velocity = data[2];
    //console.log(parseInt(note.toString(16), 16));
    sendNoteTo(output, note, 127, 0x66);
}

function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    output = midiAccess.outputs.values().next().value;
    // listen for connect/disconnect message
    midi.onstatechange = onStateChange;

    let inputs = midi.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(msg) {
    console.log('Failed to get MIDI access', msg);
}

function onStateChange(event) {
    console.log(event.port);
}

function sendNoteTo(output, note, velocity = 127, textColor = 0x60) {
    //output.send([0x90, parseInt(note.toString(16), 16), 0x15]);
    output.send([0x92, parseInt(note.toString(16), 16), textColor]);
}

function clearLEDS() {
    clear = true;
    output.send([0xF0, 0x00, 0x20, 0x29, 0x02, 0x18, 0x0E, 0x00, 0xF7]);
}

function spin() {
    clear = false;
    lights = [33, 43, 53, 63, 64, 65, 66, 56, 46, 36, 35, 34];
    index = 0;
    interval = setInterval(() => {
        if (clear == true) {
            clearInterval(interval);
        } else {
            setTimeout(spun(index, lights), 500);
            index++;
            if (index > lights.length - 1) {
                index = 0;
            }
        }
    }, 50);
}

function spun(index, lights) {
    output.send([0x90, parseInt(lights[index].toString(16), 16), 0x0D]);
    console.log("sent");
    if (index != 1 && index != 0) {
        output.send([0x80, parseInt(lights[index - 2].toString(16), 16), 0x00]);
    } else if (index == 0) {
        output.send([0x80, parseInt(lights[lights.length - 1].toString(16), 16), 0x00]);
    } else {
        output.send([0x80, parseInt(lights[lights.length - 2].toString(16), 16), 0x00]);
    }
}

function runThrough() {
    clearLEDS();
    launchpadMK2.forEach(databyte => {
        setTimeout(function () {
            output.send([0x92, parseInt(databyte.toString(16), 16), 0x51]);
        }, 1000);
    });
}

function sendHexData() {
    let text = document.getElementById("data").value;
    text = text.replace(/h/g, "");
    text = text.replace(/ /g, ",");
    let final = text.split(",");
    let index = 0;
    final.forEach(byte => {
        final[index] = parseInt(byte.toString(16), 16);
        index++;
    });
    output.send(final);
}

function setColor() {
    data = hexToRgb(document.getElementById("colorData").value)
    console.log(data['r']);
    output.send([0xF0, 0x00, 0x20, 0x29, 0x02, 0x18, 0x0B, 0x14, parseInt(data['r'].toString(16), 16), parseInt(data['g'].toString(16), 16), parseInt(data['b'].toString(16), 16), 0xF7]);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
navigator.requestMIDIAccess({
    sysex: true
}).then(onMIDISuccess, onMIDIFailure);