'use client'
import type { Article } from '@prisma/client'
import { supprimerArticleCatalogue } from '@/actions/supprimerArticleCatalogue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = { article: Article }

const AfficherActionsAdminArticle = (props: Props) => {
  const { article } = props
  return (
    <>
      <div className='flex flex-row gap-5'>
        <Button variant={'outline'}>
          <Link href={`/boutique/${article.id}`}>Aller à la boutique</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'destructive'}
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer article du catalogue
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {"Supprimer l'article du catalogue ?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {'Cette action est irréversible. Mieux vaut être sûr !'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                variant={'destructive'}
                onClick={() => supprimerArticleCatalogue(article)}
              >
                {"Oui, supprimer l'article"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default AfficherActionsAdminArticle
