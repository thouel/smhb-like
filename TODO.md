# Func

- Administration

  - FilAriane > Ajouter le niveau 3 pour tous les panneaux d'admin + le niveau 4 pour boutique/variants

- Administration / Actualités

  - func: ajouter pagination
  - func: ajouter la possibilité de rendre visible ou pas
  - func: supprimer en masse
  - func: ajouter un éditeur riche ~~markdown~~ pour la description
    - editor : https://github.com/ianstormtaylor/slate#readme
    - render : https://github.com/remarkjs/react-markdown
    - Comment ça se render ?

- Administration / Boutique

  - changer les valeurs possibles du champ type en s'inspirant des catégories Adidas !!1
  - adapter les tailles disponibles en fonction du type de la référence
  - ajouter une action de publication d'un produit

- Administration / Evènements

  - func: créer à partir des Actualités ?

- Administration / Galerie Photos

  - func: créer

- Administration / Messagerie

  - func: ajouter un filtre du statut
  - func: ajouter une page d'affichage d'une commande

- Administration / Utilisateurs

  - ListerUtilisateurs

    - bug: sort by nom seems bugged
    - func: ajouter pagination

  - EditerUtilisateur > password :
    - func: add a separate page to update email
    - func: add a separate page to update password (magic link or 2FA ?)
    - bug: reject unaccepted characters (eg space)
    - bug: generatePassword Method can generate incorrect passwords
    - func: add a confirmation password input

- Accueil

- Actualités

  - func: allow to download pdf directly from page

- Boutique

  - handle Bouton 'Commander' !!1
    > [https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe]
  - bugged use case :
    - user is not logged in
    - add some items in his cart
    - click on the cart icon next to shop button
    - is redirected to login page
    - when logged in, he lost his cart

- FicheUtilisateur, FicheActualite, FicheArticle
  - si user est connecté et user est admin, alors afficher le lien d'édition
