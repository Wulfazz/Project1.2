// Définition des compétences
let competenceNormale = { nom: "Attaque Simple", puissance: 10 };
let competenceSpeciale = { nom: "Attaque Spéciale", puissance: 20, cout_mana: 15 };

// Définition des personnages
let mage1 = { nom: "Cecilion", classe: "Mage", points_de_vie: 100, points_d_attaque: 10, competenceNormale, competenceSpeciale };
let fighter1 = { nom: "Balmond", classe: "Combattant", points_de_vie: 120, points_d_attaque: 10, competenceNormale, competenceSpeciale };
let support1 = { nom: "Angela", classe: "Support", points_de_vie: 130, points_d_attaque: 7, competenceNormale, competenceSpeciale };
let marksman1 = { nom: "Wanwan", classe: "Tireur", points_de_vie: 130, points_d_attaque: 7, competenceNormale, competenceSpeciale };

let mage2 = { nom: "Cecilion", classe: "Mage", points_de_vie: 100, points_d_attaque: 10, competenceNormale, competenceSpeciale };
let fighter2 = { nom: "Balmond", classe: "Combattant", points_de_vie: 120, points_d_attaque: 10, competenceNormale, competenceSpeciale };
let support2 = { nom: "Estes", classe: "Support", points_de_vie: 130, points_d_attaque: 7, competenceNormale, competenceSpeciale };
let marksman2 = { nom: "Nathan", classe: "Tireur", points_de_vie: 130, points_d_attaque: 7, competenceNormale, competenceSpeciale };

// Définition des joueurs
let joueur1 = [mage1, fighter1];
let joueur2 = [support2, marksman2]; // Correction du nom de la classe
let currentPlayer;

// Fonction pour choisir le premier joueur au hasard
function choisirPremierJoueur() {
    currentPlayer = Math.random() < 0.5 ? joueur1 : joueur2;
    alert(currentPlayer[0].nom + " commence!");
}

// Fonction pour effectuer une attaque
function attaquer(attacker, target, skill) {
    let attackerObj = window[attacker];
    let targetObj = window[target];

    let competence = (skill === 'normale') ? attackerObj.competenceNormale : attackerObj.competenceSpeciale;

    targetObj.points_de_vie -= competence.puissance;

    if (skill === 'special') {
        attackerObj.points_de_mana -= competence.cout_mana;
    }

    // Mettez à jour l'affichage des points de vie, etc.
    updateUI();

    // Passez au tour du joueur suivant
    passerAuTourSuivant();
}

// Fonction pour passer au tour du joueur suivant
function passerAuTourSuivant() {
    currentPlayer = (currentPlayer === joueur1) ? joueur2 : joueur1;
    alert("C'est au tour de " + currentPlayer[0].nom);
}

// Fonction pour mettre à jour l'interface utilisateur
function updateUI() {
    // Mettez à jour les éléments HTML pour afficher les changements
    document.getElementById('vieMage1').textContent = currentPlayer[0].points_de_vie;
}

// Fonction pour créer les boutons d'attaque
function creerBoutonsAttaque(joueurId) {
    let container = document.getElementById(`actionsJoueur${joueurId}`);

    // Création du bouton d'attaque spéciale
    let specialButton = document.createElement('button');
    specialButton.textContent = "Attaque Spéciale";
    specialButton.onclick = function () {
        attaquer(`character${joueurId}`, `character${3 - joueurId}`, 'special');
    };

    // Création du bouton d'attaque normale
    let normalButton = document.createElement('button');
    normalButton.textContent = "Attaque Normale";
    normalButton.onclick = function () {
        attaquer(`character${joueurId}`, `character${3 - joueurId}`, 'normale');
    };

    // Ajout des boutons au container
    container.appendChild(specialButton);
    container.appendChild(normalButton);
}

// Appel pour choisir le premier joueur et créer les boutons d'attaque au chargement de la page
choisirPremierJoueur();
creerBoutonsAttaque(1);
creerBoutonsAttaque(2);
