function checkForDebug() {
    if (debugMode)  { debugMode = false; }
    else            { debugMode = true; }
    toggleDebug(debugMode)
}

function toggleDebug(on) {
    if (on) {
        console.log('test')
        document.getElementById('debug').innerHTML = debugHTML;
    } else {
        document.getElementById('debug').innerHTML = '<button type="button" onclick="reset()">reset</button><br>';
    }
}

const debugHTML = `
<button type="button" onclick="shootNew(1,0)">Appelsin</button><br>
<button type="button" onclick="shootNew(1,1)">Æble</button><br>
<button type="button" onclick="shootNew(1,2)">Pære</button><br>
<button type="button" onclick="shootNew(1,3)">Banan</button><br>
<button type="button" onclick="modifierNew(1,0)">Slowdown</button><br>
<button type="button" onclick="modifierNew(1,1)">Speedup</button><br>
<button type="button" onclick="modifierNew(1,2)">Add life</button><br>
<button type="button" onclick="modifierNew(1,3)">Lose life</button><br><br><br>
<button type="button" onclick="reset()">reset</button><br>
`