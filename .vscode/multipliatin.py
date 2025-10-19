from math import degrees
from site import USER_BASE
from unittest import result

t=0
while t==0: 
    try:
 
        nombre=input("Entrez le nombre a faire la table de multiplication\n");
        nombre=int(nombre);
        degre=int(input("Entrez le degre de la table de multiplication\n"));
        if isinstance(nombre,int) and isinstance(degre,int):
            t=1
    
        print("**********************************************************");
        print("**********************************************************");
        print("**********************************************************");
        print(f"la table de multiplication : {nombre} jusqua : {degre}");

        for i in range(1,degre+1):

            resultat=nombre*i;
            print(f"{nombre} x {i} = {resultat}");

    except ValueError:
        print("Vous devez entrez une valeur entiere!!!!")
