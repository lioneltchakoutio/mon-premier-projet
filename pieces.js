// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for(let i=0;i<pieces.length;i++){
    const mesArticles = document.createElement("article")
    const imageElement = document.createElement("img");
    imageElement.src=pieces[i].image;
    const nomElement = document.createElement("h2");
    nomElement.textContent = pieces[i].nom;
    const prixElement = document.createElement("p");
    prixElement.textContent = `prix: ${pieces[i].prix} (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.textContent = pieces[i].categorie ??"(aucune categorie)";
    const descriptionElement =document.createElement("p")
    descriptionElement.textContent = pieces[i].description ??"pas de description pour le moment";
    const dispoElement = document.createElement("p");
    dispoElement.textContent = `${pieces[i].disponibilite===true? "en stock":"rupture de stock"}`;
    const mafiche = document.querySelector(".fiches");
    mafiche.appendChild(mesArticles);
    mesArticles.appendChild(imageElement);
    mesArticles.appendChild(nomElement);
    mesArticles.appendChild(prixElement);
    mesArticles.appendChild(categorieElement);
    mesArticles.appendChild(descriptionElement);
    mesArticles.appendChild(dispoElement);

}
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const copiePieces = Array.from(pieces)
    copiePieces.sort(function (a,b) {
        return a.prix-b.prix;
    });
    console.log(copiePieces);
});
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});
const btndesc = document.querySelector(".btn-descrip");
btndesc.addEventListener("click",()=>{
    const resultat = pieces.filter(function(pieces){
        return pieces.description;
    });
    console.log(resultat);
});
const btnprix = document.querySelector(".btn-prix-order-decroissant")
btnprix.addEventListener("click",()=>{
    const coplist = Array.from(pieces);
    const listoder = coplist.sort(function(a,b){
        return b.prix-a.prix;
    })
    console.log(listoder);
});
const nom = pieces.map((pieces)=>pieces.nom);
console.log(nom);
const copienom=Array.from(nom)
for(let i=pieces.length-1;i>=0;i--){
    if(pieces[i].prix>=35){
        copienom.splice(i,1);
    }
}
const sousparent = document.createElement("ul");
for(let i=0;i<copienom.length;i++){
    const monEle = document.createElement('li');
    monEle.textContent = copienom[i];
    
    sousparent.appendChild(monEle);
}
 const parent =document.querySelector(".pieces-abordables");
 parent.appendChild(sousparent);

 const nomsDisponibles = pieces.map(piece => piece.nom);
 const prixDisponibles = pieces.map(piece => piece.prix);
 
 for(let i = pieces.length -1 ; i >= 0; i--){
     if(pieces[i].disponibilite === false){
         nomsDisponibles.splice(i,1);
         prixDisponibles.splice(i,1);
     }
 }
 
 const disponiblesElement = document.createElement('ul');
 
 for(let i=0 ; i < nomsDisponibles.length ; i++){
     const nomElement = document.createElement('li');
     nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
     disponiblesElement.appendChild(nomElement);
 }
 document.querySelector('.pieces-disponibles').appendChild(disponiblesElement);
 
 