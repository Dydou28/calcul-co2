const db = require("../models");
const IndiceSource = db.indiceSource;

calcWorkplaceBalance = async function (form) {
  return new Promise((resultat) => {
    IndiceSource.find({ category: "telework" }).exec((err, indices) => {
      if (err) {
        resultat("null");
      } else {
        console.log(form);
        var distanceWorkHeater = "";
        var distanceWorkHeaterType = "";
        var distanceWorkAirConditionner = "";
        var presentielWork = "";
        var presentielWorkType = "";
        var hotelNuitNb = "";
        var hotelType = "";

        let distanceHeaterIndex = null;
        let distanceAirIndex = null;
        let presentielIndex = null;
        let hotelIndex = null;

        //récuperation des donées du formulaire
        form.map((row, i) => {
          if (row.label === "distanceWorkDays") {
            if (row.resp != 0) {
              distanceWorkDays = row.resp;
            } else {
              distanceWorkDays = 0;
            }
          } else if (row.label === "distanceWorkHeater") {
            distanceWorkHeater = row.resp;
          } else if (row.label === "distanceWorkHeaterType") {
            distanceHeaterIndex = i;
            distanceWorkHeaterType = row.resp;
          } else if (row.label === "distanceWorkAirConditionner") {
            distanceAirIndex = i;
            distanceWorkAirConditionner = row.resp;
          } else if (row.label === "presentielWork") {
            presentielWork = row.resp;
          } else if (row.label === "presentielWorkType") {
            if (row.resp === "singleOffice1" || row.resp === "singleOffice2")
              presentielWorkType = "singleOffice";
            else if (row.resp === "coworking1" || row.resp === "coworking2")
              presentielWorkType = "coworking";
            else presentielWorkType = row.resp;
            presentielIndex = i;
          } else if (row.label === "hotelNuitNb") {
            hotelIndex = i;
            hotelNuitNb = row.resp;
          } else if (row.label === "hotelType") {
            hotelType = row.resp;
          }
        });

        let hotel = 0; // provisoire
        var telechaud = 0;
        var telefroid = 0;
        var presentaf = 0;

        //récuperation des indices
        indices.map((indice) => {
          if (indice.form_name == distanceWorkHeaterType) {
            telechaud = indice.value * indice.masse;
          } else if (indice.form_name == "distanceWorkAirConditionner") {
            telefroid = indice.value * indice.masse;
          } else if (indice.form_name == presentielWorkType) {
            presentaf = indice.value * indice.masse;
          } else if (indice.form_name == "hotelType") {
            hotel = indice.value * indice.masse;
          }
        });

        form[distanceHeaterIndex].totalCarbon =
          telechaud * distanceWorkHeater * distanceWorkDays * 45;
        form[distanceAirIndex].totalCarbon =
          telefroid * distanceWorkAirConditionner * distanceWorkDays * 45;
        form[presentielIndex].totalCarbon = (presentaf / 7) * presentielWork;
        form[hotelIndex].totalCarbon = hotel * hotelNuitNb;
        //on multipli chaque entrée du formulaire avec l'indice correspondant
        var totalCarbon =
          telechaud * distanceWorkHeater * distanceWorkDays * 45 +
          telefroid * distanceWorkAirConditionner * distanceWorkDays * 45 +
          (presentaf / 7) * presentielWork +
          hotel * hotelNuitNb;

        // LE RESULTAT EST RETOURNE EN KILO GRAMME DE CO2 PAR AN

        resultat({ form, totalCarbon });
      }
    });
  });
};

