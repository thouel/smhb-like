'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import ClubHistoriqueCarte from './ClubHistoriqueCarte'

export type Paragraphe = {
  contenu: string
}
export type TranchesHistoire = {
  titre: string
  paragraphes: Paragraphe[]
}

const tranchesHistoire: TranchesHistoire[] = [
  {
    titre: '2016/2017',
    paragraphes: [
      {
        contenu:
          "Sous l'impulsion de la nouvelle présidence et de son bureau directeur, il est défini un projet viable sur plusieurs années, à savoir dans un premier temps, la Formation avec la définition d'un entraîneur, de ses responsabilités, de son niveau d'encadrement, de ses valeurs et discipline ainsi que ses séances d'entraînement",
      },
    ],
  },
  {
    titre: '2017/2018',
    paragraphes: [
      {
        contenu:
          "Nous avons donc accentué nos efforts sur la Formation en créant un poste de Directeur Technique tenu par Mr Christophe Ambroise. Il s'est impliqué à tous les niveaux dans chaque catégorie,",
      },
      {
        contenu:
          "- Mini-Hand pour l'apprentissage du ballon et de la compréhension des espaces",
      },
      {
        contenu:
          "- Moins de 11 G & F avec l'objectif de développer la motricité, son activité perceptive et décisionnelle, sa lecture du jeu",
      },
      {
        contenu:
          "- Moins de 13 G & F avec l'amélioration de l'explosivité, la coordination des appuis et des prises d'initiative",
      },
      {
        contenu:
          "- Moins de 15 G & F avec l'adaptation des joueurs à certains postes, à une plus grande autonomie dans le jeu, notamment en attaque, à une vision plus globale du collectif",
      },
      {
        contenu:
          '- Moins de 18 G & F avec des intentions tactiques précises, des enchaînements, des surnombres, des relations entre joueurs',
      },
      {
        contenu:
          "Nous avons aussi décidé que la Formation commençait par le fait de former nos entraîneurs et nous avons donc décidé de budgéter 3 formations annuelles. Elles nous permettent d'avoir maintenant une douzaine d'entraîneurs diplômés animateur fédéral et pour certains de continuer au niveau régional.",
      },
    ],
  },
  {
    titre: '2018/2020',
    paragraphes: [
      {
        contenu:
          'Parallèlement à ce projet sportif qui demande beaucoup de temps et pour promouvoir cette formation, il a également été décidé de soutenir les équipes fanions en se projetant sur les 5 années à venir et voir nos équipes Seniors Filles et Garçons évoluer en Nationale 3.',
      },
      {
        contenu:
          "Nous n'en sommes plus très loin, les Séniors Garçons ayant échoués à la 3ème place du championnat Pré-national 2019/2020, visant la montée la saison prochaine et les Seniors Filles nous gratifiant d'une 1ère place 2019/2020 en Excellence Régionale et montant en Pré-national également.",
      },
      {
        contenu:
          'Nous avons aussi eu la satisfaction cette saison de compter plus de 360 licenciés.',
      },
    ],
  },
  {
    titre: '2022/2023',
    paragraphes: [
      {
        contenu: '2 Titres de Champions de Gironde Excellence',
      },
      { contenu: '1 Titre Champion de Gironde Honneur Excellence' },
      { contenu: '1 Qualification Championnat de France' },
      { contenu: 'Maintien SG1 et SG2' },
    ],
  },
]

const ClubHistorique = () => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-semibold '>{"L'historique"}</h1>
        <div className='px-12'>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {tranchesHistoire.map((th, index) => (
                <CarouselItem key={th.titre.concat(index.toString())}>
                  <ClubHistoriqueCarte tranchesHistoire={th} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant='link' />
            <CarouselNext variant='link' />
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default ClubHistorique
