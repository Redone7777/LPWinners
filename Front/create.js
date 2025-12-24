// Variables globales
var champs = [];
var items = [];
var runes = [];
var spells = [];

// Fonction de chargement
window.onload = function () {
    loadChamps();
    loadItems();
    loadRunes();
    loadSpells();
};

// --- CHAMPIONS ---
function loadChamps() {
    fetch("http://localhost:8000/champions")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            champs = data;
            showChamps(champs);
        })
        .catch(function (e) {
            // console.log("Err Ch:" + e);
        });
}

function showChamps(list) {
    var grid = document.getElementById("championGrid");
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = "<p>0 found</p>";
        return;
    }

    for (var i = 0; i < list.length; i++) {
        var c = list[i];
        var div = document.createElement("div");
        div.className = "image-card";
        div.onclick = function () { pickChamp(c.id); };

        var img = document.createElement("img");
        img.src = c.image;
        img.onerror = function () { this.src = "https://placehold.co/100x100?text=?"; };
        div.appendChild(img);

        // Tooltip simple
        div.title = c.nom;

        grid.appendChild(div);
    }
}

function filterChamps() {
    var txt = document.getElementById("searchChampion").value.toLowerCase();
    var res = [];
    for (var i = 0; i < champs.length; i++) {
        if (champs[i].nom.toLowerCase().includes(txt)) res.push(champs[i]);
    }
    showChamps(res);
}

function pickChamp(id) {
    var c = null;
    for (var i = 0; i < champs.length; i++) {
        if (champs[i].id == id) {
            c = champs[i];
            break;
        }
    }
    if (c) {
        document.getElementById("selectedChampionName").value = c.nom;

        // Highlight selection
        var cards = document.querySelectorAll("#championGrid .image-card");
        for (var i = 0; i < cards.length; i++) cards[i].classList.remove("selected");
        // C'est dur de trouver le bon div sans ID unique dans le DOM, mais on refait simple :
        // On re-render tout pour simplifier la vie ou on utilise event.target dans une V2
        // Ici on laisse juste l'effet visuel Skins apparaître

        showSkins(c);
        showPassive(c);
    }
}

function showSkins(c) {
    document.getElementById("sectionSkins").style.display = "block";
    var box = document.getElementById("skinsContainer");
    box.innerHTML = "";

    if (!c.skins || c.skins.length === 0) {
        box.innerHTML = "<p>No skins</p>";
        return;
    }

    for (var i = 0; i < c.skins.length; i++) {
        var img = document.createElement("img");
        img.src = c.skins[i];
        img.className = "skin-img";
        img.onclick = function () {
            var all = document.querySelectorAll(".skin-img");
            for (var j = 0; j < all.length; j++) all[j].classList.remove("selected");
            this.classList.add("selected");
            document.getElementById("selectedSkin").value = this.src;
        };
        box.appendChild(img);
    }
}

// --- ROLES ---
function pickRole(r) {
    document.getElementById("selectedRole").value = r;
    var opts = document.getElementsByClassName("role-option");
    for (var i = 0; i < opts.length; i++) {
        opts[i].classList.remove("selected");
    }
    event.currentTarget.classList.add("selected");
}

// --- SPELLS ---
function loadSpells() {
    fetch("http://localhost:8000/spells")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            spells = data;
            showSpells(spells);
        })
        .catch(function (e) { });
}

function showSpells(list) {
    var grid = document.getElementById("spellsGrid");
    grid.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var s = list[i];
        var img = document.createElement("img");
        img.src = s.image;
        img.className = "spell-icon";
        img.title = s.nom;
        img.onclick = function () { toggleSpell(this.src); };
        grid.appendChild(img);
    }
}

function toggleSpell(src) {
    // Ajouter visuellement aux "Sorts sélectionnés"
    var container = document.getElementById("selectedSpells");

    // Check si déjà là
    var existing = container.querySelectorAll("img");
    for (var i = 0; i < existing.length; i++) {
        if (existing[i].src === src) {
            existing[i].remove(); // On enlève si on clique encore (toggle off) ou on gère ça différemment
            return;
        }
    }

    var img = document.createElement("img");
    img.src = src;
    img.className = "selected-mini-icon";
    img.onclick = function () { this.remove(); };
    container.appendChild(img);
}


// --- ITEMS ---
function loadItems() {
    fetch("http://localhost:8000/items")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            items = data;
            showItems(items);
        })
        .catch(function (e) { /* console.log("Err It:" + e); */ });
}

function showItems(list) {
    var grid = document.getElementById("itemGrid");
    grid.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var it = list[i];
        var img = document.createElement("img");
        img.src = it.image;
        img.className = "item-icon";
        img.title = it.nom;
        img.onclick = function () { addItem(this.src); };
        img.onerror = function () { this.src = "https://placehold.co/50x50?text=Item"; };

        grid.appendChild(img);
    }
}

function filterItems() {
    var txt = document.getElementById("searchItem").value.toLowerCase();
    var rare = document.getElementById("itemRarity").value;
    var res = [];
    for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var okName = it.nom && it.nom.toLowerCase().includes(txt);
        var okRare = (rare === "all") || (it.rarete === rare);
        if (okName && okRare) res.push(it);
    }
    showItems(res);
}

function addItem(src) {
    var container = document.getElementById("selectedItems");
    var img = document.createElement("img");
    img.src = src;
    img.className = "selected-mini-icon";
    img.onclick = function () { this.remove(); };
    container.appendChild(img);
}

// --- RUNES ---
function loadRunes() {
    fetch("http://localhost:8000/runes")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            runes = data;
            showRunes(runes);
        })
        .catch(function (e) { /* console.log("Err Ru:" + e); */ });
}

function showRunes(list) {
    var box = document.getElementById("runesGrid");
    box.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var r = list[i];
        var img = document.createElement("img");
        img.src = r.image;
        img.className = "rune-icon";
        img.title = r.nom;
        img.onclick = function () {
            // Un seul choix de rune principale ? On va dire oui pour faire simple comme Role
            var all = document.querySelectorAll(".rune-icon");
            for (var j = 0; j < all.length; j++) all[j].classList.remove("selected");
            this.classList.add("selected");
            document.getElementById("selectedRune").value = r.nom;
        };
        box.appendChild(img);
    }
}

// --- PASSIVE ---
function showPassive(c) {
    var box = document.getElementById("passiveContainer");
    box.innerHTML = "";

    if (c.passif) {
        var div = document.createElement("div");
        div.className = "passive-box";

        if (c.passifImage) {
            var img = document.createElement("img");
            img.src = c.passifImage;
            img.className = "passive-img selected"; // Toujours selected car c'est celui du champ
            div.appendChild(img);
        }

        var p = document.createElement("p");
        p.innerText = c.passif;
        div.appendChild(p);

        box.appendChild(div);
    } else {
        box.innerHTML = "<p>NA</p>";
    }
}
