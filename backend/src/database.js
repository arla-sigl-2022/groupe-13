var resources = [
    { id: 1, planete: "Marlax", ressource: "Arlaminium", prix: 0.73 },
    { id: 2, planete: "Sarlax", ressource: "Arlium", prix: 3.25 },
    { id: 3, planete: "Larlune", ressource: "Rarladium", prix: 1.42 },
    { id: 4, planete: "Ozinia", ressource: "Elekectium", prix: 1.20 },
    { id: 5, planete: "Pinziamia", ressource: "Nontcite", prix: 1.00 },
    { id: 6, planete: "Ocagua", ressource: "Montagoite", prix: 0.19 },
    { id: 7, planete: "Nophillon", ressource: "Ultrarium", prix: 0.86 },
    { id: 8, planete: "Chiuyama", ressource: "Copilite", prix: 2.46 },
    { id: 9, planete: "Iphus", ressource: "Rubyrl", prix: 2.86 },
    { id: 10, planete: "Bregoter", ressource: "Preentine", prix: 3.80 },
    { id: 11, planete: "Llusalara", ressource: "Tuglite", prix: 4.64 },
    { id: 12, planete: "Gnone 11", ressource: "Suncolite", prix: 4.54 },
    { id: 13, planete: "Syria 27K", ressource: "Amarantium", prix: 4.22 },
    { id: 14, planete: "Kogninus", ressource: "Argieldite", prix: 1.04 },
    { id: 15, planete: "Uchugawa", ressource: "Steaalyte", prix: 4.41 },
    { id: 16, planete: "Icides", ressource: "Simandite", prix: 2.64 },
    { id: 17, planete: "Tezeron", ressource: "Carminium", prix: 3.70 },
    { id: 18, planete: "Ralia", ressource: "Hiddtatite", prix: 2.82 },
    { id: 19, planete: "Xiolea", ressource: "Zultessite", prix: 2.34 },
    { id: 20, planete: "Gruyothea", ressource: "Stroikite", prix: 4.26 },
    { id: 21, planete: "Lloinides", ressource: "Juniene", prix: 0.77 },
    { id: 22, planete: "Trara VN8", ressource: "Gisauxite", prix: 0.54 },
    { id: 23, planete: "Gnapus 03O", ressource: "Astrurium", prix: 0.42 },
    { id: 24, planete: "Nophillon", ressource: "Lorenique", prix: 0.86 },
    { id: 25, planete: "Nophillon", ressource: "Potalonite", prix: 1.81 },
    { id: 26, planete: "Larlune", ressource: "Zulronite", prix: 0.47 }
]

var DB = {
    /**
     * Reads a page of resources, based on the resources array above.
     * 
     * @param {*} page from which page (e.g. 1)
     * @param {*} limit how many element max per page (e.g. 5)
     * @returns a subset of the resources array
     */
    getResourcePage: function (page, limit) {
        const start = (page - 1) * limit;
        const end = start + limit;
        // we have to copy before using splice,
        // otherwise it modifies the resources array
        const copy = [...resources];
        return copy.splice(start, end);
    }
}

module.exports = {
    DB
}