calcTransportBalance = async function (form, totalCarbon) {
  return new Promise((resultat) => {
    IndiceSource.find({ category: "transport" }).exec(async (err, indices) => {
      if (err) {
        resultat("null");
      } else {
        var indiceType = 0;
        var row = form.slice(-1)[0];
        var label = row.label.split(" | ");

        //récuperation des indices
        await indices.map((indice) => {
          if (indice.form_name == label[0]) {
            indiceType = indice.value * indice.masse;
          } else if (label[1] && indice.form_name == label[1]) {
            indiceType = indice.value * indice.masse;
          }
        });

        if (
          label[0] == "train" ||
          label[0] == "eurostar" ||
          label[0] == "thalys" ||
          label[0] == "ter" ||
          label[0] == "bike" ||
          label[0] == "bus" ||
          label[0] == "subway" ||
          label[0] == "scooter" ||
          label[0] == "car" ||
          label[0] == "moto"
        ) {
          totalCarbon += row.resp * indiceType;
          form[form.length - 1].totalCarbon = row.resp * indiceType;
        } else if (label[0] == "plane") {
          // a modifier
          totalCarbon += row.resp * indiceType;
          form[form.length - 1].totalCarbon = row.resp * indiceType;
        } else if (label[0] == "carpooling") {
          totalCarbon += (row.resp * indiceType) / label[2];
          form[form.length - 1].totalCarbon =
            (row.resp * indiceType) / label[2];
        }
        // LE RESULTAT EST RETOURNE EN KILO GRAMME DE CO2 PAR AN
        resultat({ form, totalCarbon });
      }
    });
  });
};
calcNumeriqueBalance = async function (form, totalCarbon) {
  return new Promise((resultat) => {
    IndiceSource.find({ category: "numerique" }).exec(async (err, indices) => {
      if (err) {
        resultat("null");
      } else {
        var indiceType = 0;
        var indiceMass = 0;
        var totalAns = 0;
        var row = form.slice(-1)[0];
        var nbHeure = 8;
        var kiloWatt = 0;
        var mix = 35;
        var mass = 0.0;
        var nbjoursPerAns = 220;

        //pour abonnements
        if (
          row.label == "internetDomicile" ||
          row.label == "internetMobile" ||
          row.label == "internetBureau"
        ) {
          await indices.map((indice) => {
            indiceType = indice.value;
            indiceMass = indice.masse;
          });
          form[form.length - 1].totalCarbon =
            row.resp * indiceType * indiceMass;
          console.log(form[form.length - 1].totalCarbon);
        }
        //pour matériel
        else {
          console.log(row.label);
          console.log(row.resp);
          var label = row.label.split(" | ");
          var resp = row.resp.split(" | ");

          //récuperation des indices
          await indices.map((indice) => {
            console.log("indice");
            console.log(indice.form_name);
            if (indice.form_name == label[0]) {
              indiceType = indice.value;
              totalAns = indice.masse; //pour matériel on consider masse d'indice comme total année
            } else if (label[1] && indice.form_name == label[1]) {
              indiceType = indice.value;
              totalAns = indice.masse;
            }
          });
          //récuperation des indices de utilisation
          await indices.map((indice) => {
            console.log("indice");
            console.log(indice.form_name);
            if (indice.form_name == label[0] + "Utilisation") {
              kiloWatt = indice.value; //pour utilisation on consider value d'indice comme KiloWatt
              mass = indice.masse;
            } else if (
              label[1] &&
              indice.form_name == label[1] + "Utilisation"
            ) {
              kiloWatt = indice.value;
              mass = indice.masse;
            }
          });

          utilisationCarbon =
            nbHeure * (kiloWatt / 1000) * mix * (mass / 1000) * nbjoursPerAns;

          if (resp[1] != 0 && resp[2] == "non") {
            fabricationCarbon = indiceType * resp[0] * (totalAns / resp[1]);
            totalCarbon += fabricationCarbon + utilisationCarbon;
            form[form.length - 1].totalCarbon =
              fabricationCarbon + utilisationCarbon;
          } else if (resp[2] == "oui") {
            fabricationCarbon = indiceType * resp[0] * (1 / 10);
            totalCarbon += fabricationCarbon + utilisationCarbon;
            form[form.length - 1].totalCarbon =
              fabricationCarbon + utilisationCarbon;
          }
        }
        // LE RESULTAT EST RETOURNE EN KILO GRAMME DE CO2 PAR AN
        resultat({ form, totalCarbon });
      }
    });
  });
};
calcAlimentationBalance = async function (form) {
  console.log("dylanalimentation");
  return new Promise((resultat) => {
    IndiceSource.find({ category: "alimentation" }).exec(
      async (err, indices) => {
        if (err) {
          resultat("null");
        } else {
          var viandeRouge = "";
          var viandeBlanche = "";
          var fruitsSaison = "";
          var fruitsHorsSaison = "";
          var lait = "";
          var fromage = "";
          var yaourts = "";
          var creme = "";
          var nbRepasVegan = "";
          var poisson = "";
          var prepaCafe = "";
          var nbCafe = "";
          var nbChoco = "";

          var viandeRougeIndex = "";
          var viandeBlancheIndex = "";
          var fruitsSaisonIndex = "";
          var fruitsHorsSaisonIndex = "";
          var laitIndex = "";
          var fromageIndex = "";
          var yaourtsIndex = "";
          var cremeIndex = "";
          var nbRepasVeganIndex = "";
          var poissonIndex = "";
          var prepaCafeIndex = "";
          var nbCafeIndex = "";
          var nbChocoIndex = "";

          //récuperation des donées du formulaire
          form.map((row, i) => {
            if (row.label === "viandeRouge") {
              viandeRouge = row.resp;
              viandeRougeIndex = i;
            } else if (row.label === "viandeBlanche") {
              viandeBlanche = row.resp;
              viandeBlancheIndex = i;
            } else if (row.label === "fruitsSaison") {
              fruitsSaison = row.resp;
              fruitsSaisonIndex = i;
            } else if (row.label === "fruitsHorsSaison") {
              fruitsHorsSaison = row.resp;
              fruitsHorsSaisonIndex = i;
            } else if (row.label === "lait") {
              lait = row.resp;
              laitIndex = i;
            } else if (row.label === "fromage") {
              fromage = row.resp;
              fromageIndex = i;
            } else if (row.label === "yaourts") {
              yaourts = row.resp;
              yaourtsIndex = i;
            } else if (row.label === "creme") {
              creme = row.resp;
              cremeIndex = i;
            } else if (row.label === "nbRepasVegan") {
              nbRepasVegan = row.resp;
              nbRepasVeganIndex = i;
            } else if (row.label === "poisson") {
              poisson = row.resp;
              poissonIndex = i;
            } else if (row.label === "prepaCafe") {
              prepaCafe = row.resp;
              prepaCafeIndex = i;
            } else if (row.label === "nbCafe") {
              nbCafe = row.resp;
              nbCafeIndex = i;
            } else if (row.label === "nbChoco") {
              nbChoco = row.resp;
              nbChocoIndex = i;
            }
          });

          var totalCarbon = 0;
          var l = indices.length;
          indices.map((indice, i) => {
            console.log("indice");
            console.log(indice.form_name);
            if (
              indice.form_name === "viandeRouge" &&
              viandeRougeIndex != null
            ) {
              totalCarbon += indice.value * indice.masse * viandeRouge;
              form[viandeRougeIndex].totalCarbon =
                indice.value * indice.masse * viandeRouge;
            } else if (
              indice.form_name === "viandeBlanche" &&
              viandeBlancheIndex != null
            ) {
              totalCarbon += indice.value * indice.masse * viandeBlanche;
              form[viandeBlancheIndex].totalCarbon =
                indice.value * indice.masse * viandeBlanche;
            } else if (
              indice.form_name === "fruitsSaison" &&
              fruitsSaisonIndex != null
            ) {
              totalCarbon += indice.value * indice.masse * fruitsSaison;
              form[fruitsSaisonIndex].totalCarbon =
                indice.value * indice.masse * fruitsSaison;
            } else if (
              indice.form_name === "fruitsHorsSaison" &&
              fruitsHorsSaisonIndex != null
            ) {
              totalCarbon += indice.value * indice.masse * fruitsHorsSaison;
              form[fruitsHorsSaisonIndex].totalCarbon =
                indice.value * indice.masse * fruitsHorsSaison;
            } else if (indice.form_name === "lait" && laitIndex != null) {
              totalCarbon += indice.value * indice.masse * lait;
              form[laitIndex].totalCarbon = indice.value * indice.masse * lait;
            } else if (indice.form_name === "fromage" && fromageIndex != null) {
              totalCarbon += indice.value * indice.masse * fromage;
              form[fromageIndex].totalCarbon =
                indice.value * indice.masse * fromage;
            } else if (indice.form_name === "yaourts" && yaourtsIndex != null) {
              totalCarbon += indice.value * indice.masse * yaourts;
              form[yaourtsIndex].totalCarbon =
                indice.value * indice.masse * yaourts;
            } else if (indice.form_name === "creme" && cremeIndex != null) {
              totalCarbon += indice.value * indice.masse * creme;
              form[cremeIndex].totalCarbon =
                indice.value * indice.masse * creme;
            } else if (
              indice.form_name === "nbRepasVegan" &&
              nbRepasVeganIndex != null
            ) {
              totalCarbon += indice.value * indice.masse * nbRepasVegan;
              form[nbRepasVeganIndex].totalCarbon =
                indice.value * indice.masse * nbRepasVegan;
            } else if (indice.form_name === "poisson" && poissonIndex != null) {
              totalCarbon += indice.value * indice.masse * poisson;
              form[poissonIndex].totalCarbon =
                indice.value * indice.masse * poisson;
            } else if (
              indice.form_name === "prepaCafe" &&
              prepaCafeIndex != null
            ) {
              totalCarbon += indice.value * indice.masse * prepaCafe;
              form[prepaCafeIndex].totalCarbon =
                indice.value * indice.masse * prepaCafe;
            } else if (indice.form_name === "nbCafe" && nbCafeIndex != null) {
              totalCarbon += indice.value * indice.masse * nbCafe;
              form[nbCafeIndex].totalCarbon =
                indice.value * indice.masse * nbCafe;
            } else if (indice.form_name === "nbChoco" && nbChocoIndex != null) {
              totalCarbon += indice.value * indice.masse * nbChoco;
              form[nbChocoIndex].totalCarbon =
                indice.value * indice.masse * nbChoco;
            }
            if (i == l - 1) resultat({ form, totalCarbon: totalCarbon * 1000 });
          });
        }
      }
    );
  });
};
calcAchatBalance = async function (form) {
  return new Promise((resultat) => {
    IndiceSource.find({ category: "achat" }).exec((err, indices) => {
      if (err) {
        resultat("null");
      } else {
        var nbLivre = "";
        var nbTshirt = "";
        var nbFourniture = "";
        var prixConseils = "";
        var donsAsso = "";
        var prixComService = "";
        var papier = "";

        var nbLivreIndex = null;
        var nbTshirtIndex = null;
        var nbFournitureIndex = null;
        var prixConseilsIndex = null;
        var donsAssoIndex = null;
        var prixComServiceIndex = null;
        var papierIndex = null;

        //récuperation des donées du formulaire
        form.map((row, i) => {
          if (row.label === "nbLivre") {
            nbLivre = row.resp;
            nbLivreIndex = i;
          } else if (row.label === "nbTshirt") {
            nbTshirt = row.resp;
            nbTshirtIndex = i;
          } else if (row.label === "nbFourniture") {
            nbFourniture = row.resp;
            nbFournitureIndex = i;
          } else if (row.label === "prixConseils") {
            prixConseils = row.resp;
            prixConseilsIndex = i;
          } else if (row.label === "donsAsso") {
            donsAsso = row.resp;
            donsAssoIndex = i;
          } else if (row.label === "prixComService") {
            prixComService = row.resp;
            prixComServiceIndex = i;
          } else if (row.label === "papier") {
            papier = row.resp;
            papierIndex = i;
          }
        });

        var totalCarbon = 0;
        var l = indices.length;
        indices.map((indice, i) => {
          console.log("indice");
          console.log(indice.form_name);
          if (indice.form_name === "nbLivre" && nbLivreIndex != null) {
            totalCarbon += indice.value * indice.masse * nbLivre;
            form[nbLivreIndex].totalCarbon =
              indice.value * indice.masse * nbLivre;
          } else if (indice.form_name === "nbTshirt" && nbTshirtIndex != null) {
            totalCarbon += indice.value * indice.masse * nbTshirt;
            form[nbTshirtIndex].totalCarbon =
              indice.value * indice.masse * nbTshirt;
          } else if (
            indice.form_name === "nbFourniture" &&
            nbFournitureIndex != null
          ) {
            totalCarbon += indice.value * indice.masse * nbFourniture;
            form[nbFournitureIndex].totalCarbon =
              indice.value * indice.masse * nbFourniture;
          } else if (
            indice.form_name === "prixConseils" &&
            prixConseilsIndex != null
          ) {
            totalCarbon += indice.value * indice.masse * prixConseils;
            form[prixConseilsIndex].totalCarbon =
              indice.value * indice.masse * prixConseils;
          } else if (indice.form_name === "donsAsso" && donsAssoIndex != null) {
            totalCarbon += indice.value * indice.masse * donsAsso;
            form[donsAssoIndex].totalCarbon =
              indice.value * indice.masse * donsAsso;
          } else if (
            indice.form_name === "prixComService" &&
            prixComServiceIndex != null
          ) {
            totalCarbon += indice.value * indice.masse * prixComService;
            form[prixComServiceIndex].totalCarbon =
              indice.value * indice.masse * prixComService;
          } else if (indice.form_name === "papier" && papierIndex != null) {
            totalCarbon += indice.value * indice.masse * papier;
            form[papierIndex].totalCarbon =
              indice.value * indice.masse * papier;
          }
          if (i == l - 1) resultat({ form, totalCarbon });
        });
      }
    });
  });
};

const calcBalancePerso = {
  calcWorkplaceBalance,
  calcTransportBalance,
  calcNumeriqueBalance,
  calcAlimentationBalance,
  calcAchatBalance,
};
module.exports = calcBalancePerso;
