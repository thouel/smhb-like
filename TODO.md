# Func

- Page Nous contacter

  - when sent, send a mail confirmation

- Administration

- Administration / Actualités

  - func: ajouter pagination
  - func: ajouter la possibilité de rendre visible ou pas
  - func: supprimer en masse
  - func: ajouter un éditeur riche markdown pour la description
    - editor : https://github.com/ianstormtaylor/slate#readme
    - render : https://github.com/remarkjs/react-markdown

- Administration / Boutique

- Administration / Evènements

  - func: créer à partir des Actualités ?

- Administration / Messagerie

  - créer

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

- FicheUtilisateur, FicheActualite, FicheArticle
  - si user est connecté et user est admin, alors afficher le lien d'édition
